import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function RiskMeter({ score = 0, verdict = 'SAFE' }) {
  const isSafe = verdict === 'SAFE' || score < 35;
  const isSuspicious = verdict === 'SUSPICIOUS' || (score >= 35 && score < 70);

  const theme = isSafe
    ? {
        color: '#10b981',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
        textColor: 'text-emerald-400',
        glow: 'glow-emerald',
        label: 'VERIFIED LOW RISK',
        Icon: ShieldCheck
      }
    : isSuspicious
    ? {
        color: '#f59e0b',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        textColor: 'text-amber-400',
        glow: 'box-shadow-amber',
        label: 'SUSPICIOUS CAUTION',
        Icon: AlertTriangle
      }
    : {
        color: '#f43f5e',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30',
        textColor: 'text-rose-400',
        glow: 'glow-red',
        label: 'HIGH RISK SCAM',
        Icon: ShieldAlert
      };

  const IconComponent = theme.Icon;
  const strokeDashoffset = 283 - (283 * Math.min(score, 100)) / 100;

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl ${theme.bgColor} border ${theme.borderColor} ${theme.glow}`}>
      
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* SVG Circular Progress Gauge */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-800/80 fill-none"
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
            className="fill-none transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black ${theme.textColor} tracking-tight`}>
            {score}
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
            / 100 RISK
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <IconComponent className={`w-5 h-5 ${theme.textColor}`} />
        <span className={`text-sm font-extrabold tracking-wide uppercase ${theme.textColor}`}>
          {theme.label}
        </span>
      </div>
    </div>
  );
}
