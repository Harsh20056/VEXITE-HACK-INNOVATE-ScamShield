import React, { useState } from 'react';
import { UploadCloud, FileText, Sparkles, Loader2, X, AlertCircle, PlayCircle, Zap } from 'lucide-react';
import { PRESET_SAMPLES } from '../services/mockAiService';

export default function ScannerForm({ onScanSubmit, isLoading }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !file) {
      setValidationError('Please enter a job description/text or upload an offer letter / screenshot.');
      return;
    }
    setValidationError('');
    onScanSubmit({ textContent: text, file });
  };

  const loadPreset = (preset) => {
    setText(preset.content);
    setFile(null);
    setValidationError('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Preset Sample Quick Load Ticker */}
      <div className="mb-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-lg">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" /> Quick Demo Presets (Click to load sample inputs):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PRESET_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => loadPreset(sample)}
              className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 text-left transition-all duration-200 group"
            >
              <PlayCircle className="w-4 h-4 text-cyan-400 group-hover:scale-110 shrink-0" />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-300 truncate">
                {sample.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Scanner Card Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative">
        
        {/* Error Alert */}
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            {validationError}
          </div>
        )}

        {/* Text Input Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Paste Job Description, Email, or Recruiter Message
            </label>
            <span className="text-xs text-slate-500 font-medium">Text or Link</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (validationError) setValidationError('');
            }}
            rows={5}
            placeholder="Paste job details here... (e.g. 'Selected for Remote Developer! Send $100 security deposit on Telegram...')"
            className="w-full glass-input rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-none font-sans"
          />
        </div>

        {/* Document Upload Zone */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-200 mb-2">
            Upload Offer Letter or Screenshot (PDF, PNG, JPG)
          </label>

          {file ? (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              <div className="flex items-center gap-3 truncate">
                <FileText className="w-6 h-6 text-cyan-400 shrink-0" />
                <div className="truncate">
                  <p className="truncate font-bold text-white">{file.name}</p>
                  <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 border border-transparent transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-slate-800 bg-slate-950/40 hover:border-cyan-500/40 hover:bg-slate-900/60'
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 text-cyan-400">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-200">
                Drop your offer document or <span className="text-cyan-400 underline underline-offset-4">browse files</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">Supports PDF, PNG, JPG up to 10MB</p>
            </div>
          )}
        </div>

        {/* Submit Scan Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Job Offer with Gemini AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-cyan-200 fill-cyan-200" />
              Scan & Verify Fraud Risk
            </>
          )}
        </button>
      </form>
    </div>
  );
}
