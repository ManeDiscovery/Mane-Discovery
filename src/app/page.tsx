'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Wind, Leaf, Sun, Check, HeartPulse, Brain, HeartHandshake, ZapOff, Activity, ShieldCheck, Footprints } from 'lucide-react';

export default function LandingPage() {
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
            Mane Discovery
          </p>
          <h1 className="text-6xl md:text-[6.5rem] font-serif text-sage-900 tracking-tight leading-[0.9] drop-shadow-md">
            The 21-Day Nervous<br />System <span className="text-white">Reset</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream-50 max-w-2xl leading-relaxed mx-auto font-medium drop-shadow-md pb-8">
            Give yourself 21 days to slow down, reconnect, and shift permanently out of survival mode.
          </p>
          <a href="#pricing" className="inline-flex items-center px-10 py-5 bg-sage-900 text-cream-50 rounded-full font-bold uppercase tracking-widest hover:bg-sage-800 transition-all hover:scale-105 active:scale-95 shadow-xl">
            Start Your Journey <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </div>
      </header>

      {/* 2. THE PAIN / "IS FOR YOU IF" */}
      <section className="bg-cream-50 pb-24 pt-10 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-sage-900">This journey is for you if...</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "You wake up already tense.",
              "You overthink the smallest things.",
              "You react in ways you wish you didn't.",
              "You feel disconnected — from yourself, others, and what you actually want."
            ].map((text, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm flex items-start gap-4 hover:-translate-y-1 transition-transform">
                <div className="p-3 bg-rose-50 rounded-full shrink-0">
                  <Activity className="w-6 h-6 text-rose-400" />
                </div>
                <p className="text-sage-800 font-medium text-lg pt-2 leading-snug">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-sage-100 p-10 rounded-3xl text-center border-2 border-sage-200 shadow-inner">
            <p className="text-2xl font-serif text-sage-900 italic">
              "And part of you knows... this isn't who you really are."
            </p>
          </div>
        </div>
      </section>

      {/* 3. MINDSET VS NERVOUS SYSTEM */}
      <section className="bg-sage-900 text-cream-50 py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-800 rounded-full blur-3xl opacity-50 -ml-20 -mb-20" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-16">
          <div className="text-center space-y-8">
            <Brain className="w-16 h-16 text-amber-300 mx-auto opacity-80" />
            <h2 className="text-4xl md:text-5xl font-serif text-cream-100 leading-tight">
              You know this isn't a mindset problem...<br/>
              <span className="text-sage-300">because you already did the mindset thing.</span>
            </h2>
            <p className="text-xl text-sage-200 max-w-2xl mx-auto leading-relaxed">
              It's your nervous system. And what is called your stress response. You can't think your way out of it, because it isn't a top-down response. It's wildly physical.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 bg-sage-800/50 p-10 md:p-14 rounded-[3rem] border border-sage-700 backdrop-blur-sm">
            <div>
              <h3 className="text-amber-300 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                <ZapOff className="w-4 h-4" /> When stuck in survival mode:
              </h3>
              <ul className="space-y-6">
                {[
                  "Everything feels urgent or exhausting.",
                  "Your body stays on edge — even when nothing is wrong.",
                  "You struggle to slow down, focus, or feel present.",
                  "You swing violently between overwhelm and shutdown."
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-sage-100 items-start">
                    <span className="text-rose-400 mt-1">•</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col justify-center space-y-6 border-t md:border-t-0 md:border-l border-sage-700 pt-8 md:pt-0 md:pl-12">
              <h3 className="text-2xl font-serif text-cream-100">That's where this 21-day journey begins.</h3>
              <p className="text-sage-300 text-lg leading-relaxed">
                Not with more information.<br/>
                Not with pressure to "fix yourself."
              </p>
              <div className="p-4 bg-sage-900 border border-sage-600 rounded-xl">
                <p className="text-cream-50 font-medium">
                  👉 But with simple, guided somatic experiences that help your body finally shift.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE JOURNEY BENEFITS */}
      <section className="bg-cream-50 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-sage-900">What this journey gives you</h2>
            <p className="text-xl text-sage-700 max-w-2xl mx-auto">
              Over 21 days, you'll be guided through a structured, gentle process to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: ShieldCheck, title: "Recognize", desc: "Start recognizing your nervous system patterns before they escalate." },
              { icon: HeartPulse, title: "Regulate", desc: "Learn exactly how to regulate yourself in real-time." },
              { icon: Footprints, title: "Ground", desc: "Build a profound sense of internal safety and physical grounding." },
              { icon: Leaf, title: "Reconnect", desc: "Reconnect to your body and honor your natural biological responses." },
              { icon: Sun, title: "Self-Trust", desc: "Begin showing up in relationships with more clarity, calm, and self-trust." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm hover:shadow-md transition-all">
                <item.icon className="w-8 h-8 text-rose-400 mb-6" />
                <h3 className="text-xl font-bold text-sage-900 mb-3">{item.title}</h3>
                <p className="text-sage-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-serif text-sage-900">Because real change doesn't happen all at once...</h3>
            <p className="text-xl text-sage-700">It happens in small, consistent shifts. In moments where:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 py-8">
              <span className="bg-sage-100 text-sage-900 px-6 py-3 rounded-full font-medium">You pause instead of react</span>
              <span className="bg-rose-100 text-rose-900 px-6 py-3 rounded-full font-medium">You notice instead of override</span>
              <span className="bg-amber-100 text-amber-900 px-6 py-3 rounded-full font-medium">You feel grounded instead of overwhelmed</span>
            </div>
            <p className="text-xl font-bold text-sage-900 italic">👉 That's what this journey is designed to create.</p>
          </div>
        </div>
      </section>

      {/* 5. BEFORE & AFTER TRANSFORMATION */}
      <section className="bg-sage-100 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-sage-900">The Transformation</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-10 rounded-[2.5rem] border border-sage-200 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-sage-500 mb-8 border-b border-sage-100 pb-4">Before</h3>
              <ul className="space-y-6">
                <li className="flex items-start text-sage-700"><span className="text-rose-400 mr-3">✗</span> Overwhelmed, reactive, and disconnected.</li>
                <li className="flex items-start text-sage-700"><span className="text-rose-400 mr-3">✗</span> Stuck in biological patterns you can't seem to break.</li>
                <li className="flex items-start text-sage-700"><span className="text-rose-400 mr-3">✗</span> Exhausted from trying to "figure it out" mentally.</li>
              </ul>
            </div>
            
            <div className="bg-sage-900 p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/20 rounded-full blur-3xl" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-sage-400 mb-8 border-b border-sage-700 pb-4 relative z-10">After 21 Days</h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-start text-cream-50"><Check className="text-emerald-400 mr-3 shrink-0" /> More grounded and deeply present.</li>
                <li className="flex items-start text-cream-50"><Check className="text-emerald-400 mr-3 shrink-0" /> Aware of your triggers safely (without judgment).</li>
                <li className="flex items-start text-cream-50"><Check className="text-emerald-400 mr-3 shrink-0" /> Able to thoughtfully respond instead of blindly react.</li>
                <li className="flex items-start text-cream-50 leading-relaxed font-bold"><Check className="text-emerald-400 mr-3 shrink-0" /> Starting to feel like your true self again.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEET YOUR FACILITATOR */}
      <section className="bg-cream-50 py-32 px-6 border-b border-sage-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
            {/* Needs an actual image of Maria, using placeholder style for now */}
            <div className="absolute inset-0 bg-sage-300">
               <Image src="/maria-guide.jpg" alt="Maria - Facilitator" fill className="object-cover object-[75%_center] scale-105" />
               {/* fallback gradient if image missing */}
               <div className="absolute inset-0 bg-gradient-to-t from-sage-900/60 to-transparent" />
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-center text-white">
              <p className="font-serif text-3xl">Maria</p>
              <p className="text-sm tracking-widest uppercase font-bold text-sage-200">Creator of Mane Discovery</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-sage-900 leading-tight">Facilitator</h2>
            <div className="space-y-6 text-lg text-sage-700 leading-relaxed">
              <p>Hi, I'm Maria.</p>
              <p>
                I know what it feels like to live disconnected from yourself... to carry stress, identity questions, and emotional patterns that don't just magically go away with time.
              </p>
              <p>
                And I also know that real change doesn't come from thinking harder. <strong className="text-sage-900 font-bold">It comes from learning how to work with your body.</strong>
              </p>
              <p>
                Through somatic work and equine-facilitated learning, I've helped people reconnect to themselves in ways that feel real, grounded, and incredibly sustainable.
              </p>
              <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                <p className="font-serif text-xl pr-4 text-sage-900 italic">"This 21-day journey is a starting point. You don't need to have it all figured out. You just need a place to begin."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING / CHECKOUT */}
      <section id="pricing" className="py-32 bg-sage-900 text-cream-50 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-rose-900/20 blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-16 space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-cream-100">Join the 21-Day Reset</h2>
          <p className="text-sage-300 max-w-xl mx-auto text-lg pt-4 border-t border-sage-700/50">
            This isn't a challenge where you push yourself.<br/>This is a reset where you finally learn to work with your nervous system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch relative z-10">
          
          <div className="bg-white text-sage-900 rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all hover:-translate-y-1">
            <div>
              <h3 className="text-3xl font-serif mb-2">The Solo Reset</h3>
              <p className="text-sage-500 text-sm mb-8">For the independent traveler ready to commit to their own pacing.</p>
              <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-sage-100">
                <span className="text-6xl font-sans font-medium">$39</span>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-start text-sage-700 font-medium"><HeartPulse className="w-5 h-5 text-rose-400 mr-4 shrink-0" /> Full access to the 21-Day App Journey</li>
                <li className="flex items-start text-sage-700 font-medium"><HeartPulse className="w-5 h-5 text-rose-400 mr-4 shrink-0" /> Daily guided somatic practices</li>
                <li className="flex items-start text-sage-700 font-medium"><HeartPulse className="w-5 h-5 text-rose-400 mr-4 shrink-0" /> End-of-journey Attachment Radar Report</li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('basic')}
              disabled={loadingTier !== null}
              className="mt-6 w-full py-5 bg-sage-900 text-cream-50 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors disabled:opacity-50"
            >
              {loadingTier === 'basic' ? 'Opening...' : 'Start Your Journey'}
            </button>
          </div>

          <div className="bg-sage-800 text-cream-50 rounded-[2.5rem] p-10 shadow-2xl border border-sage-600 flex flex-col justify-between hover:shadow-3xl transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-bl-3xl shadow-md">
              Cohort
            </div>
            <div>
              <h3 className="text-3xl font-serif mb-2 text-rose-100">Guided Embodiment</h3>
              <p className="text-sage-400 text-sm mb-8">The app journey plus live co-regulation and group support.</p>
              <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-sage-700">
                 <span className="text-6xl font-sans font-medium">$97</span>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-start text-sage-200 font-medium"><HeartHandshake className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> Everything in The Solo Reset</li>
                <li className="flex items-start text-sage-200 font-medium"><HeartHandshake className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> 4 Weekly Live Group Support Calls</li>
                <li className="flex items-start text-sage-200 font-medium"><HeartHandshake className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> Priority guidance from Maria</li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('premium')}
              disabled={loadingTier !== null}
              className="mt-6 w-full py-5 bg-rose-200 text-sage-900 rounded-2xl font-bold uppercase tracking-widest hover:bg-rose-300 transition-colors disabled:opacity-50 shadow-xl"
            >
              {loadingTier === 'premium' ? 'Opening...' : 'Join the Next Cohort'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-950 border-t border-sage-900 py-12 text-center text-sage-500 text-sm">
        <p>© {new Date().getFullYear()} Mane Discovery. All rights reserved.</p>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest">
          <a href="/login" className="hover:text-cream-50 transition-colors">Member Login</a>
        </p>
      </footer>
    </div>
  );
}
