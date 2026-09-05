const { GoogleGenAI } = require('@google/genai');

/**
 * ============================================================
 * DETERMINISTIC EXTRACTOR & JS RISK SCORER
 * ============================================================
 * Gemini's ONLY job is classification — "which specific
 * red/green flag categories are present, yes or no".
 * The numeric score is computed in pure JS from a fixed weight
 * table. Same flags detected => same score, every time, regardless
 * of whether the input was text or an image of that text.
 * ============================================================
 */

// ---- Fixed weight table ----
const RED_FLAG_WEIGHTS = {
  FINANCIAL_DEMAND: 45,   // deposit / training fee / "buy your own laptop"
  TASK_SCAM: 40,          // "earn $50/day rating videos", crypto task scams
  ENGAGEMENT_BAIT: 25,    // "Comment INTERESTED", "DM to get hired"
  INFORMAL_COMM: 20,      // forced Telegram/WhatsApp, free webmail for official HR
  NO_INTERVIEW: 15,       // instant offer, zero screening
  DOMAIN_SPOOF: 35,       // lookalike domain, fake careers page
};

const GREEN_FLAG_WEIGHTS = {
  DETAILED_JD: -8,          // real responsibilities/qualifications listed
  FORMAL_PROCESS: -10,      // interviews / HR round / background check mentioned
  STANDARD_BENEFITS: -6,    // PF, health insurance, PTO
  OFFICIAL_PORTAL: -12,     // careers.company.com, verified LinkedIn page
  SECURITY_DISCLAIMER: -15, // "we never ask for payment" type notice
};

const RED_FLAG_CATEGORIES = Object.keys(RED_FLAG_WEIGHTS);
const GREEN_FLAG_CATEGORIES = Object.keys(GREEN_FLAG_WEIGHTS);

const EXTRACTION_SYSTEM_PROMPT = `
You are a detail-oriented extraction engine for job/internship postings. You do NOT decide if something is a scam and you do NOT invent a risk score — you only report which specific, objectively-checkable indicators are present. A separate system computes the verdict from what you extract.

IF THE INPUT IS AN IMAGE OR PDF: first silently transcribe every piece of visible text (including small print, fine print, and any watermarks). Then apply the exact same evaluation below to that transcribed text as you would to typed text. Never let image quality, blur, screenshot cropping, or formatting influence which flags you report — only the actual words matter.

For EACH category below, report true only if there is clear, explicit textual evidence — not a vague impression. If a category isn't clearly present, report false. Do not guess or infer beyond what is written.

RED FLAG CATEGORIES (report each as true/false + a short quoted-or-paraphrased "evidence" string, or evidence: null if false):
- FINANCIAL_DEMAND: candidate is asked to pay money (deposit, training fee, background-check fee, "purchase your own laptop/kit to get started").
- TASK_SCAM: promises of daily/easy income for trivial tasks (liking videos, rating products, crypto/investment "tasks").
- ENGAGEMENT_BAIT: text like "Comment INTERESTED", "DM us to get hired", "first come first serve, limited seats".
- INFORMAL_COMM: candidate is pushed toward Telegram/WhatsApp as the ONLY channel, or the "recruiter" only uses a free webmail (@gmail.com/@yahoo.com/@hotmail.com) for what claims to be official corporate hiring.
- NO_INTERVIEW: explicitly states hiring/selection happens instantly with zero interview or technical screening.
- DOMAIN_SPOOF: a company name is used alongside a link/domain that does not match that company's real domain, or a lookalike domain is visible.

GREEN FLAG CATEGORIES (same true/false + evidence format):
- DETAILED_JD: concrete responsibilities, required skills/qualifications are described (not just a title and a big number).
- FORMAL_PROCESS: mentions a normal hiring process — technical interview, HR round, formal offer letter, background verification.
- STANDARD_BENEFITS: mentions standard employment benefits (health insurance, PTO, provident fund/401k, company-provided equipment).
- OFFICIAL_PORTAL: candidate is directed to an official, verifiable channel (a real company careers page, verified LinkedIn company page).
- SECURITY_DISCLAIMER: text explicitly states the company never charges fees / never asks for payment during hiring.

Also extract:
- companyClaimed: the company name mentioned, or "Unknown" if none.
- summary: 1-2 neutral, factual sentences describing what the posting says (not a verdict).
- verificationSteps: 2-4 concrete, generic steps a candidate could take to verify this posting themselves (e.g. "Search '<company> careers' directly rather than using the link provided", "Call the company's official HR line listed on their real website").

Output STRICTLY valid JSON, no markdown fences, matching exactly:
{
  "companyClaimed": string,
  "summary": string,
  "redFlags": {
    "FINANCIAL_DEMAND": { "present": boolean, "evidence": string | null },
    "TASK_SCAM": { "present": boolean, "evidence": string | null },
    "ENGAGEMENT_BAIT": { "present": boolean, "evidence": string | null },
    "INFORMAL_COMM": { "present": boolean, "evidence": string | null },
    "NO_INTERVIEW": { "present": boolean, "evidence": string | null },
    "DOMAIN_SPOOF": { "present": boolean, "evidence": string | null }
  },
  "greenFlags": {
    "DETAILED_JD": { "present": boolean, "evidence": string | null },
    "FORMAL_PROCESS": { "present": boolean, "evidence": string | null },
    "STANDARD_BENEFITS": { "present": boolean, "evidence": string | null },
    "OFFICIAL_PORTAL": { "present": boolean, "evidence": string | null },
    "SECURITY_DISCLAIMER": { "present": boolean, "evidence": string | null }
  },
  "verificationSteps": string[]
}
`;

