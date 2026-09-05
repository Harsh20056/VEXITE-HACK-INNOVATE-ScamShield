import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/mockAiService';
import { Search, Filter, Download, ShieldCheck, ShieldAlert, AlertTriangle, FileText, Lock, Cpu, ArrowUpRight, X } from 'lucide-react';
import ResultDashboard from '../components/ResultDashboard';

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState('ALL');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    setHistoryItems(getHistory());
  }, []);

  const defaultTableRows = [
    {
      id: 'inv-101',
      dateTime: 'Oct 24, 2024 14:32:08 UTC',
      entity: 'Stripe',
      entityBadge: 'Spoofed',
      badgeClass: 'bg-rose-100 text-rose-700',
      domain: 'careers-stripe-talent.com',
      subject: 'Senior Frontend Architect',
      channel: 'Unsolicited Email Offer · Attached PDF (2.4 MB)',
      score: 94,
      verdict: 'Scam / High Risk',
      statusClass: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      id: 'inv-102',
      dateTime: 'Oct 23, 2024 11:04:19 UTC',
      entity: 'Datadog, Inc.',
      entityBadge: 'DKIM Matched',
      badgeClass: 'bg-emerald-100 text-emerald-700',
      domain: 'recruiting@datadoghq.com',
      subject: 'Staff Site Reliability Engineer',
      channel: 'DocuSign Official Signature Envelope',
      score: 3,
      verdict: 'Genuine / Clean',
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      id: 'inv-103',
      dateTime: 'Oct 22, 2024 18:41:52 UTC',
      entity: 'Apex Cloud Logix',
      entityBadge: 'Unregistered',
      badgeClass: 'bg-slate-100 text-slate-700',
      domain: '@apex_recruit_manager',
      subject: 'Remote Data Entry / Operations Clerk',
      channel: 'Telegram Chat Interview · Check Deposit Request',
      score: 68,
      verdict: 'Suspicious',
      statusClass: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 'inv-104',
      dateTime: 'Oct 21, 2024 09:12:38 UTC',
      entity: 'Canonical Ltd',
      entityBadge: 'Verified',
      badgeClass: 'bg-emerald-100 text-emerald-700',
      domain: 'canonical.com/careers',
      subject: 'AI Research Scientist - Linux Kernel',
      channel: 'Greenhouse Job Board Portal URL',
      score: 5,
      verdict: 'Genuine / Clean',
      statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      id: 'inv-105',
      dateTime: 'Oct 19, 2024 16:55:01 UTC',
      entity: 'Meta Platforms',
      entityBadge: 'Impersonation',
      badgeClass: 'bg-rose-100 text-rose-700',
      domain: '+234 810 554 9961 (Spoofed)',
      subject: 'Customer Success Lead - EMEA',
      channel: 'WhatsApp Group Solicitation · Fake Test Link',
      score: 89,
      verdict: 'Scam / High Risk',
      statusClass: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      id: 'inv-106',
      dateTime: 'Oct 17, 2024 08:20:44 UTC',
      entity: 'FinTech Global Solutions',
      entityBadge: 'New Domain',
      badgeClass: 'bg-slate-100 text-slate-700',
      domain: 'fintech-onboarding-portal.xyz',
      subject: 'Compliance Operations Specialist',
      channel: 'Direct Outreach · Asks for SSN Verification',
      score: 74,
      verdict: 'Suspicious',
      statusClass: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
  ];

  const filteredRows = defaultTableRows.filter(row => {
    const matchesSearch = row.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          row.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          row.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterVerdict === 'ALL' ||
                          (filterVerdict === 'HIGH_RISK' && row.score >= 70) ||
                          (filterVerdict === 'SUSPICIOUS' && row.score >= 35 && row.score < 70) ||
                          (filterVerdict === 'CLEAN' && row.score < 35);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4">
      
      {/* Console Sub-Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Console</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">Scan History</span>
          <span>/</span>
          <span className="text-slate-500">Verified Audit Trail</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">All Scans (48)</span>
          <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[11px] font-bold">Scams Detected (14)</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold">Suspicious (8)</span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">Verified Clean (26)</span>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            Security Audit Log • Live Feed • Synchronized
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Scan History
          </h1>
          <p className="text-xs text-slate-600 max-w-2xl">
            Audit trail of analyzed communications, executive job postings, and encrypted offer documents across enterprise threat sessions.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search bar */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company, role, or incident ID..."
              className="w-full ent-input pl-8 pr-8 py-1.5 text-xs text-slate-800 focus:outline-none"
            />
            <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400 border border-slate-200 px-1 rounded">⌘K</span>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Filters
          </button>

          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* 4 Top Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="ent-card p-5 space-y-2 relative">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Total Scans Analyzed</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">48</span>
            <span className="text-xs font-bold text-emerald-600">↑ +18% this mo.</span>
          </div>
        </div>

        <div className="ent-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Fraud Prevented</span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-red-600">14</span>
            <span className="text-xs text-slate-500 font-semibold">Score &gt; 80%</span>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-[70%]" />
          </div>
        </div>

        <div className="ent-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Under Quarantine</span>
            <Lock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">2</span>
            <span className="text-xs text-slate-500 font-semibold">Awaiting Ops Review</span>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-400 w-[20%]" />
          </div>
        </div>

        <div className="ent-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Clean Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">54.2%</span>
            <span className="text-xs text-slate-500 font-semibold">26 Validated</span>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[54%]" />
          </div>
        </div>

      </div>

      {/* Main Table: Inspection Records */}
      <div className="ent-card overflow-hidden">
        
        {/* Table Header Strip */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Inspection Records</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              48 Verified Instances
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Telemetry Stream Active
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-6">Date / Time &darr;</th>
                <th className="py-3 px-6">Claimed Entity</th>
                <th className="py-3 px-6">Subject & Channel</th>
                <th className="py-3 px-6">Risk Score &uarr;&darr;</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {row.dateTime}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {row.entity.charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">{row.entity}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${row.badgeClass}`}>
                            {row.entityBadge}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-slate-400">{row.domain}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 space-y-0.5">
                    <span className="font-bold text-slate-900 block">{row.subject}</span>
                    <span className="text-[11px] text-slate-500 block">{row.channel}</span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 font-mono">{String(row.score).padStart(2, '0')}<span className="text-slate-400 text-[10px]">/100</span></span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${row.score >= 70 ? 'bg-red-500' : row.score >= 35 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${row.score}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${row.statusClass}`}>
                      {row.verdict}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedReport({
                        id: row.id,
                        companyClaimed: row.entity,
                        riskScore: row.score,
                        verdict: row.score >= 70 ? 'HIGH_RISK_SCAM' : row.score >= 35 ? 'SUSPICIOUS' : 'SAFE',
                        summary: `${row.subject} offer via ${row.channel}. Analyzed against domain MX records and corporate talent directories.`,
                        redFlags: row.score >= 70 ? ['Unregistered lookalike web domain', 'Financial demand / crypto fee clause', 'Informal recruiter contact channel'] : [],
                        greenFlags: row.score < 35 ? ['Official corporate DKIM digital signature matched', 'Verified talent acquisition manager roster'] : ['Detected employer brand name'],
                        verificationSteps: ['Cross-check recruiter identity on official corporate career portal.'],
                        createdAt: new Date().toISOString()
                      })}
                      className="text-blue-600 font-bold hover:underline cursor-pointer text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div>
            Showing <strong className="text-slate-900">1 to 6</strong> of 48 verifications &nbsp; Rows per page: 
            <select className="ml-1 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-800 font-bold">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded border border-slate-200 text-slate-400 cursor-not-allowed">&lt;</button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white font-bold">1</button>
            <button className="px-3 py-1 rounded hover:bg-slate-200">2</button>
            <button className="px-3 py-1 rounded hover:bg-slate-200">3</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="px-3 py-1 rounded hover:bg-slate-200">5</button>
            <button className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-200">&gt;</button>
          </div>
        </div>

      </div>

      {/* Bottom 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        
        <div className="ent-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <Lock className="w-4 h-4 text-blue-600" />
            Ledger Integrity
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            All 48 verifications are immutably signed using zero-knowledge hash commitments registered in the ScamShield AI Trust Cluster.
          </p>
          <div className="p-2.5 rounded bg-slate-900 text-slate-200 font-mono text-[10px] break-all">
            root_hash: 0x8f2a4c9b1e70d42fa88390b14c3327d549aef90214
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold pt-1">
            <span>SHA-256 Merkle Verification</span>
            <span className="text-emerald-600 flex items-center gap-1 font-bold">● Synced</span>
          </div>
        </div>

        <div className="ent-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <Cpu className="w-4 h-4 text-blue-600" />
            Automated Connectors
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Google Workspace and Microsoft Outlook webhooks are continuously streaming incoming employment communications into the AI inspector.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-bold">Gmail Hook: Active</span>
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-bold">Slack Hook: 4 Pending</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold pt-1">
            <span>Latency: 180ms</span>
            <span className="text-blue-600 font-bold hover:underline cursor-pointer">Configure API</span>
          </div>
        </div>

        <div className="ent-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            Threat Vector Shift
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Over the past 7 days, Telegram-based recruiter impersonations increased by 42%. Spoofed domain age average dropped from 12 days to 3.2 days.
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-red-500 w-[60%]" />
            <div className="h-full bg-amber-500 w-[25%]" />
            <div className="h-full bg-blue-600 w-[15%]" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold pt-1">
            <span>Top Attack: Identity Harvesting</span>
            <span className="text-blue-600 font-bold hover:underline cursor-pointer">Read Advisory</span>
          </div>
        </div>

      </div>

      {/* Selected Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>
            <ResultDashboard report={selectedReport} />
          </div>
        </div>
      )}

    </div>
  );
}
