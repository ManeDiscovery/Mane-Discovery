'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Wind, Leaf, Sun, Check } from 'lucide-react';

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
      {/* Hero Section */}
      <header className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sage-100/50 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="relative w-32 h-32 mb-4">
            <Image 
              src="/logo.png" 
              alt="Mane Discovery Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-sage-900 tracking-tight leading-tight">
            Discover Your <span className="italic text-sage-700">Mane.</span>
          </h1>
          <p className="text-xl text-sage-600 max-w-2xl leading-relaxed">
            A 21-day digital journey blending somatic mindfulness with equine-facilitated wisdom to deeply reset your nervous system.
          </p>
          <a href="#pricing" className="inline-flex items-center px-8 py-4 mt-8 bg-sage-900 text-cream-50 rounded-full font-bold uppercase tracking-widest hover:bg-sage-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sage-900/20">
            Start The Journey <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

        {/* Hero Image */}
        <div className="mt-16 max-w-6xl mx-auto relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-sage-200/50">
          <Image 
            src="/hero-horse-landscape.png" 
            alt="Calming horse grazing in a beautiful landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
      </header>

      {/* Phases Section */}
      <section className="bg-sage-100 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-sage-900">The 21-Day Roadmap</h2>
            <p className="text-sage-700 max-w-xl mx-auto">Three sequential phases designed to gently build your nervous system capacity without overwhelming it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cream-50 rounded-3xl p-8 shadow-sm border border-sage-200/50 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <Wind className="w-8 h-8 text-sage-700 mb-6" />
              <h3 className="text-xl font-serif text-sage-900 mb-2">Phase 1: Awareness</h3>
              <p className="text-sage-600 text-sm leading-relaxed">Map your triggers and glimmers. Learn to observe your physical state without judgment or attempting to change it.</p>
            </div>
            <div className="bg-cream-50 rounded-3xl p-8 shadow-sm border border-sage-200/50 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sage-200 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <Leaf className="w-8 h-8 text-sage-700 mb-6" />
              <h3 className="text-xl font-serif text-sage-900 mb-2">Phase 2: Regulation</h3>
              <p className="text-sage-600 text-sm leading-relaxed">Introduce gentle somatic tools to titrate stress and widen your window of tolerance.</p>
            </div>
            <div className="bg-cream-50 rounded-3xl p-8 shadow-sm border border-sage-200/50 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <Sun className="w-8 h-8 text-sage-700 mb-6" />
              <h3 className="text-xl font-serif text-sage-900 mb-2">Phase 3: Embodiment</h3>
              <p className="text-sage-600 text-sm leading-relaxed">Integrate your new regulatory capacity into daily life and relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Checkout Section */}
      <section id="pricing" className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif text-sage-900">Choose Your Path</h2>
          <p className="text-sage-700 max-w-xl mx-auto">Unlock the daily somatic diary, 3-minute check-ins, and your finalized attachment report.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Option 1 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-sage-200 flex flex-col justify-between hover:shadow-md transition-shadow relative">
            <div>
              <h3 className="text-2xl font-serif text-sage-900 mb-2">The Solo Reset</h3>
              <p className="text-sage-600 text-sm mb-6">For the independent traveler ready to commit to their own pacing.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-sans font-medium text-sage-900">$39</span>
                <span className="text-sage-500 text-sm">one-time</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-sm text-sage-700">
                  <Check className="w-5 h-5 text-sage-500 mr-3 shrink-0" />
                  Full access to the 21-Day App Journey
                </li>
                <li className="flex items-start text-sm text-sage-700">
                  <Check className="w-5 h-5 text-sage-500 mr-3 shrink-0" />
                  Daily somatic diary prompts & progress tracking
                </li>
                <li className="flex items-start text-sm text-sage-700">
                  <Check className="w-5 h-5 text-sage-500 mr-3 shrink-0" />
                  End-of-journey Attachment Radar Report
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('basic')}
              disabled={loadingTier !== null}
              className="mt-6 w-full py-4 bg-sage-100 text-sage-900 rounded-xl font-bold uppercase tracking-widest hover:bg-sage-200 transition-colors disabled:opacity-50"
            >
              {loadingTier === 'basic' ? 'Redirecting...' : 'Purchase Journey'}
            </button>
          </div>

          {/* Option 2 */}
          <div className="bg-sage-900 rounded-[2rem] p-8 shadow-lg border-2 border-sage-700 flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-300 text-rose-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
              Best Support
            </div>
            <div>
              <h3 className="text-2xl font-serif text-cream-100 mb-2">Guided Embodiment</h3>
              <p className="text-sage-300 text-sm mb-6">The app journey plus live co-regulation and group support.</p>
              <div className="flex items-baseline gap-2 mb-8">
                 <span className="text-5xl font-sans font-medium text-cream-100">$97</span>
                 <span className="text-sage-400 text-sm">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-sm text-sage-100">
                  <Check className="w-5 h-5 text-rose-300 mr-3 shrink-0" />
                  Everything in The Solo Reset
                </li>
                <li className="flex items-start text-sm text-sage-100">
                  <Check className="w-5 h-5 text-rose-300 mr-3 shrink-0" />
                  4 Weekly Live Group Support Calls
                </li>
                <li className="flex items-start text-sm text-sage-100">
                  <Check className="w-5 h-5 text-rose-300 mr-3 shrink-0" />
                  Live guided somatic practices and Q&A
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('premium')}
              disabled={loadingTier !== null}
              className="mt-6 w-full py-4 bg-rose-100 text-rose-900 rounded-xl font-bold uppercase tracking-widest hover:bg-rose-200 transition-colors disabled:opacity-50"
            >
              {loadingTier === 'premium' ? 'Redirecting...' : 'Join the Cohort'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sage-200 py-12 text-center text-sage-500 text-sm">
        <p>© {new Date().getFullYear()} Mane Discovery. All rights reserved.</p>
        <p className="mt-2 text-xs opacity-70">
          <a href="/login" className="hover:text-sage-700 underline underline-offset-4 decoration-sage-300">Member Login</a>
        </p>
      </footer>
    </div>
  );
}
