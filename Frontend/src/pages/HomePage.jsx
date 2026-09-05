import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Check, ArrowRight, BookOpen, Layers, Search, FileText, Users, Lock, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 py-12">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          Next-Gen Job Seeker Protection
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Enterprise-Grade Career Security
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Protecting job seekers from fraudulent offers, phishing recruiters, and malicious employment schemes with real-time verification and AI intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/scan"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            Go to AI Scanner <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/guide"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-2xs transition-colors flex items-center justify-center gap-2"
          >
            Read the Guide <BookOpen className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Zero Knowledge Privacy</span>
          <span>✦ Instant Sub-Second Triage</span>
          <span>✦ SOC 2 Type II Certified</span>
        </div>

      </section>

      {/* Enterprise Defense Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Enterprise Defense</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Built to dismantle modern recruitment fraud
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Scammers pray on career transitions using high-touch impersonation. Our multi-layered telemetry strips away malicious cover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="ent-card p-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Real-time detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantly cross-references incoming job postings, recruiter identities, and domain authenticity against live threat databases before you respond.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Live domain validation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Instant risk score calculation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Recruiter reputation lookup</li>
            </ul>
          </div>

          <div className="ent-card p-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Document Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deep structural analysis of offer letters, employment contracts, and onboarding paperwork to detect forged signatures, counterfeit checks, and suspicious clauses.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Offer letter integrity auditing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Counterfeit equipment check detection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Contract anomaly & clause flags</li>
            </ul>
          </div>

          <div className="ent-card p-6 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Community led</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Powered by a shared intelligence network of university career centers and candidate reports that flag emerging recruiter impersonation campaigns.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Crowdsourced threat telemetry</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Career center campus sync</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Verified alert bulletins</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8 border-y border-slate-200">
          <div className="space-y-1">
            <p className="text-4xl font-extrabold text-slate-900">99.4%</p>
            <p className="text-xs font-bold text-slate-900 uppercase">Fraud Identification Rate</p>
            <p className="text-xs text-slate-500">Continuous benchmarking against emerging spoofed employment vectors.</p>
          </div>

          <div className="space-y-1 md:border-l border-slate-200">
            <p className="text-4xl font-extrabold text-slate-900">45,000+</p>
            <p className="text-xs font-bold text-slate-900 uppercase">Offers Verified</p>
            <p className="text-xs text-slate-500">Cross-analyzed with official corporate registries and HR records.</p>
          </div>

          <div className="space-y-1 md:border-l border-slate-200">
            <p className="text-4xl font-extrabold text-blue-600">$12M+</p>
            <p className="text-xs font-bold text-slate-900 uppercase">Losses Prevented</p>
            <p className="text-xs text-slate-500">Prevented fake check fees, identity compromise, and ransom loss.</p>
          </div>
        </div>
      </section>

      {/* Triangulated Verification Process */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Triangulated Verification</span>
          <h2 className="text-2xl font-extrabold text-slate-900">
            How ScamShield protects your candidate profile
          </h2>
          <p className="text-xs text-slate-600">
            Behind every scanned offer sits an ensemble of automated verification primitives checking authentic registrar footprints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ent-card p-6 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-extrabold text-xs flex items-center justify-center">1</span>
            <h4 className="text-sm font-bold text-slate-900">Domain Age & DNS</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Checks if recruiter email domains were registered 48 hours ago or spoof a legitimate Fortune 500 employer brand.
            </p>
          </div>

          <div className="ent-card p-6 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-extrabold text-xs flex items-center justify-center">2</span>
            <h4 className="text-sm font-bold text-slate-900">Identity Signature</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Matches interviewer identities against enterprise directory public keys and verified talent acquisition rosters.
            </p>
          </div>

          <div className="ent-card p-6 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-extrabold text-xs flex items-center justify-center">3</span>
            <h4 className="text-sm font-bold text-slate-900">Document Forensic</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Scans offer attachments for metadata alterations, suspicious PDF producers, and malicious embedded links.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="ent-card p-10 text-center space-y-4 bg-gradient-to-b from-white to-slate-50 border border-slate-200">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider">
            Active Candidate Defense
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Safeguard your career journey today</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Never second-guess an interview invitation or employment offer again. Instant, verified peace of mind for every career step.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/scan"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              Go to AI Scanner <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/guide"
              className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              Read the Guide <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
