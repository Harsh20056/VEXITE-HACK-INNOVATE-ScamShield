import React from 'react';
import { Shield, Lock, AlertTriangle, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">ScamShield <span className="text-cyan-400">AI</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-driven career security platform protecting job seekers, students, and professionals from fraudulent recruitment schemes, Telegram deposit scams, and identity theft.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <Lock className="w-3.5 h-3.5" /> 100% Privacy Preserved Analysis
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Overview</Link></li>
              <li><Link to="/scan" className="hover:text-cyan-400 transition-colors">AI Job Scanner</Link></li>
              <li><Link to="/history" className="hover:text-cyan-400 transition-colors">Past Scan Logs</Link></li>
              <li><Link to="/guide" className="hover:text-cyan-400 transition-colors">Scam Prevention Guide</Link></li>
            </ul>
          </div>

          {/* Top Threat Indicators */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Top Red Flags</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Security Deposit & Equipment Fees</li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Recruiter shifting to Telegram/WhatsApp</li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Spoofed Web Mail Domains (.biz / .xyz)</li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Direct hiring without interview rounds</li>
            </ul>
          </div>

          {/* Verification Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Cyber Safety Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://www.ic3.gov" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  FBI Internet Crime Center <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://reportfraud.ftc.gov" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  FTC Fraud Reporting Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  National Cyber Crime Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ScamShield AI. Built for MLH HackDay. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Empowering job seekers everywhere with Google Gemini AI intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
