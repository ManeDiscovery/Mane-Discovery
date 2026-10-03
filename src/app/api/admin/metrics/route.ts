import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: Request) {
  try {
    // 1. Fetch Purchases
    const { data: purchases, error: pErr } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false });

    // 2. Fetch Quiz Leads
    const { data: leads, error: lErr } = await supabaseAdmin
      .from('quiz_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    // 3. Fetch Practitioner Applications
    const { data: apps, error: aErr } = await supabaseAdmin
      .from('practitioner_applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    // 4. Fetch Active Students / Profiles
    const { data: profiles, error: prErr } = await supabaseAdmin
      .from('profiles')
      .select('id, current_day, has_paid, tier, created_at');

    // Aggregate Financials
    const totalPurchases = purchases || [];
    const grossRevenueCents = totalPurchases.reduce((acc, p) => acc + (p.amount_cents || 0), 0);
    const soloCount = totalPurchases.filter(p => p.tier === 'basic').length;
    const cohortCount = totalPurchases.filter(p => p.tier === 'premium').length;

    // Aggregate Leads & Conversion
    const totalLeads = leads ? leads.length : 0;
    const convertedLeads = leads ? leads.filter(l => l.converted_to_paid).length : 0;
    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    // Aggregate Student Progress
    const totalStudents = profiles ? profiles.filter(p => p.has_paid).length : 0;
    const phase1Students = profiles ? profiles.filter(p => p.has_paid && (p.current_day || 1) <= 7).length : 0;
    const phase2Students = profiles ? profiles.filter(p => p.has_paid && (p.current_day || 1) > 7 && (p.current_day || 1) <= 14).length : 0;
    const phase3Students = profiles ? profiles.filter(p => p.has_paid && (p.current_day || 1) > 14).length : 0;

    return NextResponse.json({
      revenue: {
        grossRevenueDollars: (grossRevenueCents / 100).toFixed(2),
        soloCount,
        cohortCount,
        totalOrders: totalPurchases.length,
      },
      leads: {
        totalLeads,
        convertedLeads,
        conversionRate,
        recentLeads: leads ? leads.slice(0, 5) : [],
      },
      practitioners: {
        totalApplications: apps ? apps.length : 0,
        recentApplications: apps ? apps.slice(0, 5) : [],
      },
      students: {
        totalStudents,
        phase1Students,
        phase2Students,
        phase3Students,
      },
      recentPurchases: totalPurchases.slice(0, 5),
    });
  } catch (error: any) {
    console.error('Admin metrics error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