/**
 * Deterministic scorer — pure JS, no LLM involved.
 * Same input flags always produce the same score.
 */
function computeRiskScore(redFlags, greenFlags) {
  let score = 0;
  const triggeredRed = [];
  const triggeredGreen = [];

  for (const category of RED_FLAG_CATEGORIES) {
    if (redFlags?.[category]?.present) {
      score += RED_FLAG_WEIGHTS[category];
      triggeredRed.push({ category, evidence: redFlags[category].evidence });
    }
  }

  for (const category of GREEN_FLAG_CATEGORIES) {
    if (greenFlags?.[category]?.present) {
      score += GREEN_FLAG_WEIGHTS[category]; // negative numbers
      triggeredGreen.push({ category, evidence: greenFlags[category].evidence });
    }
  }

  // Clamp 0-100
  score = Math.max(0, Math.min(100, score));

  // A posting with genuinely zero detected red flags should never
  // land in scam territory just from weak/absent green flags.
  if (triggeredRed.length === 0) {
    score = Math.min(score, 15);
  }

  let verdict = 'SAFE';
  if (score >= 51) verdict = 'HIGH_RISK_SCAM';
  else if (score >= 21) verdict = 'SUSPICIOUS';

  return { score, verdict, triggeredRed, triggeredGreen };
}

function flagsToStringArray(triggered) {
  return triggered.map(f =>
    f.evidence ? `${f.category.replace(/_/g, ' ')}: ${f.evidence}` : f.category.replace(/_/g, ' ')
  );
}

async function analyzeContentWithGemini(textContent, file) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'paste_your_gemini_api_key_here') {
    throw new Error('Gemini API key is missing or not configured in .env file.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const contents = [];
  if (textContent) {
    contents.push({ text: `Analyze this job posting/link/text:\n\n${textContent}` });
  }
  if (file) {
    const mimeType = file.mimetype === 'application/pdf' ? 'application/pdf' : file.mimetype;
    contents.push({
      inlineData: {
        mimeType,
        data: file.data.toString('base64'),
      },
    });
  }

  let response;
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      attempts++;
      response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: EXTRACTION_SYSTEM_PROMPT }, ...contents] },
        ],
        config: {
          responseMimeType: 'application/json',
          temperature: 0,
          topP: 1,
          topK: 1,
        },
      });
      break; // Success
    } catch (err) {
      if (attempts < maxAttempts && (err.message?.includes('503') || err.message?.includes('high demand') || err.message?.includes('UNAVAILABLE'))) {
        console.warn(`Gemini API 503 high demand warning. Retrying attempt ${attempts}/${maxAttempts}...`);
        await new Promise(res => setTimeout(res, 1500));
      } else {
        throw err;
      }
    }
  }

  const rawText = typeof response.text === 'function' ? response.text() : response.text;
  const cleanText = rawText.replace(/```json|```/g, '').trim();

  let extracted;
  try {
    extracted = JSON.parse(cleanText);
  } catch (e) {
    throw new Error('Gemini returned non-JSON output: ' + cleanText.slice(0, 300));
  }

  const { score, verdict, triggeredRed, triggeredGreen } = computeRiskScore(
    extracted.redFlags,
    extracted.greenFlags
  );

  return {
    riskScore: score,
    verdict,
    companyClaimed: extracted.companyClaimed || 'Unknown',
    summary: extracted.summary || '',
    redFlags: flagsToStringArray(triggeredRed),
    greenFlags: flagsToStringArray(triggeredGreen),
    verificationSteps: extracted.verificationSteps || [],
  };
}

module.exports = {
  analyzeContentWithGemini,
};
