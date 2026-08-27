'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/lib/auth';
import { User } from '@/types';
import AfDBLogo from '@/components/ui/AfDBLogo';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!authUtils.isAuthenticated()) { router.push('/login'); return; }
    setUser(authUtils.getUser());
  }, [router]);

  const handleLogout = () => {
    authUtils.clearAuth();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-afdb-gray">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AfDBLogo size={36} />
            <div>
              <h1 className="text-sm font-bold text-afdb-navy leading-tight">African Development Bank</h1>
              <p className="text-xs text-afdb-gray-dark">Secure Access Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-afdb-green rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-afdb-navy">Dashboard</h2>
          <p className="text-gray-500 mt-1">Welcome back, {user.firstName}. Here is your portal overview.</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Projects', value: '24', color: 'bg-afdb-green', icon: '📊' },
            { label: 'Total Budget', value: '$1.2B', color: 'bg-afdb-gold', icon: '💰' },
            { label: 'Countries', value: '18', color: 'bg-afdb-navy', icon: '🌍' },
            { label: 'Team Members', value: '156', color: 'bg-blue-500', icon: '👥' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              </div>
              <p className="text-3xl font-bold text-afdb-navy">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-afdb-navy mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Project proposal submitted', project: 'East Africa Transport Corridor', time: '2 hours ago', status: 'active' },
                { action: 'Budget review completed', project: 'West Africa Power Pool', time: '5 hours ago', status: 'completed' },
                { action: 'New team member added', project: 'Sahel Region Development', time: '1 day ago', status: 'active' },
                { action: 'Quarterly report generated', project: 'North Africa Infrastructure', time: '2 days ago', status: 'completed' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-afdb-green' : 'bg-gray-300'}`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.project}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-afdb-navy mb-4">System Status</h3>
            <div className="space-y-4">
              {[
                { name: 'Authentication Service', status: 'Operational' },
                { name: 'Core Data Engine', status: 'Operational' },
                { name: 'SSO-IDP Federation', status: 'Operational' },
                { name: 'FileNet Integration', status: 'Maintenance' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    item.status === 'Operational' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">&copy; 2026 African Development Bank Group. All rights reserved.</p>
          <p className="text-xs text-gray-400">Reference Application v1.0</p>
        </div>
      </footer>
    </div>
  );
}
