'use client';
import React from 'react';
import AfDBLogo from '@/components/ui/AfDBLogo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-afdb-navy text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 800" className="w-full h-full">
            <circle cx="400" cy="400" r="350" fill="none" stroke="#009A44" strokeWidth="2"/>
            <circle cx="400" cy="400" r="250" fill="none" stroke="#F5A623" strokeWidth="1"/>
            <circle cx="400" cy="400" r="150" fill="none" stroke="#009A44" strokeWidth="1"/>
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <AfDBLogo size={56} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">African Development Bank</h1>
              <p className="text-afdb-gold text-sm font-medium">Group</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Secure Access<br/>Portal
          </h2>
          <p className="text-lg text-gray-300 max-w-md leading-relaxed">
            Enterprise-grade authentication with multi-factor security, role-based access control, and OWASP-compliant protection for all Bank systems.
          </p>
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-afdb-green"></div>
            <span>MFA-Protected Access</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-afdb-gold"></div>
            <span>SSO-IDP Federation</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <span>OWASP Top 10 Compliant</span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <AfDBLogo size={40} />
            <div>
              <h1 className="text-lg font-bold text-afdb-navy">African Development Bank</h1>
              <p className="text-afdb-gold text-xs font-medium">Secure Access Portal</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
