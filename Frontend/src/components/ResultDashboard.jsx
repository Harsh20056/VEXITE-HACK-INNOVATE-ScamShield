import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, Info, Share2, Copy, Check, Download, Building2, Calendar } from 'lucide-react';
import RiskMeter from './RiskMeter';

export default function ResultDashboard({ report }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const isSafe = report.verdict === 'SAFE';
  const isSuspicious = report.verdict === 'SUSPICIOUS';

  const handleCopySummary = () => {
    const textToCopy = `ScamShield AI Analysis Report
Entity: ${report.companyClaimed}
Verdict: ${report.verdict} (Risk Score: ${report.riskScore}/100)
Summary: ${report.summary}
Red Flags: ${report.redFlags.join('; ')}
Green Flags: ${report.greenFlags.join('; ')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl animate-in fade-in duration-500">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              Entity: <strong className="text-white font-extrabold">{report.companyClaimed}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
            Fraud Risk Verification Report
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            {copied ? 'Copied Report' : 'Copy Summary'}
          </button>
        </div>
      </div>

      {/* Metric Section: Score Meter + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-8 border-b border-slate-800">
        <div className="md:col-span-1 flex justify-center">
          <RiskMeter score={report.riskScore} verdict={report.verdict} />
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Executive Summary</span>
          </div>
          <p className="text-base text-slate-200 leading-relaxed font-medium bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
            {report.summary}
          </p>
        </div>
      </div>

      {/* Categorized Flags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        
        {/* Red Flags Card */}
        <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-extrabold text-base">
            <AlertTriangle className="w-5 h-5" />
            Critical Red Flags ({report.redFlags?.length || 0})
          </div>
          {report.redFlags?.length > 0 ? (
            <ul className="space-y-3 text-sm text-slate-300">
              {report.redFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No red flags identified in this submission.</p>
          )}
        </div>

        {/* Green Flags Card */}
        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-base">
            <ShieldCheck className="w-5 h-5" />
            Positive Signals ({report.greenFlags?.length || 0})
          </div>
          {report.greenFlags?.length > 0 ? (
            <ul className="space-y-3 text-sm text-slate-300">
              {report.greenFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No positive green flags verified.</p>
          )}
        </div>

      </div>

      {/* Recommended Verification Steps */}
      {report.verificationSteps?.length > 0 && (
        <div className="mt-6 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-base">
            <Info className="w-5 h-5" />
            Recommended Verification & Safety Actions
          </div>
          <ol className="space-y-3 text-sm text-slate-300 list-decimal pl-5">
            {report.verificationSteps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

    </div>
  );
}
