'use client';

import { useState, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import Link from 'next/link';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import html2canvas from 'html2canvas';

export default function RevealPage() {
  const { checkins } = useAppStore();
  const [step, setStep] = useState(0);
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const totalCheckins = Object.keys(checkins).length;

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
      Secure: secure + 0.1,
      Anxious: anxious + 0.1,
      Avoidant: avoidant + 0.1,
    };
  });

  // Calculate dominant style overall
  let totalSecure = 0, totalAnxious = 0, totalAvoidant = 0;
  data.forEach((d) => {
    // Only count actual numbers (minus the 0.1 hack for the chart)
    totalSecure += Math.floor(d.Secure);
    totalAnxious += Math.floor(d.Anxious);
    totalAvoidant += Math.floor(d.Avoidant);
  });

  const maxTotal = Math.max(totalSecure, totalAnxious, totalAvoidant);
  let dominantStyle = 'Discovering...';
  let archetype = 'The Observer';
  let dominantMsg = 'Log more check-ins with relational contexts to see your biological attachment pattern.';
  let nextSteps = 'Continue your daily physical practices to build more data over time.';

  if (maxTotal > 0) {
    if (totalSecure === maxTotal) {
      dominantStyle = 'Secure Base';
      archetype = 'The Lead Mare';
      dominantMsg = "Your nervous system frequently finds safety and connection across your relationships. You possess a strong ventral vagal anchor, leading your 'herd' with steady calm.";
      nextSteps = "Action Items: Keep cultivating your capacity for joy and play. You can now use your anchored nervous system to co-regulate others when they are distressed.";
    } else if (totalAnxious === maxTotal) {
      dominantStyle = 'Anxious-Preoccupied';
      archetype = 'The Sentinel';
      dominantMsg = "Your system often relies on sympathetic activation (tension/mobilization) to seek connection. Your biology works hard to keep you safe through hyper-vigilance and attunement to others.";
      nextSteps = "Action Items: Your system needs to know it's safe to rest. Focus heavily on heavy grounding exercises (like the 'Earth Anchor' series) and emphasize prolonged exhales to signal safety to your brainstem.";
    } else {
      dominantStyle = 'Dismissive-Avoidant';
      archetype = 'The Anchor';
      dominantMsg = "Your system often relies on dorsal vagal shutdown to protect you from relational overwhelm. Your biology finds safety in pulling back, conserving energy, and observing from the periphery.";
      nextSteps = "Action Items: Your system needs gentle coaxing back into the world. Focus on 'Orienting' practices (looking around your environment) and very gentle, swaying movements to bring energy back into your limbs without overwhelming your capacity.";
    }
  }

  const handleDownload = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: '#FAFAF9' });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'Mane-Discovery-Nervous-System-Map.png';
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
    }
    setIsDownloading(false);
  };

  return (
    <div className="w-full max-w-4xl px-6 py-12 mx-auto space-y-16 pb-24 animate-in fade-in duration-700">
      <Link href="/dashboard" className="inline-flex items-center text-sage-500 hover:text-sage-900 transition-colors mb-4 print:hidden">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {step === 0 && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-sm font-bold tracking-widest text-rose-700 uppercase">Milestone Reached</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-sage-900 tracking-tight leading-tight">Welcome to Day 21</h1>
          <p className="text-xl text-sage-700 max-w-lg mx-auto leading-relaxed">
            Over the last 21 days, you've shown up for yourself and logged <span className="font-bold text-sage-900">{totalCheckins} somatic check-ins.</span>
          </p>
          <button 
            onClick={() => setStep(1)}
            className="mt-8 px-8 py-4 bg-sage-900 text-cream-50 rounded-full font-medium tracking-wide hover:bg-sage-800 transition-colors inline-flex items-center group shadow-md"
          >
            Continue 
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-in slide-in-from-bottom-8 duration-1000">
          <p className="text-2xl md:text-3xl font-serif text-sage-800 max-w-2xl mx-auto leading-relaxed italic">
            "Your body has been tracking every interaction, every shift in your nervous system. By observing these patterns, we can see your biological attachment style—straight from your body's wisdom."
          </p>
          <button 
            onClick={() => setStep(2)}
            className="mt-8 px-8 py-4 bg-sage-900 text-cream-50 rounded-full font-medium tracking-wide hover:bg-sage-800 transition-colors inline-flex items-center group shadow-md"
          >
            Reveal My Map
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div ref={reportRef} className="space-y-16 animate-in zoom-in-95 duration-1000 bg-cream-50 sm:p-8 sm:rounded-[3rem] relative">
          {/* Download Button */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 print:hidden">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 bg-sage-200/50 hover:bg-sage-200 text-sage-900 rounded-full text-sm font-medium transition-colors flex items-center shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? 'Saving...' : 'Download Map'}
            </button>
          </div>

          <header className="space-y-6 border-b border-sage-300/30 pb-10 text-center pt-8 sm:pt-0">
            <h2 className="text-sm font-bold tracking-widest text-rose-700 uppercase">Day 21 Completion</h2>
            <h1 className="text-4xl md:text-5xl font-serif text-sage-900 tracking-tight leading-tight">Your Nervous System Map</h1>
            <p className="text-sage-700 max-w-2xl mx-auto text-lg leading-relaxed">
              This synthesis reveals how your nervous system responds across different relational fields.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 bg-white rounded-[3rem] p-8 shadow-sm border border-sage-100 flex flex-col items-center justify-center">
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
                    
                    <Radar name="Secure Base (Safe)" dataKey="Secure" stroke="#22C55E" fill="#22C55E" fillOpacity={0.4} />
                    <Radar name="Anxious (Tension)" dataKey="Anxious" stroke="#D946EF" fill="#D946EF" fillOpacity={0.4} />
                    <Radar name="Avoidant (Shutdown)" dataKey="Avoidant" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6 h-full flex flex-col">
              {/* Archetype Card */}
              <div className="bg-sage-900 text-cream-100 rounded-3xl p-8 shadow-lg">
                <h3 className="text-xs font-bold tracking-widest uppercase text-sage-400 mb-2">Primary Archetype</h3>
                <h4 className="text-3xl font-serif mb-4 text-rose-200">{archetype}</h4>
                <div className="inline-block px-3 py-1 bg-sage-800 rounded-full text-xs font-medium text-sage-200 mb-4">
                  {dominantStyle}
                </div>
                <p className="text-sage-100/90 leading-relaxed text-sm">
                  {dominantMsg}
                </p>
              </div>
              
              {/* Next Steps / Prescription */}
              <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100 flex-1">
                <h3 className="text-xs font-bold tracking-widest uppercase text-rose-800 mb-3">Your Next Steps</h3>
                <p className="text-rose-950 text-sm leading-relaxed">
                  {nextSteps}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-sage-300 text-center print:hidden">
            <h3 className="text-2xl font-serif text-sage-900 mb-6">You've reached the end of the curriculum.</h3>
            <Link 
              href="/certificate" 
              className="inline-flex items-center px-10 py-5 bg-rose-200 text-rose-900 rounded-full font-bold uppercase tracking-widest hover:bg-rose-300 transition-colors shadow-md hover:-translate-y-1"
            >
              Claim Your Certificate of Completion
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
