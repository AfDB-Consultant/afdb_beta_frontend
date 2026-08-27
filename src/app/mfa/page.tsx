'use client';
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import { authUtils } from '@/lib/auth';
import api from '@/lib/api';
import { LoginResponse } from '@/types';

function MfaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) { setError('Enter the full 6-digit code'); return; }
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post<LoginResponse>('/auth/verify-mfa', { userId, token: code });
      if (data.data?.accessToken && data.data?.user) {
        authUtils.setAuthData(
          { accessToken: data.data.accessToken, refreshToken: data.data.refreshToken! },
          data.data.user
        );
        router.push('/dashboard');
      }
    } catch {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-afdb-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-afdb-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-afdb-navy">Two-Factor Authentication</h2>
        <p className="text-gray-500 mt-2">Enter the 6-digit code from your authenticator app</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">{error}</div>
      )}

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-48 text-center text-3xl font-mono tracking-[0.5em] py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-afdb-green focus:ring-2 focus:ring-afdb-green/20 transition-all"
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="w-full py-3 bg-afdb-green hover:bg-afdb-green-dark text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Verifying...
            </>
          ) : (
            'Verify & Continue'
          )}
        </button>

        <button type="button" onClick={() => router.push('/login')} className="w-full text-center text-sm text-gray-500 hover:text-afdb-green transition-colors">
          Back to login
        </button>
      </form>
    </AuthLayout>
  );
}

export default function MfaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <MfaContent />
    </Suspense>
  );
}
