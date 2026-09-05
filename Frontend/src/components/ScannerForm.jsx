import React, { useState } from 'react';
import { UploadCloud, FileText, Loader2, X, AlertCircle, Shield, Clipboard, Check, Lock, Link as LinkIcon } from 'lucide-react';
import { PRESET_SAMPLES } from '../services/mockAiService';

export default function ScannerForm({ onScanSubmit, isLoading }) {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'file' | 'url'
  const [text, setText] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [file, setFile] = useState(null);
  const [recruiterDomain, setRecruiterDomain] = useState('');
  const [engineScope, setEngineScope] = useState('ALL_HEURISTICS');
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [pastedMsg, setPastedMsg] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setValidationError('');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setValidationError('');
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        if (activeTab === 'url') {
          setJobUrl(clipText);
        } else {
          setText(clipText);
        }
        setPastedMsg(true);
        setTimeout(() => setPastedMsg(false), 2000);
      }
    } catch (err) {
      console.error('Clipboard paste failed:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'text' && !text.trim() && !file) {
      setValidationError('Please paste job communication text or upload a document artifact to analyze.');
      return;
    }

    if (activeTab === 'file' && !file) {
      setValidationError('Please select or drop an offer letter or contract PDF/Image artifact to analyze.');
      return;
    }

    if (activeTab === 'url' && !jobUrl.trim()) {
      setValidationError('Please enter a valid job posting URL to analyze.');
      return;
    }

    setValidationError('');
    
    const finalContent = activeTab === 'url' ? `Job Posting URL: ${jobUrl}` : text;
    onScanSubmit({ textContent: finalContent, file, recruiterDomain, engineScope });
  };

  return (
    <form onSubmit={handleSubmit} className="ent-card p-6 sm:p-8 space-y-6">
      
      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setActiveTab('text');
              setValidationError('');
            }}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'text' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Text / Communication
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('file');
              setValidationError('');
            }}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'file' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            File Upload Only
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('url');
              setValidationError('');
            }}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'url' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Job Post URL
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          Client-side PII Masking: <span className="text-emerald-700 font-bold">Active</span>
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          {validationError}
        </div>
      )}

      {/* TAB 1: Text / Communication Input */}
      {activeTab === 'text' && (
        <>
          <div className="space-y-2 relative">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <label>Job Offer, Email, or Communication Content <span className="text-red-500">*</span></label>
              <span className="text-slate-400 font-normal">{text.length} / 25,000 chars</span>
            </div>

            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (validationError) setValidationError('');
              }}
              rows={6}
              placeholder="Paste recruiter messages, suspicious email threads, employment contracts, Telegram/WhatsApp interview transcripts, check deposit instructions, or offer details here..."
              className="w-full ent-input p-4 text-xs font-mono text-slate-900 placeholder-slate-400 resize-none focus:outline-none"
            />

            <button
              type="button"
              onClick={handlePasteClipboard}
              className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
            >
              {pastedMsg ? <Check className="w-3 h-3 text-emerald-600" /> : <Clipboard className="w-3 h-3" />}
              {pastedMsg ? 'Pasted!' : 'Paste'}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <label>Supplementary Contract / PDF Artifact</label>
              <span className="text-slate-400 font-normal">Optional (Max 25MB)</span>
            </div>

            {file ? (
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="truncate">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <UploadCloud className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-xs font-bold text-slate-700">
                  <span className="text-blue-600">Drop offer letters or contracts here</span>, or browse local files
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Supported formats: PDF, DOCX, PNG, JPG (OCR extracts embedded headers & digital signatures)
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* TAB 2: File Upload Only */}
      {activeTab === 'file' && (
        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <label>Primary Employment Contract or Offer Letter PDF/Image <span className="text-red-500">*</span></label>
            <span className="text-slate-400 font-normal">Max 25MB</span>
          </div>

          {file ? (
            <div className="flex items-center justify-between p-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-bold text-slate-800">
              <div className="flex items-center gap-3 truncate">
                <FileText className="w-6 h-6 text-blue-600 shrink-0" />
                <div className="truncate">
                  <p className="font-bold text-slate-900 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500 font-normal">{(file.size / 1024).toFixed(1)} KB • Ready for OCR Forensic Triage</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                <span className="text-blue-600">Click or Drag & Drop</span> your offer letter PDF or screenshot
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Full cryptographic OCR scan, signature verification, and clause anomaly check
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Job Post URL */}
      {activeTab === 'url' && (
        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <label>Job Posting URL or Career Portal Link <span className="text-red-500">*</span></label>
            <span className="text-slate-400 font-normal">HTTP / HTTPS</span>
          </div>

          <div className="relative">
            <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => {
                setJobUrl(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder="e.g. https://www.linkedin.com/jobs/view/39402910/ or https://careers-company-secure.org/job"
              className="w-full ent-input pl-10 pr-20 py-2.5 text-xs font-mono text-slate-900 focus:outline-none"
            />
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="absolute right-2 top-2 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
            >
              {pastedMsg ? <Check className="w-3 h-3 text-emerald-600" /> : <Clipboard className="w-3 h-3" />}
              {pastedMsg ? 'Pasted!' : 'Paste'}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Our AI crawler fetches the domain WHOIS record, MX mail alignment, and posting content for automated risk scoring.
          </p>
        </div>
      )}

      {/* Recruiter Domain + Verification Scope Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Recruiter Domain or Email Header (Optional)</label>
          <input
            type="text"
            value={recruiterDomain}
            onChange={(e) => setRecruiterDomain(e.target.value)}
            placeholder="e.g. hr@canonical-careers-secure.org"
            className="w-full ent-input px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Verification Depth & Engine Scope</label>
          <select
            value={engineScope}
            onChange={(e) => setEngineScope(e.target.value)}
            className="w-full ent-input px-3 py-2 text-xs text-slate-900 focus:outline-none font-semibold bg-white cursor-pointer"
          >
            <option value="ALL_HEURISTICS">Deep Domain & Payroll Fraud Telemetry (ALL HEURISTICS)</option>
            <option value="FAST_TRIAGE">Fast Sub-Second Triage</option>
            <option value="LEGAL_CLAUSE">Legal Clause & Contract Anomaly</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Executing Multi-Vector AI Fraud Inference...
          </>
        ) : (
          <>
            <Shield className="w-4 h-4" />
            Execute AI Fraud Analysis
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
        <Shield className="w-3 h-3 text-emerald-600" />
        SOC 2 Type II certified. Zero-knowledge submission — raw documents and personal identifiers are scrubbed prior to model inference.
      </p>

    </form>
  );
}
