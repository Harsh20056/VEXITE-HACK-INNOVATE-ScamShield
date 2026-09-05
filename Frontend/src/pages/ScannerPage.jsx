import React, { useState } from 'react';
import ScannerForm from '../components/ScannerForm';
import ResultDashboard from '../components/ResultDashboard';
import { verifyJobOffer } from '../services/api';
import { Sparkles, Shield, AlertCircle } from 'lucide-react';

export default function ScannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleScanSubmit = async ({ textContent, file }) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await verifyJobOffer({ textContent, file });
      setReport(res);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process job offer verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Workbench Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
          AI Detector Workbench
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Verify Offer Authenticity
        </h1>
        <p className="text-slate-400 text-sm sm:text-base font-medium">
          Paste the recruiter text message, job description link, or drag & drop an offer letter screenshot. Our AI will analyze indicators and calculate a risk score.
        </p>
      </div>

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Scanner Input Form */}
      <ScannerForm onScanSubmit={handleScanSubmit} isLoading={isLoading} />

      {/* Results Dashboard Section */}
      <ResultDashboard report={report} />

    </div>
  );
}
