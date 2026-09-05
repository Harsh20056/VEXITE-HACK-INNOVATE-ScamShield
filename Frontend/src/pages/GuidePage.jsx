import React from 'react';
import { BookOpen, X, Check, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GuidePage() {
  const scamCards = [
    {
      id: 1,
      title: 'Upfront Security Deposit & Equipment Fee Scam',
      badge: 'Extreme Risk',
      badgeClass: 'bg-red-50 text-red-700 border-red-200',
      description: 'Fraudulent recruiters issue counterfeit cashier\'s checks or direct wire transfers, instructing the candidate to deposit the funds into their personal bank account and immediately remit payment to an "authorized vendor" for home-office workstation hardware or proprietary software licensing. Once the fake check bounces days later, the victim remains legally and financially liable for the lost sum.',
      redFlags: [
        'You are sent an advance check, electronic deposit, or wire to purchase home-office hardware independently.',
        'You are mandated to use specific unverified third-party procurement vendors, Zelle, CashApp, or cryptocurrency.',
        'Fabricated extreme urgency requiring hardware purchase orders to be finalized within 24 to 48 hours of offer acceptance.'
      ],
      goldenRule: 'Legitimate employers NEVER ask candidates to purchase home office hardware or pay software licensing fees out-of-pocket, nor do they send advance checks for equipment procurement.'
    },
    {
      id: 2,
      title: 'Recruiter Shifting to Informal Messaging',
      badge: 'High Risk',
      badgeClass: 'bg-red-50 text-red-700 border-red-200',
      description: 'Threat actors initiate superficial contact via LinkedIn, job boards, or unsolicited email, then promptly coerce the applicant into unmonitored instant messaging apps such as Telegram, WhatsApp, Signal, or personal Google Chat. This deliberate channel migration circumvents corporate security logging, eliminates platform accountability, and enables effortless deletion of conversation records.',
      redFlags: [
        'Outreach rapidly insists on moving interview discussions onto Telegram, WhatsApp, or personal encrypted messaging channels.',
        'Inability or refusal to conduct live face-to-face video interviews through enterprise conferencing software (Zoom, Google Meet, Microsoft Teams).',
        'Interview conducted entirely via text questionnaires, automated chat scripts, or canned pre-written forms without real-time voice exchange.'
      ],
      goldenRule: 'Legitimate employers NEVER conduct formal hiring interviews or official onboarding solely via consumer instant messaging apps like Telegram or WhatsApp.'
    },
    {
      id: 3,
      title: 'Corporate Domain Spoofing & Phishing',
      badge: 'High Risk',
      badgeClass: 'bg-red-50 text-red-700 border-red-200',
      description: 'Sophisticated syndicates register typosquatted domains (e.g., canonical-careers-portal.net or stripe-talent.com) that visually mimic legitimate enterprise employers. Through these deceptive web addresses and spoofed email headers, attackers send authentic-looking DocuSign envelopes, applicant questionnaires, and onboarding forms engineered to harvest social security numbers, government IDs, and banking information.',
      redFlags: [
        'Sender email address uses public domains (gmail.com, hotmail.com) or newly registered lookalike domains with extra hyphens or odd suffixes.',
        'Inbound email fails basic cryptographic sender verification standards (DKIM, SPF alignment, or DMARC authentication).',
        'Domain WHOIS registration data reveals the domain was created less than 30-60 days ago despite the company being established for decades.'
      ],
      goldenRule: 'Legitimate employers NEVER send official offer letters or employment agreements from free webmail accounts or unverified lookalike domain variations.'
    },
    {
      id: 4,
      title: 'Instant Selection without Formal Interviews',
      badge: 'Moderate Risk',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Victims receive unsolicited employment offers or guaranteed job placements without undergoing rigorous multi-stage evaluations, technical assessments, or live discussions with hiring managers. Attackers leverage inflated salary ranges and fully remote flexibility to trigger emotional excitement, blinding applicants to procedural irregularities and accelerating hurried document signing.',
      redFlags: [
        'Job offer extended immediately after submitting a basic resume or completing a simplistic single-page questionnaire.',
        'Compensation and benefits offered are 30-50% above prevailing industry market benchmarks for the required experience level.',
        'Job description is extraordinarily vague with no concrete technical requirements, team introductions, or verifiable hiring manager credentials.'
      ],
      goldenRule: 'Legitimate employers NEVER extend high-compensation enterprise roles without a thorough, multi-stage assessment and direct live interviews with hiring teams.'
    }
  ];

  return (
    <div className="space-y-10 py-8 max-w-5xl mx-auto px-4">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          SCAM AWARENESS HANDBOOK
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How to Spot Recruitment Fraud
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          A definitive guide to identifying counterfeit recruiter outreach, fraudulent onboarding checks, lookalike domains, and covert identity harvesting before sharing sensitive information.
        </p>
      </div>

      {/* Scam Cards List */}
      <div className="space-y-8">
        {scamCards.map((scam) => (
          <div key={scam.id} className="ent-card p-6 sm:p-8 space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">{scam.title}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${scam.badgeClass} w-fit`}>
                {scam.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {scam.description}
            </p>

            {/* Critical Red Flags Box */}
            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
              <span className="text-xs font-bold text-red-800 flex items-center gap-1.5 uppercase tracking-wider">
                <X className="w-4 h-4 text-red-600 stroke-[3]" /> Critical Red Flags
              </span>
              <ul className="space-y-1.5 text-xs text-red-900">
                {scam.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-600 font-extrabold shrink-0">✕</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Golden Rule Box */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> THE GOLDEN RULE
              </span>
              <p className="text-xs text-emerald-900 font-semibold italic">
                "{scam.goldenRule}"
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Bottom CTA Card */}
      <div className="ent-card p-8 bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-left">
          <h3 className="text-lg font-bold text-slate-900">Have a Suspicious Job Offer Right Now?</h3>
          <p className="text-xs text-slate-600 max-w-lg">
            Submit recruiter email headers, offer letter PDFs, or interview transcripts into our neural verification scanner to detect cryptographic tampering and check scams in seconds.
          </p>
        </div>

        <Link
          to="/scan"
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
        >
          Scan Offer Letter Now <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
