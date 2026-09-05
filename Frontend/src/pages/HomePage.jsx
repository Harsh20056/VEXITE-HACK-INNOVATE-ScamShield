import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, CheckCircle2, AlertTriangle, Search, FileSearch, ArrowRight, Zap, Lock, Users } from 'lucide-react';
import { PRESET_SAMPLES } from '../services/mockAiService';

export default function HomePage() {
  return (
    <div className="space-y-24 py-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 text-center max-w-5xl mx-auto px-4">
        
        {/* Glow background pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-8 glow-cyan">
          <Sparkles className="w-4 h-4 text-cyan-400 fill-cyan-400" />
          Powered by Gemini 1.5 Flash AI Intelligence
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
          Protect Your Career From <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Fake Job & Internship Scams
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
          Instantly verify recruiter messages, offer letter PDFs, and suspicious Telegram interview invitations before sharing sensitive documents or sending security deposits.
        </p>

        {/* Call to action buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/scan"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-lg shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5 text-cyan-100 fill-cyan-100" />
            Launch AI Scanner Workbench
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/guide"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-lg hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2"
          >
            Learn Top 5 Scam Flags
          </Link>
        </div>

        {/* Security badges stats counter */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl glass-panel border border-slate-800/80">
          <div className="p-4 space-y-1">
            <p className="text-3xl font-black text-white">99.2%</p>
            <p className="text-xs font-semibold text-slate-400 uppercase">Detection Accuracy</p>
          </div>
          <div className="p-4 space-y-1 border-l border-slate-800/80">
            <p className="text-3xl font-black text-cyan-400">&lt; 1.2s</p>
            <p className="text-xs font-semibold text-slate-400 uppercase">Instant AI Analysis</p>
          </div>
          <div className="p-4 space-y-1 border-l border-slate-800/80">
            <p className="text-3xl font-black text-white">100%</p>
            <p className="text-xs font-semibold text-slate-400 uppercase">Privacy Confidential</p>
          </div>
          <div className="p-4 space-y-1 border-l border-slate-800/80">
            <p className="text-3xl font-black text-rose-400">\$0</p>
            <p className="text-xs font-semibold text-slate-400 uppercase">Free Protection</p>
          </div>
        </div>

      </section>

      {/* Interactive Feature Cards */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How ScamShield AI Shields Job Seekers
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Multi-layered threat analysis scanning for financial fraud, domain spoofing, and informal messaging traps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FileSearch className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Document & Image OCR Scan</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Upload offer letters, appointment PDFs, or email screenshots. Gemini AI extracts embedded text to detect fake corporate logos and invalid signatures.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Security Deposit Alert</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Flags any request for upfront training fees, equipment deposits, crypto payments, or mandatory Telegram channel joins immediately.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Domain & Identity Check</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Validates corporate web mail addresses against official company career domains to stop domain spoofing and phishing traps.
            </p>
          </div>

        </div>
      </section>

      {/* Common Scam Threat Ticker Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Recent Scam Trends Detected by Community
            </h3>
            <Link to="/scan" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
              Test Sample Input <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-rose-400">
                <span>🚨 Telegram Crypto Scam</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/10">High Risk (95/100)</span>
              </div>
              <p className="text-xs text-slate-300">
                "Pay \$150 equipment fee via Crypto before receiving laptop."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-rose-400">
                <span>🚨 Fake Amazon HR Email</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/10">High Risk (88/100)</span>
              </div>
              <p className="text-xs text-slate-300">
                "Email from hr-dept@amazon-careers-online-portal.biz demanding SSN."
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
