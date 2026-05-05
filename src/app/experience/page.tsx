'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Brain, ZapOff, ShieldCheck, HeartPulse, Footprints, Leaf, Check, HeartHandshake } from 'lucide-react';

export default function ExperienceLandingPage() {
  const [loadingTier, setLoadingTier] = useState<'basic' | 'premium' | null>(null);

  const handleCheckout = async (tier: 'basic' | 'premium') => {
    setLoadingTier(tier);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier }),
      });
      
      const session = await response.json();
      
      if (session.url) {
        window.location.href = session.url;
      } else if (session.error) {
        console.error("Checkout returned error:", session.error);
        alert(session.error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 font-sans selection:bg-rose-200">
      
      {/* 1. HERO SECTION */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0">
          <Image 
            src="/hero-horse-landscape.png" 
            alt="Mane Discovery Landscape"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream-50/100" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center space-y-8 pt-10">
          <p className="tracking-[0.25em] uppercase text-sm font-bold text-sage-900 bg-white/60 backdrop-blur-md px-6 py-2 rounded-full shadow-sm">
            For Future EFL Practitioners
          </p>
          <h1 className="text-5xl md:text-[5.5rem] font-serif text-sage-900 tracking-tight leading-[0.9] drop-shadow-md pb-4">
            Step into the work<br /><span className="text-rose-300 italic">before</span> <span className="text-white">you commit.</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream-50 max-w-2xl leading-relaxed mx-auto font-medium drop-shadow-md pb-8">
            Most people think the path into Equine Facilitated Learning starts with a certification. Spend thousands. Learn the frameworks. Hope it fits.
          </p>
          <a href="#truth" className="inline-flex items-center px-10 py-5 bg-sage-900 text-cream-50 rounded-full font-bold uppercase tracking-widest hover:bg-sage-800 transition-all hover:scale-105 active:scale-95 shadow-xl">
            Read The Truth <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </div>
      </header>

      {/* 2. THE DESIRE */}
      <section className="bg-sage-100 py-24 px-6 border-b border-sage-200">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
             <HeartHandshake className="w-12 h-12 text-rose-400 mx-auto opacity-80 mb-6" />
             <h2 className="text-3xl md:text-5xl font-serif text-sage-900 leading-tight">
              You already know what you want.
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 text-left">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-sage-200">
               <p className="text-lg text-sage-700 leading-relaxed font-medium">
                 You want to facilitate profound, undeniable transformation. You know intuitively that horses heal—because they have healed you.
               </p>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-sage-200">
               <p className="text-lg text-sage-700 leading-relaxed font-medium">
                 You desire a life that feels radically aligned. A path rooted in nature, untouched by corporate burnout, and guided by deep somatic wisdom.
               </p>
             </div>
          </div>

          <p className="text-2xl font-serif text-sage-800 italic pt-8">
            That calling is real. <br/>
            <span className="text-rose-400 font-bold">But the path to get there doesn’t begin always where you think.</span>
          </p>
        </div>
      </section>

      {/* 3. THE TRUTH */}
      <section id="truth" className="bg-cream-50 pb-24 pt-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="bg-sage-100 p-10 md:p-16 rounded-[3rem] text-center border-2 border-sage-200 shadow-inner">
            <h2 className="text-3xl md:text-5xl font-serif text-sage-900 mb-8">But here’s the truth:</h2>
            <p className="text-2xl font-serif text-sage-800 italic leading-relaxed">
              "You don’t need more information first.<br/>
              You need <span className="text-rose-400 font-bold">real experience</span>."
            </p>
            <p className="mt-8 text-lg text-sage-700 max-w-2xl mx-auto">
              Because this work isn’t something you figure out in your head. It’s something you feel in your body.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE MISTAKE & THE DIFFERENCE */}
      <section className="bg-sage-900 text-cream-50 py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-800 rounded-full blur-3xl opacity-50 -ml-20 -mb-20" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-16">
          <div className="text-center space-y-8">
            <ZapOff className="w-16 h-16 text-rose-300 mx-auto opacity-80" />
            <h2 className="text-4xl md:text-5xl font-serif text-cream-100 leading-tight">
              And the biggest mistake I see? <br/>
              <span className="text-sage-300">People invest before they even know if this is their path.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 bg-sage-800/50 p-10 md:p-14 rounded-[3rem] border border-sage-700 backdrop-blur-sm">
            <div>
              <h3 className="text-rose-300 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                That’s why I did it differently:
              </h3>
              <ul className="space-y-6">
                {[
                  "I stepped into this work as a client first.",
                  "I experienced it.",
                  "I let it change how I show up, regulate, and relate."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-sage-100 items-start">
                    <span className="text-rose-400 mt-1">•</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col justify-center space-y-6 border-t md:border-t-0 md:border-l border-sage-700 pt-8 md:pt-0 md:pl-12">
              <h3 className="text-2xl font-serif text-cream-100">And from there…</h3>
              <p className="text-sage-300 text-lg leading-relaxed">
                becoming a practitioner wasn’t confusing anymore. It was a natural next step.
              </p>
              <div className="p-4 bg-sage-900 border border-sage-600 rounded-xl">
                <p className="text-cream-50 font-medium">
                  That’s exactly what this offer gives you. A way to step into the work—before you commit to it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU WILL EXPERIENCE */}
      <section className="bg-cream-50 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-sage-900">Inside Mane Discovery</h2>
            <p className="text-xl text-sage-700 max-w-2xl mx-auto">
              You don’t just learn about EFL. You begin to experience what it’s like to facilitate it. Through guided, real-time interactions with horses, you’ll:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: ShieldCheck, title: "Nervous System Dynamics", desc: "Understand how your nervous system shapes every interaction." },
              { icon: Leaf, title: "Presence over Performance", desc: "See how horses respond to presence—not performance." },
              { icon: HeartPulse, title: "Holding Space", desc: "Practice holding space without scripts or pressure." },
              { icon: Brain, title: "Embodied Awareness", desc: "Develop awareness you can’t get from a classroom." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm hover:shadow-md transition-all">
                <item.icon className="w-8 h-8 text-rose-400 mb-6" />
                <h3 className="text-xl font-bold text-sage-900 mb-3">{item.title}</h3>
                <p className="text-sage-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-serif text-sage-900">This is where clarity happens.</h3>
            <p className="text-xl text-sage-700">Not from guessing. <span className="font-bold">From doing.</span></p>
            
            <div className="mt-12 bg-white p-10 rounded-3xl border-2 border-rose-100 shadow-sm relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col items-center">
                    <p className="text-sage-600 mb-4 tracking-widest uppercase text-sm font-bold">So instead of asking:</p>
                    <p className="text-2xl font-serif text-sage-800 italic line-through decoration-rose-300 decoration-2">“Should I spend thousands on a certification?”</p>
                    
                    <div className="my-8 w-px h-12 bg-sage-200"></div>
                    
                    <p className="text-sage-600 mb-4 tracking-widest uppercase text-sm font-bold">You’ll be able to say:</p>
                    <p className="text-3xl font-serif text-sage-900 font-bold border-b-2 border-sage-900 pb-2">“I know if this is for me.”</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING / CHECKOUT */}
      <section id="pricing" className="py-32 bg-sage-900 text-cream-50 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-rose-900/20 blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-16 space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-cream-100">Your Next Step</h2>
          <p className="text-sage-300 max-w-2xl mx-auto text-lg pt-4 border-t border-sage-700/50">
            If you’ve been thinking about this path… but don’t want to invest blindly—<br/>Come experience Mane Discovery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch relative z-10">
          
          {/* Solo Reset */}
          <div className="bg-white text-sage-900 rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all hover:-translate-y-1">
            <div>
              <h3 className="text-3xl font-serif mb-2">The Solo Experience</h3>
              <p className="text-sage-500 text-sm mb-8">For the independent practitioner ready to explore their own pacing.</p>
              <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-sage-100">
                <span className="text-6xl font-sans font-medium">$39</span>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-start text-sage-700 font-medium"><HeartPulse className="w-5 h-5 text-rose-400 mr-4 shrink-0" /> Full access to the 21-Day App Journey</li>
                <li className="flex items-start text-sage-700 font-medium"><HeartPulse className="w-5 h-5 text-rose-400 mr-4 shrink-0" /> Daily guided somatic practices</li>
                <li className="flex items-start text-sage-700 font-medium"><HeartPulse className="w-5 h-5 text-rose-400 mr-4 shrink-0" /> End-of-journey Attachment Radar Report</li>
                <li className="flex items-start text-sage-700 font-medium"><HeartPulse className="w-5 h-5 text-rose-400 mr-4 shrink-0" /> Official Certificate of Completion</li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('basic')}
              disabled={loadingTier !== null}
              className="mt-6 w-full py-5 bg-sage-900 text-cream-50 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors disabled:opacity-50"
            >
              {loadingTier === 'basic' ? 'Opening...' : 'Start The Experience'}
            </button>
          </div>

          {/* Premium / Cohort */}
          <div className="bg-sage-800 text-cream-50 rounded-[2.5rem] p-10 shadow-2xl border border-sage-600 flex flex-col justify-between hover:shadow-3xl transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-bl-3xl shadow-md">
              Cohort
            </div>
            <div>
              <h3 className="text-3xl font-serif mb-2 text-rose-100">Guided Mentorship</h3>
              <p className="text-sage-400 text-sm mb-8">The app journey plus live co-regulation and group support.</p>
              <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-sage-700">
                 <span className="text-6xl font-sans font-medium">$97</span>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-start text-sage-200 font-medium"><HeartHandshake className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> Everything in The Solo Experience</li>
                <li className="flex items-start text-sage-200 font-medium"><HeartHandshake className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> 4 Weekly Live Group Support Calls</li>
                <li className="flex items-start text-sage-200 font-medium"><HeartHandshake className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> Priority guidance from Maria</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <div className="bg-rose-900/40 border border-rose-300/30 text-rose-100 text-sm p-4 rounded-xl mb-4 text-center font-medium">
                <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-rose-400 mr-2"></span>
                Spring Cohort Begins April 25th.<br/>Limited live support spots available.
              </div>
              <button 
                onClick={() => handleCheckout('premium')}
                disabled={loadingTier !== null}
                className="w-full py-5 bg-rose-200 text-sage-900 rounded-2xl font-bold uppercase tracking-widest hover:bg-rose-300 transition-colors disabled:opacity-50 shadow-xl"
              >
                {loadingTier === 'premium' ? 'Opening...' : 'Join the Next Cohort'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-950 border-t border-sage-900 py-16 px-6 text-center text-sage-500 text-sm">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg italic font-serif text-sage-300 mb-8">
            "Because the best way to learn this work… is to step into it first."
          </p>
          <div className="text-sm text-sage-300 leading-relaxed max-w-3xl mx-auto text-justify sm:text-center p-6 bg-sage-900/50 rounded-2xl border border-sage-700">
            <strong>Disclaimer:</strong> The Mane Discovery 21-Day Nervous System Reset and all associated materials are provided for educational and self-exploration purposes only. This program is not intended to diagnose, treat, prevent, or cure any medical or psychological condition. The somatic practices and insights offered are not a substitute for professional medical advice, diagnosis, or clinical therapy. By participating, you acknowledge that you are responsible for your own well-being and agree to consult with a qualified healthcare provider or therapist before making any decisions regarding your mental health or wellness routines.
          </div>
          <p>© {new Date().getFullYear()} Mane Discovery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
