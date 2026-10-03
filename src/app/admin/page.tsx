'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  DollarSign, 
  Users, 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  RefreshCw, 
  Play, 
  CheckCircle2, 
  TrendingUp, 
  FileText,
  Activity,
  Lock,
  Unlock
} from 'lucide-react';

interface MetricsData {
  revenue: {
    grossRevenueDollars: string;
    soloCount: number;
    cohortCount: number;
    totalOrders: number;
  };
  leads: {
    totalLeads: number;
    convertedLeads: number;
    conversionRate: number;
    recentLeads: any[];
  };
  practitioners: {
    totalApplications: number;
    recentApplications: any[];
  };
  students: {
    totalStudents: number;
    phase1Students: number;
    phase2Students: number;
    phase3Students: number;
  };
  recentPurchases: any[];
}

export default function AdminDashboard() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [runningAction, setRunningAction] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState('');

  // Simple passkey check for executive dashboard
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'mane2026' || pin === 'admin' || pin === 'maria') {
      setIsAuthenticated(true);
      sessionStorage.setItem('mane_admin_auth', 'true');
      fetchMetrics();
    } else {
      alert('Invalid Access PIN');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('mane_admin_auth') === 'true') {
      setIsAuthenticated(true);
      fetchMetrics();
    }
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/metrics');
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const logAction = (msg: string) => {
    setActionLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 15)]);
  };

  // 1-Click Operations Simulation Tools
  const handleSimulateCheckout = async (tier: 'basic' | 'premium') => {
    setRunningAction('checkout');
    logAction(`Simulating Stripe Checkout webhook for ${tier} tier...`);
    try {
      const recipientEmail = testEmail.trim() || `test_traveler_${Date.now().toString().slice(-4)}@example.com`;
      const dummySessionId = `cs_test_sim_${Date.now()}`;
      const amountTotal = tier === 'basic' ? 3900 : 9700;

      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'checkout.session.completed',
          data: {
            object: {
              id: dummySessionId,
              customer_details: { email: recipientEmail, name: 'Simulated Traveler' },
              amount_total: amountTotal,
              currency: 'usd',
              metadata: { tier },
            }
          }
        }),
      });

      const data = await res.json();
      if (data.received) {
        logAction(`✅ Webhook processed! Provisioned ${tier} access & sent Welcome Email to ${recipientEmail} ($${amountTotal / 100}).`);
        fetchMetrics();
      } else {
        logAction(`❌ Webhook error: ${JSON.stringify(data)}`);
      }
    } catch (e: any) {
      logAction(`❌ Execution failed: ${e.message}`);
    } finally {
      setRunningAction(null);
    }
  };

  const handleTriggerDailyCron = async () => {
    setRunningAction('cron');
    logAction('Triggering daily lesson reminder engine...');
    try {
      const res = await fetch('/api/cron/daily-reminder', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        logAction(`✅ Daily reminder cron completed! Sent prompts to ${data.dispatchedCount} active participants.`);
      } else {
        logAction(`❌ Cron error: ${data.error}`);
      }
    } catch (e: any) {
      logAction(`❌ Cron request failed: ${e.message}`);
    } finally {
      setRunningAction(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-8 rounded-[2rem] shadow-sm border border-sage-200 text-center space-y-6">
          <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto text-sage-800">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-serif text-sage-900">Operations Cockpit</h1>
            <p className="text-xs text-sage-600 mt-1">Enter Master Access PIN to view business metrics</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN (e.g. mane2026)"
              className="w-full text-center px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-400 text-sage-900 font-mono text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-sage-900 text-cream-50 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-sage-800 transition-colors shadow-sm"
            >
              Access Dashboard
            </button>
          </form>
          <Link href="/" className="inline-block text-xs text-sage-500 hover:text-sage-800">
            &larr; Back to Main Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 font-sans selection:bg-rose-200 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-sage-200 pb-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sage-500 hover:text-sage-900 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 mr-1 inline" />
              Storefront
            </Link>
            <span className="text-sage-300">/</span>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-2xl font-serif text-sage-900">Mane Discovery Command Center</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchMetrics}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-white text-sage-700 border border-sage-200 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-sage-50 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('mane_admin_auth');
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 text-sage-500 hover:text-rose-600 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Lock
            </button>
          </div>
        </div>

        {/* 4 Core Financial & Funnel Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Revenue */}
          <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-sm space-y-2">
            <div className="flex justify-between items-start text-sage-500">
              <span className="text-xs uppercase font-bold tracking-widest">Gross Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-sans font-bold text-sage-900">
              ${metrics?.revenue.grossRevenueDollars || '0.00'}
            </div>
            <p className="text-xs text-sage-600">
              {metrics?.revenue.soloCount || 0} Solo ($39) • {metrics?.revenue.cohortCount || 0} Cohort ($97)
            </p>
          </div>

          {/* Quiz Leads */}
          <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-sm space-y-2">
            <div className="flex justify-between items-start text-sage-500">
              <span className="text-xs uppercase font-bold tracking-widest">Quiz Leads Captured</span>
              <Sparkles className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-3xl font-sans font-bold text-sage-900">
              {metrics?.leads.totalLeads || 0}
            </div>
            <p className="text-xs text-sage-600">
              Conversion rate to checkout: <strong className="text-sage-900">{metrics?.leads.conversionRate || 0}%</strong>
            </p>
          </div>

          {/* Active Students */}
          <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-sm space-y-2">
            <div className="flex justify-between items-start text-sage-500">
              <span className="text-xs uppercase font-bold tracking-widest">Active Students</span>
              <Users className="w-4 h-4 text-sage-700" />
            </div>
            <div className="text-3xl font-sans font-bold text-sage-900">
              {metrics?.students.totalStudents || 0}
            </div>
            <p className="text-xs text-sage-600">
              Phase 1: {metrics?.students.phase1Students || 0} • Phase 2: {metrics?.students.phase2Students || 0} • Phase 3: {metrics?.students.phase3Students || 0}
            </p>
          </div>

          {/* Practitioner Pipeline */}
          <div className="bg-white p-6 rounded-3xl border border-sage-200 shadow-sm space-y-2">
            <div className="flex justify-between items-start text-sage-500">
              <span className="text-xs uppercase font-bold tracking-widest">Practitioner Queue</span>
              <HeartHandshake className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-sans font-bold text-sage-900">
              {metrics?.practitioners.totalApplications || 0}
            </div>
            <p className="text-xs text-sage-600">
              High-Ticket pipeline ($1,500+ value)
            </p>
          </div>

        </div>

        {/* Autonomous Engine Control Panel */}
        <div className="bg-sage-900 text-cream-50 rounded-[2.5rem] p-8 md:p-10 shadow-xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-400/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              <Activity className="w-3.5 h-3.5 text-rose-300" />
              Self-Running Engine Controls
            </div>
            <h2 className="text-2xl font-serif text-cream-100">Automation & Webhook Test Harness</h2>
            <p className="text-xs text-sage-300 mt-1">
              Verify zero-touch workflows, simulate live checkouts, and dispatch daily reminders without real cards.
            </p>
          </div>

          {/* Test Recipient Email Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-sage-800/80 p-3.5 rounded-2xl border border-sage-700">
            <label className="text-xs font-bold uppercase tracking-wider text-sage-300 shrink-0">
              Send Test Email To:
            </label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter your email to receive live test emails (optional)"
              className="flex-1 bg-sage-950 px-4 py-2 rounded-xl border border-sage-700 text-cream-100 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-sage-500"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleSimulateCheckout('basic')}
              disabled={runningAction !== null}
              className="p-5 bg-sage-800 hover:bg-sage-700 border border-sage-700 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Simulate Solo Order</span>
                <Play className="w-4 h-4 text-emerald-300" />
              </div>
              <p className="text-sm font-medium text-cream-100">Test $39 Stripe Webhook</p>
              <p className="text-xs text-sage-400">Creates purchase record, unlocks account, triggers Zapier.</p>
            </button>

            <button
              onClick={() => handleSimulateCheckout('premium')}
              disabled={runningAction !== null}
              className="p-5 bg-sage-800 hover:bg-sage-700 border border-sage-700 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-300">Simulate Cohort Order</span>
                <Play className="w-4 h-4 text-rose-300" />
              </div>
              <p className="text-sm font-medium text-cream-100">Test $97 Cohort Webhook</p>
              <p className="text-xs text-sage-400">Sets user tier to premium and fires cohort onboarding.</p>
            </button>

            <button
              onClick={handleTriggerDailyCron}
              disabled={runningAction !== null}
              className="p-5 bg-sage-800 hover:bg-sage-700 border border-sage-700 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">Trigger Daily Cron</span>
                <RefreshCw className="w-4 h-4 text-amber-300" />
              </div>
              <p className="text-sm font-medium text-cream-100">Run Daily Practice Reminders</p>
              <p className="text-xs text-sage-400">Queries active participants and dispatches lesson prompts.</p>
            </button>
          </div>

          {/* Action Console Log */}
          {actionLog.length > 0 && (
            <div className="bg-sage-950 p-4 rounded-xl border border-sage-800 font-mono text-xs text-sage-300 space-y-1 max-h-40 overflow-y-auto">
              {actionLog.map((log, i) => (
                <div key={i} className="leading-relaxed">{log}</div>
              ))}
            </div>
          )}
        </div>

        {/* Leads & Applications Live Feed */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Recent Quiz Leads */}
          <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm space-y-4">
            <h3 className="text-xl font-serif text-sage-900 flex items-center justify-between">
              <span>Recent Diagnostic Leads</span>
              <span className="text-xs font-sans uppercase tracking-widest text-sage-500 bg-sage-100 px-3 py-1 rounded-full">
                {metrics?.leads.recentLeads.length || 0} Recent
              </span>
            </h3>
            
            <div className="space-y-3">
              {metrics?.leads.recentLeads && metrics.leads.recentLeads.length > 0 ? (
                metrics.leads.recentLeads.map((lead: any, i: number) => (
                  <div key={i} className="p-4 rounded-2xl border border-sage-100 bg-cream-50/50 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-sage-900">{lead.name || 'Anonymous Traveler'}</p>
                      <p className="text-xs text-sage-600">{lead.email}</p>
                      <p className="text-xs text-rose-500 font-medium mt-1">{lead.archetype}</p>
                    </div>
                    <div>
                      {lead.converted_to_paid ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Converted
                        </span>
                      ) : (
                        <span className="text-[10px] bg-sage-100 text-sage-700 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          In Nurture
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-sage-500 py-6 text-center italic">
                  No quiz leads logged yet. Visitors taking the free quiz at <Link href="/quiz" className="underline font-bold">/quiz</Link> will appear here.
                </p>
              )}
            </div>
          </div>

          {/* Recent Practitioner Applications */}
          <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm space-y-4">
            <h3 className="text-xl font-serif text-sage-900 flex items-center justify-between">
              <span>Practitioner Applications</span>
              <span className="text-xs font-sans uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                High-Ticket
              </span>
            </h3>

            <div className="space-y-3">
              {metrics?.practitioners.recentApplications && metrics.practitioners.recentApplications.length > 0 ? (
                metrics.practitioners.recentApplications.map((app: any, i: number) => (
                  <div key={i} className="p-4 rounded-2xl border border-sage-100 bg-cream-50/50 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-sage-900">{app.full_name}</p>
                        <p className="text-xs text-sage-600">{app.email} • {app.phone || 'No phone'}</p>
                      </div>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {app.status || 'Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-sage-700 bg-white p-2.5 rounded-xl border border-sage-100 italic">
                      "{app.motivation?.slice(0, 100)}..."
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-sage-500 py-6 text-center italic">
                  No applications received yet. Submissions from <Link href="/practitioner" className="underline font-bold">/practitioner</Link> will appear here.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
