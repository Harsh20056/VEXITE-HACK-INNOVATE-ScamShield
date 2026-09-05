// Mock AI Analysis Engine & History Manager for ScamShield AI

export const PRESET_SAMPLES = [
  {
    id: 'sample-telegram-scam',
    title: '🚨 Telegram Security Deposit Scam',
    type: 'text',
    companyClaimed: 'Global Tech Solutions Inc.',
    content: `CONGRATULATIONS! You have been selected for Data Entry Specialist role at Global Tech Solutions Inc. Salary is $45/hr (Paid daily). No interview needed! 

To claim your laptop and start work immediately, please send a refundable security deposit of $150 via Crypto/UPI to our hiring manager on Telegram (@GlobalTechManager). Click here to join: https://t.me/fake_job_channel`
  },
  {
    id: 'sample-fake-amazon-offer',
    title: '⚠️ Suspicious Domain Spoofing Offer',
    type: 'text',
    companyClaimed: 'Amazon Inc.',
    content: `Dear Candidate, We reviewed your LinkedIn profile and selected you for Remote Cloud Analyst. You will earn $8,000/month. Please send your SSN/Aadhaar card scan and pay $50 documentation fee to hr-dept@amazon-careers-online-portal.biz to receive your contract.`
  },
  {
    id: 'sample-legit-offer',
    title: '✅ Legitimate Verified Offer',
    type: 'text',
    companyClaimed: 'Microsoft Corporation',
    content: `Hi Alex, Following your final round technical interview on Microsoft Teams with our Senior Engineering Manager, we are pleased to extend a formal offer of employment for Software Engineer II. Please review the official candidate portal at https://careers.microsoft.com for full benefits and onboarding schedule.`
  }
];

// Helper to save report into localStorage
export const saveReportToHistory = (report) => {
  try {
    const existing = JSON.parse(localStorage.getItem('scamshield_history') || '[]');
    const updated = [report, ...existing.filter(item => item.id !== report.id)];
    localStorage.setItem('scamshield_history', JSON.stringify(updated.slice(0, 30)));
  } catch (err) {
    console.error('Failed to save to history:', err);
  }
};

// Helper to get history
export const getHistory = () => {
  try {
    const data = localStorage.getItem('scamshield_history');
    if (!data) return getInitialMockHistory();
    return JSON.parse(data);
  } catch (err) {
    return getInitialMockHistory();
  }
};

