'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/lib/auth';
import { User } from '@/types';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import {
  FolderKanban,
  DollarSign,
  Globe2,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      router.push('/login');
      return;
    }
    setUser(authUtils.getUser());
  }, [router]);

  if (!user) return null;

  const stats = [
    { label: 'Active Projects', value: '24', change: '+3', up: true, icon: FolderKanban, color: 'text-primary bg-primary/10' },
    { label: 'Total Budget', value: '$1.2B', change: '+12%', up: true, icon: DollarSign, color: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30' },
    { label: 'Countries', value: '18', change: '+2', up: true, icon: Globe2, color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30' },
    { label: 'Team Members', value: '156', change: '+8', up: true, icon: Users, color: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30' },
  ];

  const recentActivity = [
    { action: 'Project proposal submitted', project: 'East Africa Transport Corridor', time: '2 hours ago', status: 'active' },
    { action: 'Budget review completed', project: 'West Africa Power Pool', time: '5 hours ago', status: 'completed' },
    { action: 'New team member added', project: 'Sahel Region Development', time: '1 day ago', status: 'active' },
    { action: 'Quarterly report generated', project: 'North Africa Infrastructure', time: '2 days ago', status: 'completed' },
    { action: 'Risk assessment updated', project: 'Central Africa Digital Initiative', time: '3 days ago', status: 'review' },
  ];

  const systemStatus = [
    { name: 'Authentication Service', status: 'Operational', healthy: true },
    { name: 'Core Data Engine', status: 'Operational', healthy: true },
    { name: 'SSO-IDP Federation', status: 'Operational', healthy: true },
    { name: 'FileNet Integration', status: 'Maintenance', healthy: false },
  ];

  return (
    <AuthenticatedLayout
      pageTitle="Dashboard"
      breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Dashboard' }]}
    >
      {/* Welcome */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Afacad, sans-serif' }}>
          Welcome back, <span className="font-semibold text-foreground">{user.firstName}</span>. Here is your portal overview.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Afacad, sans-serif' }}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'Afacad, sans-serif' }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: 'Afacad, sans-serif' }}>
            <Activity className="w-4 h-4 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-1">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.status === 'active' ? 'bg-primary' :
                    item.status === 'completed' ? 'bg-gray-300 dark:bg-gray-600' :
                    'bg-amber-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.project}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: 'Afacad, sans-serif' }}>
            <CheckCircle2 className="w-4 h-4 text-primary" />
            System Status
          </h3>
          <div className="space-y-3">
            {systemStatus.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <span className="text-sm text-foreground">{item.name}</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                  item.healthy
                    ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                }`}>
                  {item.healthy ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Quick info card */}
          <div className="mt-6 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Afacad, sans-serif' }}>
                Session Info
              </span>
            </div>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Afacad, sans-serif' }}>
              Your session is secured with MFA. Last login: Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
