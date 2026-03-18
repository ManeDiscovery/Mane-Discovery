'use client';

import { useAppStore } from '@/store/useAppStore';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function RevealPage() {
  const { checkins } = useAppStore();

  const contexts = ['Partner', 'Parent', 'Child', 'Client', 'Horse', 'Self'];
  
  // Aggregate data for the radar chart
  const data = contexts.map((context) => {
    let secure = 0;
    let anxious = 0;
    let avoidant = 0;

    Object.values(checkins).forEach((checkin) => {
      if (checkin.relationalContext === context) {
        if (checkin.attachmentPattern === 'Secure Base') secure += 1;
        if (checkin.attachmentPattern === 'Anxious-Preoccupied') anxious += 1;
        if (checkin.attachmentPattern === 'Dismissive-Avoidant') avoidant += 1;
      }
    });

    // We add +0.1 just so the radar chart still draws a tiny dot at 0 instead of collapsing completely if a user has no data for a context.
    return {
      context,
      Secure: secure,
      Anxious: anxious,
      Avoidant: avoidant,
    };
  });

  // Calculate dominant style overall
  let totalSecure = 0, totalAnxious = 0, totalAvoidant = 0;
  data.forEach((d) => {
    totalSecure += d.Secure;
    totalAnxious += d.Anxious;
    totalAvoidant += d.Avoidant;
  });

  const maxTotal = Math.max(totalSecure, totalAnxious, totalAvoidant);
  let dominantStyle = 'Discovering...';
  let dominantMsg = 'Log more check-ins with relational contexts to see your biological attachment pattern.';

  if (maxTotal > 0) {
    if (totalSecure === maxTotal) {
      dominantStyle = 'Secure Base';
      dominantMsg = "Your nervous system frequently finds safety and connection across your relationships. You possess a strong ventral vagal anchor.";
    } else if (totalAnxious === maxTotal) {
      dominantStyle = 'Anxious-Preoccupied';
      dominantMsg = "Your system often relies on sympathetic activation (tension/mobilization) to seek connection. Your biology works hard to keep you safe through hyper-vigilance.";
    } else {
      dominantStyle = 'Dismissive-Avoidant';
      dominantMsg = "Your system often relies on dorsal vagal shutdown to protect you from relational overwhelm. Your biology finds safety in pulling back and conserving energy.";
    }
  }

  return (
    <div className="w-full max-w-4xl px-6 py-12 mx-auto space-y-16 pb-24 animate-in fade-in duration-700">
      <Link href="/" className="inline-flex items-center text-sage-500 hover:text-sage-900 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <header className="space-y-6 border-b border-sage-300/30 pb-10 text-center">
        <h2 className="text-sm font-bold tracking-widest text-rose-700 uppercase">Day 21 Completion</h2>
        <h1 className="text-4xl md:text-5xl font-serif text-sage-900 tracking-tight leading-tight">21-Day Attachment Report</h1>
        <p className="text-sage-700 max-w-2xl mx-auto text-lg leading-relaxed">
          This Discovery Artifact synthesizes 21 days of somatic check-ins. By mapping your nervous system states to the people in your field, we can observe your biological attachment styles—not drawn from a quiz, but straight from your body's wisdom.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2 bg-white rounded-[3rem] p-8 shadow-sm border border-sage-100 flex items-center justify-center">
          <div className="w-full h-[400px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="context" tick={{ fill: '#2E3B32', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 1']} tick={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                
                <Radar name="Secure Base (Safe/Play)" dataKey="Secure" stroke="#22C55E" fill="#22C55E" fillOpacity={0.4} />
                <Radar name="Anxious (Tension)" dataKey="Anxious" stroke="#D946EF" fill="#D946EF" fillOpacity={0.4} />
                <Radar name="Avoidant (Shutdown)" dataKey="Avoidant" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-sage-900 text-cream-100 rounded-3xl p-8 shadow-lg">
            <h3 className="text-sm font-bold tracking-widest uppercase text-sage-300 mb-4 border-b border-sage-700 pb-4">Primary Biological Footprint</h3>
            <h4 className="text-2xl font-serif mb-3 text-rose-200">{dominantStyle}</h4>
            <p className="text-sage-100/90 leading-relaxed text-sm">
              {dominantMsg}
            </p>
          </div>
          
          <div className="bg-cream-200/50 rounded-3xl p-8 border border-sage-200">
            <h3 className="text-sm font-bold tracking-widest uppercase text-sage-800 mb-3">How to read this chart</h3>
            <p className="text-sage-700 text-sm leading-relaxed">
              Spikes extending outward show higher frequency of that nervous system state when interacting with (or thinking about) that specific relational context. A perfectly secure system remains anchored in the green across all contexts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
