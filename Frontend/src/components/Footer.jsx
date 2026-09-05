import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Col (Spans 2) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">ScamShield Enterprise</span>
            </div>

            <p className="text-slate-500 leading-relaxed max-w-sm">
              High-assurance identity intelligence, automated fraud detection, and candidate integrity verification for mission-critical workforce platforms.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> SOC 2 Type II Certified
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700">
                ISO 27001 Compliant
              </span>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link to="/scan" className="hover:text-blue-600 transition-colors">AI Scanner</Link></li>
              <li><Link to="/history" className="hover:text-blue-600 transition-colors">Scan History</Link></li>
              <li><a href="#threats" className="hover:text-blue-600 transition-colors">Threat Intelligence</a></li>
              <li><a href="#api" className="hover:text-blue-600 transition-colors">API Integration</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2 text-slate-600">
              <li><Link to="/guide" className="hover:text-blue-600 transition-colors">Documentation & Guides</Link></li>
              <li><a href="#whitepaper" className="hover:text-blue-600 transition-colors">Security Whitepaper</a></li>
              <li><a href="#api-ref" className="hover:text-blue-600 transition-colors">API References</a></li>
              <li><a href="#lab" className="hover:text-blue-600 transition-colors">Fraud Research Lab</a></li>
            </ul>
          </div>

          {/* Compliance & Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Compliance & Trust</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#trust" className="hover:text-blue-600 transition-colors">Trust Center</a></li>
              <li><a href="#privacy" className="hover:text-blue-600 transition-colors">Privacy Framework</a></li>
              <li><a href="#dpa" className="hover:text-blue-600 transition-colors">Data Processing Agreement</a></li>
              <li><a href="#disclosure" className="hover:text-blue-600 transition-colors">Vulnerability Disclosure</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2025 ScamShield Enterprise Inc. All rights reserved. Zero-latency identity defense.</p>
          <div className="flex items-center gap-4">
            <a href="#security" className="hover:text-slate-900">Security Policy</a>
            <a href="#terms" className="hover:text-slate-900">Terms of Service</a>
            <a href="#privacy-shield" className="hover:text-slate-900">Privacy Shield</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