const getInitialMockHistory = () => {
  const mockHistory = [
    {
      id: 'report-101',
      companyClaimed: 'Telegram Crypto HR',
      riskScore: 95,
      verdict: 'HIGH_RISK_SCAM',
      summary: 'Extreme risk detected. Demands upfront cryptocurrency deposit for work equipment and redirects interview to an unofficial Telegram handle.',
      redFlags: [
        'Mandatory upfront security deposit or equipment fee requested.',
        'Recruiter uses Telegram (@GlobalTechManager) instead of official corporate email.',
        'Guaranteed high hourly wage with zero prior interview rounds.'
      ],
      greenFlags: [],
      verificationSteps: [
        'Do NOT send any money or cryptocurrency under any circumstances.',
        'Block the contact on Telegram and report the recruiter profile.',
        'Cross-check open positions directly at the company\'s official website.'
      ],
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: 'report-102',
      companyClaimed: 'Amazon Inc. (Spoofed Domain)',
      riskScore: 88,
      verdict: 'HIGH_RISK_SCAM',
      summary: 'High risk fraud detected. The hiring manager is utilizing a spoofed web domain (amazon-careers-online-portal.biz) and demanding sensitive identity documents.',
      redFlags: [
        'Unverified domain: @amazon-careers-online-portal.biz is NOT an official Amazon domain.',
        'Demands Sensitive PII (SSN/Aadhaar) before issuing contract.',
        'Requests $50 documentation fee.'
      ],
      greenFlags: [
        'Mentions a real corporate brand name.'
      ],
      verificationSteps: [
        'Verify domain WHOIS ownership or visit amazon.jobs directly.',
        'Never submit identity documents via unverified webmail forms.'
      ],
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'report-103',
      companyClaimed: 'Microsoft Corporation',
      riskScore: 5,
      verdict: 'SAFE',
      summary: 'Low risk / Safe. Valid corporate hiring workflow, official domain link (careers.microsoft.com), and structured post-interview procedure.',
      redFlags: [],
      greenFlags: [
        'Official domain link provided (careers.microsoft.com).',
        'Refers to prior formal technical interview stage.',
        'Zero financial or crypto demands.'
      ],
      verificationSteps: [
        'Log into your official candidate dashboard on careers.microsoft.com to accept offer details.'
      ],
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ];
  try {
    localStorage.setItem('scamshield_history', JSON.stringify(mockHistory));
  } catch (e) {}
  return mockHistory;
};

// Mock AI Analyze function
export const mockAnalyze = async ({ textContent, file }) => {
  // Simulate network latency (800ms)
  await new Promise(res => setTimeout(res, 800));

  const textLower = (textContent || '').toLowerCase();
  const fileName = file ? file.name.toLowerCase() : '';

  let riskScore = 15;
  let verdict = 'SAFE';
  let companyClaimed = 'Detected Entity';
  let redFlags = [];
  let greenFlags = [];
  let verificationSteps = [];

  // Analyze text indicators
  const hasMoneyDemand = /deposit|fee|pay\s+\$|pay\s+inr|crypto|upi|processing|training\s+fee|laptop\s+deposit/i.test(textContent);
  const hasTelegram = /telegram|whatsapp|signal|@\w+_manager|t\.me/i.test(textContent);
  const hasFreeEmail = /@gmail\.com|@yahoo\.com|@outlook\.com|@hotmail\.com/i.test(textContent);
  const hasSpoofedDomain = /\.biz|\.xyz|\.top|\.online-portal|careers-hr/i.test(textContent);
  const hasNoInterview = /no interview|immediate selection|instant hiring|hired directly/i.test(textContent);

  // Score computation
  if (hasMoneyDemand) riskScore += 35;
  if (hasTelegram) riskScore += 25;
  if (hasFreeEmail) riskScore += 20;
  if (hasSpoofedDomain) riskScore += 25;
  if (hasNoInterview) riskScore += 15;

  if (file && (fileName.includes('scam') || fileName.includes('fake') || fileName.includes('receipt'))) {
    riskScore += 20;
  }

  riskScore = Math.min(Math.max(riskScore, 5), 98);

  if (riskScore >= 70) {
    verdict = 'HIGH_RISK_SCAM';
  } else if (riskScore >= 35) {
    verdict = 'SUSPICIOUS';
  } else {
    verdict = 'SAFE';
  }

  // Extract Company Name if present
  if (textLower.includes('amazon')) companyClaimed = 'Amazon Inc.';
  else if (textLower.includes('microsoft')) companyClaimed = 'Microsoft Corporation';
  else if (textLower.includes('google')) companyClaimed = 'Google LLC';
  else if (textLower.includes('global tech')) companyClaimed = 'Global Tech Solutions';
  else companyClaimed = file ? `Uploaded Doc (${file.name})` : 'Unknown / Unspecified Employer';

  // Build flags & advice
  if (hasMoneyDemand) {
    redFlags.push('Requires upfront money, security deposit, or equipment fee before starting.');
  }
  if (hasTelegram) {
    redFlags.push('Recruiter directs candidate to informal channels (Telegram / WhatsApp).');
  }
  if (hasFreeEmail) {
    redFlags.push('Recruiter uses free webmail domain (Gmail/Yahoo) instead of verified corporate email.');
  }
  if (hasSpoofedDomain) {
    redFlags.push('Domain spoofing flag: Link points to unofficial domain suffix (.biz / .xyz).');
  }
  if (hasNoInterview) {
    redFlags.push('Unrealistic hiring promise: Immediate job extension without interview process.');
  }

  if (verdict === 'SAFE') {
    greenFlags.push('Uses official corporate hiring channel & standard interview procedure.');
    greenFlags.push('Zero financial demands or upfront payments requested.');
    greenFlags.push('Verified communications and legitimate onboarding link.');
    verificationSteps.push('Verify recruiter profile on LinkedIn and confirm position on official careers portal.');
  } else {
    if (redFlags.length === 0) {
      redFlags.push('Unverified sender identity and lack of official corporate domain verification.');
    }
    greenFlags.push('Detected company name mentioned in text/document.');
    verificationSteps.push('NEVER pay any security deposit, processing fee, or buy gift cards for an employer.');
    verificationSteps.push('Check the company\'s official career site directly (e.g., company.com/careers).');
    verificationSteps.push('Report suspicious recruiters on LinkedIn or national cybercrime portals.');
  }

  const report = {
    id: `report-${Date.now()}`,
    companyClaimed,
    riskScore,
    verdict,
    summary: verdict === 'HIGH_RISK_SCAM'
      ? `🚨 High Risk Fraud Detected: This job posting contains ${redFlags.length} major red flags characteristic of recruitment fraud, including informal messaging channels and financial demands.`
      : verdict === 'SUSPICIOUS'
      ? `⚠️ Suspicious Job Offer: Caution advised. The offer exhibits unusual recruitment indicators that require manual verification.`
      : `✅ Verified Low Risk: The provided text/document aligns with legitimate corporate recruitment practices with zero scam markers detected.`,
    redFlags,
    greenFlags,
    verificationSteps,
    createdAt: new Date().toISOString()
  };

  saveReportToHistory(report);
  return report;
};
