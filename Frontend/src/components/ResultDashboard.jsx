import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, Info, Copy, Check, Building2, Calendar } from 'lucide-react';
import RiskMeter from './RiskMeter';

export default function ResultDashboard({ report }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const handleCopySummary = () => {
    const textToCopy = `ScamShield Enterprise Inspection Report
Entity: ${report.companyClaimed}
Verdict: ${report.verdict} (Score: ${report.riskScore}/100)
Summary: ${report.summary}
Red Flags: ${report.redFlags.join('; ')}
Green Flags: ${report.greenFlags.join('; ')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 ent-card p-6 sm:p-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Claimed Entity: <strong className="text-slate-900 font-bold">{report.companyClaimed}</strong>
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">
            Verification & Audit Telemetry Report
          </h2>
        </div>

        <button
          onClick={handleCopySummary}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
          {copied ? 'Copied' : 'Copy Summary'}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center py-6 border-b border-slate-200">
        <div className="md:col-span-1 flex justify-center">
          <RiskMeter score={report.riskScore} verdict={report.verdict} />
        </div>

        <div className="md:col-span-2 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Executive Threat Analysis</span>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
            {report.summary}
          </p>
        </div>
      </div>

      {/* Categorized Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        
        {/* Red Flags */}
        <div className="p-5 rounded-xl bg-red-50/70 border border-red-200 space-y-3">
          <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Critical Red Flags ({report.redFlags?.length || 0})
          </div>
          {report.redFlags?.length > 0 ? (
            <ul className="space-y-2 text-xs text-red-900">
              {report.redFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No critical red flags detected.</p>
          )}
        </div>

        {/* Green Flags */}
        <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Positive Signals ({report.greenFlags?.length || 0})
          </div>
          {report.greenFlags?.length > 0 ? (
            <ul className="space-y-2 text-xs text-emerald-900">
              {report.greenFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No green flags verified.</p>
          )}
        </div>

      </div>

      {/* Action Steps */}
      {report.verificationSteps?.length > 0 && (
        <div className="mt-6 p-5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Info className="w-4 h-4 text-blue-600" />
            Recommended Verification Steps
          </div>
          <ol className="space-y-2 text-xs text-blue-950 list-decimal pl-5">
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
