import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/mockAiService';
import { History, Search, ShieldCheck, ShieldAlert, AlertTriangle, Building2, Calendar, ChevronRight, X, Trash2 } from 'lucide-react';
import ResultDashboard from '../components/ResultDashboard';

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState('ALL');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    setHistoryItems(getHistory());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all local scan history?')) {
      localStorage.removeItem('scamshield_history');
      setHistoryItems([]);
    }
  };

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      (item.companyClaimed || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVerdict = filterVerdict === 'ALL' || item.verdict === filterVerdict;
    return matchesSearch && matchesVerdict;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <History className="w-8 h-8 text-cyan-400" />
            Scan Verification Logs
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review past job offer security assessments and fraud analysis reports.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-xs font-bold text-slate-400 hover:text-rose-400 transition-all w-fit"
          >
            <Trash2 className="w-4 h-4" />
            Clear Local Logs
          </button>
        )}
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employer or report summary..."
            className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Verdict Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Scans' },
            { id: 'HIGH_RISK_SCAM', label: '🚨 High Risk' },
            { id: 'SUSPICIOUS', label: '⚠️ Suspicious' },
            { id: 'SAFE', label: '✅ Safe' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterVerdict(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterVerdict === pill.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* History List Grid */}
      {filteredItems.length > 0 ? (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isSafe = item.verdict === 'SAFE';
            const isSuspicious = item.verdict === 'SUSPICIOUS';

            const badgeStyle = isSafe
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : isSuspicious
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30';

            const Icon = isSafe ? ShieldCheck : isSuspicious ? AlertTriangle : ShieldAlert;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedReport(item)}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${badgeStyle} shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {item.companyClaimed}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${badgeStyle}`}>
                        {item.verdict.replace(/_/g, ' ')} ({item.riskScore}/100)
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform self-end md:self-center shrink-0">
                  View Full Report <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800 space-y-3">
          <p className="text-slate-400 font-semibold">No scan logs match your filter criteria.</p>
        </div>
      )}

      {/* Selected Report Modal Popup */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-rose-500/20"
            >
              <X className="w-6 h-6" />
            </button>
            <ResultDashboard report={selectedReport} />
          </div>
        </div>
      )}

    </div>
  );
}
