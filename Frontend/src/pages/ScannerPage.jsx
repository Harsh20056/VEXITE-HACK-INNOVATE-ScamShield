import React, { useState } from 'react';
import ScannerForm from '../components/ScannerForm';
import ResultDashboard from '../components/ResultDashboard';
import { verifyJobOffer } from '../services/api';
import { PRESET_SAMPLES } from '../services/mockAiService';
import { Shield, Sparkles, AlertCircle, ArrowRight, Play, CheckCircle2, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function ScannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleScanSubmit = async (payload) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await verifyJobOffer(payload);
      setReport(res);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to execute AI Fraud Analysis. Please check network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSampleScam = () => {
    const sample = PRESET_SAMPLES[0]; // Telegram scam sample
    handleScanSubmit({ textContent: sample.content });
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4">
      
      {/* Console Sub-Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Console</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">AI Fraud Scanner</span>
          <span>/</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Engine v4.19 Online
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>Global Latency: <strong className="text-slate-800">42ms</strong></span>
          <span>Scams Intercepted (24h): <strong className="text-slate-800">14,289</strong></span>
          <span className="text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5">
            Live Threat Feeds <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            Diagnostic Suite • Zero-Knowledge Telemetry
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Fraud Scanner
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl">
            Submit suspicious job offer letters, recruiter emails, employment agreements, or interview tasks for immediate multi-vector risk verification and spoofed domain telemetry.
          </p>
        </div>

        <button
          onClick={handleLoadSampleScam}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs shadow-2xs transition-colors w-fit shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
          Load Sample Scam
        </button>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          {errorMsg}
        </div>
      )}

      {/* Main Form */}
      <ScannerForm onScanSubmit={handleScanSubmit} isLoading={isLoading} />

      {/* Report View Panel */}
      <ResultDashboard report={report} />

      {/* 3 Capabilities Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        <div className="ent-card p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
            🌐
          </div>
          <h4 className="text-sm font-bold text-slate-900">Domain Typosquatting</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Identifies lookalike recruiter URLs, recently registered TLDs (&lt;14 days old), and deceptive mail relays impersonating Fortune 500 talent systems.
          </p>
          <p className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
            Accuracy: 99.8% • DNS MX Verifier
          </p>
        </div>

        <div className="ent-card p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
            💳
          </div>
          <h4 className="text-sm font-bold text-slate-900">Equipment Check Scams</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Detects counterfeit cashier's check clauses, fraudulent vendor reimbursement schemes, and fake home office equipment advance mandates.
          </p>
          <p className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
            Regex + LLM Guardrails
          </p>
        </div>

        <div className="ent-card p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
            💬
          </div>
          <h4 className="text-sm font-bold text-slate-900">Interview Impersonation</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Analyzes chat scripts from Telegram, Signal, or WhatsApp interviews conducted without authentic video or validated enterprise single sign-on.
          </p>
          <p className="text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
            Heuristic Model 2.9
          </p>
        </div>

      </div>

      {/* Live Enterprise Inspection Stream */}
      <div className="ent-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Live Enterprise Stream</span>
            <h3 className="text-base font-bold text-slate-900">Recent Multi-Vector Inspections</h3>
          </div>
          <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
            View All Incident Logs &rarr;
          </span>
        </div>

        <div className="space-y-3">
          
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-red-100 text-red-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Advance Fee Equipment Invoice</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                    High Risk (94/100)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">ID: #SC-9982</span>
                </div>
                <p className="text-xs text-slate-600">
                  Candidate urged to deposit $3,500 check from "Apex Cloud Logix LLC" and wire funds to designated Apple certified reseller.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 self-end sm:self-center">2 mins ago</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Canonical Senior SRE Offer Letter</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Clean (03/100)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">ID: #SC-9979</span>
                </div>
                <p className="text-xs text-slate-600">
                  Valid DKIM cryptographic signature matched canonical.com MX records. Enterprise DocuSign certificate intact.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 self-end sm:self-center">18 mins ago</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-amber-100 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Telegram Text-Only Interview Transcript</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Suspicious (68/100)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">ID: #SC-9971</span>
                </div>
                <p className="text-xs text-slate-600">
                  No verified corporate email identity used. Questionnaire closely mimics known social engineering templates.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 self-end sm:self-center">44 mins ago</span>
          </div>

        </div>
      </div>

    </div>
  );
}
