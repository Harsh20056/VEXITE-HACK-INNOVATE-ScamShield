import React from 'react';
import { BookOpen, ShieldAlert, AlertTriangle, CheckCircle2, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GuidePage() {
  const scamTypes = [
    {
      id: 1,
      title: '1. Upfront Security Deposit & Equipment Fee Scam',
      severity: 'EXTREME RISK',
      description: 'The scammer claims you are hired and offers to send a laptop or home office kit, but requires you to wire money or buy cryptocurrency as a "refundable security deposit" or "software shipping fee".',
      redFlags: [
        'Demands payment via UPI, Crypto (Bitcoin/USDT), Zelle, or Gift Cards.',
        'Claims money will be refunded in your first paycheck.',
        'Refuses to deduct fees directly from company payroll.'
      ],
      defense: 'Legitimate employers NEVER ask candidates to pay for their own onboarding equipment or security deposits.'
    },
    {
      id: 2,
      title: '2. Recruiter Shifting to Informal Messaging (Telegram / WhatsApp)',
      severity: 'HIGH RISK',
      description: 'Scammers reach out via LinkedIn or email, then quickly force the interview process onto Telegram or WhatsApp channels to evade corporate audit trails and platform reporting.',
      redFlags: [
        'Recruiter uses free webmail handles (@gmail.com, @outlook.com).',
        'Interview is conducted purely via text chat on Telegram handle (@HR_Global_Tech).',
        'Refuses to hop on an official video call (Zoom, Google Meet, MS Teams).'
      ],
      defense: 'Verify recruiter identity on LinkedIn and demand an official corporate email invitation before engaging.'
    },
    {
      id: 3,
      title: '3. Corporate Domain Spoofing & Phishing',
      severity: 'HIGH RISK',
      description: 'Fraudsters register lookalike web domains mimicking mega tech brands (e.g., `amazon-careers-online.biz` or `google-hr-portal.net`) to trick job seekers into submitting identity documents.',
      redFlags: [
        'Web links use suspicious top-level domains (.biz, .xyz, .top, .online-portal).',
        'Requests SSN, Passport, or Bank Account numbers before contract signing.',
        'Domain WHOIS creation date is less than 30 days old.'
      ],
      defense: 'Always navigate directly to the company\'s official verified career portal (e.g. amazon.jobs or careers.google.com).'
    },
    {
      id: 4,
      title: '4. Instant Selection without Formal Interviews',
      severity: 'MODERATE RISK',
      description: 'Job seeker receives a high-paying offer letter ($40+/hr or $8,000/mo) within hours of submitting a resume without undergoing technical or HR evaluation.',
      redFlags: [
        'Generic offer letter with vague job duties.',
        'Salary offer is significantly above industry benchmark for zero experience.',
        'Urgent pressure to sign within 24 hours.'
      ],
      defense: 'Reputable companies follow structured evaluation processes before issuing legal binding job offers.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          Scam Awareness Handbook
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          How to Spot Recruitment Fraud
        </h1>
        <p className="text-slate-400 text-sm sm:text-base font-medium">
          Learn the anatomy of modern job and internship scams to protect your identity, money, and personal documents.
        </p>
      </div>

      {/* Scam Cards */}
      <div className="space-y-8">
        {scamTypes.map((scam) => (
          <div key={scam.id} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-white">{scam.title}</h2>
              <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-extrabold w-fit">
                {scam.severity}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {scam.description}
            </p>

            {/* Red Flags List */}
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-2">
              <p className="text-xs font-extrabold uppercase text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Red Flags to Watch Out For:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
                {scam.redFlags.map((flag, idx) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            </div>

            {/* Safety Rule */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 text-xs font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Golden Rule: {scam.defense}
            </div>

          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-950 to-blue-950 border border-cyan-500/30 text-center space-y-4">
        <h3 className="text-2xl font-black text-white">Have a Suspicious Job Offer Right Now?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Run your text message or offer letter PDF through our ScamShield AI analyzer to receive an instant risk score.
        </p>
        <Link
          to="/scan"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
        >
          Scan Offer Letter Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
