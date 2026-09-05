import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function RiskMeter({ score = 0, verdict = 'SAFE' }) {
  const isSafe = verdict === 'SAFE' || verdict === 'Genuine / Clean' || score < 35;
  const isSuspicious = verdict === 'SUSPICIOUS' || (score >= 35 && score < 70);

  const theme = isSafe
    ? {
        color: '#10b981',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-700',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        label: 'GENUINE / CLEAN',
        Icon: ShieldCheck
      }
    : isSuspicious
    ? {
        color: '#f59e0b',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-700',
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        label: 'SUSPICIOUS',
        Icon: AlertTriangle
      }
    : {
        color: '#ef4444',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        badge: 'bg-red-100 text-red-800 border-red-300',
        label: 'SCAM / HIGH RISK',
        Icon: ShieldAlert
      };

  const IconComponent = theme.Icon;
  const strokeDashoffset = 283 - (283 * Math.min(score, 100)) / 100;

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-xl ${theme.bgColor} border ${theme.borderColor}`}>
      
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e2e8f0"
            strokeWidth="8"
            className="fill-none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={theme.color}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="fill-none transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {String(score).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            /100
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${theme.badge} flex items-center gap-1`}>
          <IconComponent className="w-3.5 h-3.5" />
          {theme.label}
        </span>
      </div>
    </div>
  );
}
