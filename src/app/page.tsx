'use client';

import { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { ArrowRight, Wind, Leaf, Sun, Check, HeartPulse, Brain, HeartHandshake, ZapOff, Activity, ShieldCheck, Footprints, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleCheckout = async () => {
    setLoadingCheckout(true);

    // Track Meta Pixel InitiateCheckout
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 39.00,
        currency: 'USD',
        content_name: 'The 21-Day Nervous System Reset',
      });
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier: 'basic' }),
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
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-cream-50 font-sans selection:bg-rose-200">
      
      {/* STICKY TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 w-full bg-cream-50/90 backdrop-blur-md border-b border-sage-200/60 shadow-xs transition-all">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Mane Discovery Logo" fill className="object-contain" priority />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-sage-900 group-hover:text-rose-700 transition-colors">
              Mane Discovery
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-sage-700">
            <Link href="/quiz" className="hover:text-rose-600 transition-colors flex items-center gap-1.5 text-rose-600 font-extrabold">
              <Sparkles className="w-3.5 h-3.5" /> Free 60s Check-In
            </Link>
            <a href="#curriculum" className="hover:text-sage-950 transition-colors">The 21 Days</a>
            <a href="#pricing" className="hover:text-sage-950 transition-colors">Pricing ($39)</a>
            <a href="#faq" className="hover:text-sage-950 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs font-bold uppercase tracking-wider text-sage-700 hover:text-sage-950 px-3 py-2 transition-colors">
              Sign In
            </Link>
            <a href="#pricing" className="px-5 py-2.5 bg-sage-900 text-cream-50 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-sage-800 transition-all shadow-md hover:scale-105 active:scale-95">
              Start Reset ($39)
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 pb-32">
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
          <h1 className="text-5xl sm:text-6xl md:text-[6.5rem] font-serif text-sage-900 tracking-tight leading-[0.95] md:leading-[0.9] drop-shadow-md w-full break-words">
            The 21-Day Nervous<br /><span className="text-rose-300">System</span> <span className="text-white">Reset</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-sage-900 font-serif max-w-3xl leading-relaxed mx-auto drop-shadow-sm mt-6 mb-2 bg-white/70 backdrop-blur-md px-6 sm:px-8 py-4 rounded-3xl border border-white/50 shadow-sm w-full">
            A 21-day guided journey with 3-minute daily somatic practices, gentle self-reflection, and compassionate tools to help your body rediscover its natural rhythm.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-sage-900/90 max-w-2xl leading-relaxed mx-auto font-medium drop-shadow-sm pb-8 pt-2 w-full px-2 bg-white/40 backdrop-blur-xs rounded-2xl">
            Give your body 21 days to pause, notice what you are holding, and practice moving through stress alongside fellow nervous systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <a href="#pricing" className="inline-flex items-center px-10 py-5 bg-sage-900 text-cream-50 rounded-full font-bold uppercase tracking-widest hover:bg-sage-800 transition-all hover:scale-105 active:scale-95 shadow-xl">
              Start Your Journey <ArrowRight className="w-5 h-5 ml-3" />
            </a>
            <Link href="/quiz" className="inline-flex items-center px-8 py-5 bg-white/80 backdrop-blur-md text-sage-900 border border-white rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-lg text-sm">
              Take Free 60s Check-In <Sparkles className="w-4 h-4 ml-2 text-rose-500" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. THE HUMAN TRUTH & SOMATIC INQUIRY */}
      <section className="bg-cream-50 pb-24 pt-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-sage-900 leading-tight">
              We've talked it through, read the books, and tried to think our way into feeling settled.
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto leading-relaxed">
              Yet for so many of us, our bodies still hold the tension. We feel tired, yet constantly braced—unable to fully soften even when nothing is wrong. This 21-day reset offers a grounded, horse-inspired approach: learning to listen to what the body is experiencing, rather than trying to force it to be different.
            </p>
          </div>
          
          <div className="bg-rose-50 p-10 rounded-[3rem] text-center border border-rose-100 shadow-sm relative overflow-hidden">
            <h3 className="text-2xl font-serif text-sage-900 mb-4 relative z-10">An invitation to stop fighting your body.</h3>
            <p className="text-lg text-sage-800 leading-relaxed max-w-2xl mx-auto relative z-10">
              When we learn to notice our biological signals with curiosity instead of judgment, we create room for our nervous systems to find their own way back to equilibrium.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE SECRET OF THE HORSE */}
      <section className="bg-sage-900 text-cream-50 py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-800 rounded-full blur-3xl opacity-50 -ml-20 -mb-20" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-16">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-cream-100 leading-tight">
              What can a 1,000-pound prey animal teach us about moving through stress?
            </h2>
          </div>

          <div className="bg-sage-800/50 p-10 md:p-14 rounded-[3rem] border border-sage-700 backdrop-blur-sm text-sage-100 text-lg leading-relaxed space-y-6">
            <p>
              Horses are prey animals. They experience fear and alarm just as we do. But unlike humans, they do not carry the narrative in their minds after the moment has passed.
            </p>
            <p>
              When a horse experiences a stress spike, they physically move through it. You can observe them quiver, yawn, roll, and return to grazing—releasing physical activation through the body without overthinking.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 border-y border-sage-700/50 my-8">
              <div className="text-center flex-1">
                <div className="w-16 h-16 bg-sage-700 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-sage-600">
                  <Wind className="w-8 h-8 text-rose-300" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase text-sage-300 mb-2">The Horse</p>
                <p className="text-cream-100">Moves through stress through the physical body</p>
              </div>
              <ArrowRight className="w-8 h-8 text-sage-600 hidden md:block" />
              <ArrowRight className="w-8 h-8 text-sage-600 rotate-90 md:hidden" />
              <div className="text-center flex-1">
                <div className="w-16 h-16 bg-sage-700 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-sage-600">
                  <HeartPulse className="w-8 h-8 text-rose-300" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase text-sage-300 mb-2">The Human</p>
                <p className="text-cream-100">Can practice noticing and working with what the body is holding</p>
              </div>
              <ArrowRight className="w-8 h-8 text-sage-600 hidden md:block" />
              <ArrowRight className="w-8 h-8 text-sage-600 rotate-90 md:hidden" />
              <div className="text-center flex-1">
                <div className="w-16 h-16 bg-rose-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-rose-800">
                  <Activity className="w-8 h-8 text-rose-300" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase text-rose-300 mb-2">The Practice</p>
                <p className="text-cream-100">Simple 3–5 minute somatic steps each day for 21 days</p>
              </div>
            </div>

            <h3 className="text-2xl font-serif text-cream-50 pt-4">As humans, many of us have unlearned how to complete these cycles.</h3>
            <p>
              In our fast-paced lives, our bodies often hold onto tension long after the stressor has passed. Somatic inquiry gives us a gentle way to notice, pause, and safely allow the body to settle.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU WILL EXPLORE & DAILY PRACTICE */}
      <section className="bg-cream-50 py-32 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-serif text-sage-900 mb-6">What you will explore in these 21 days</h2>
              <p className="text-lg text-sage-700 max-w-2xl mx-auto leading-relaxed">
                This reset is designed to expand capacity—not by forcing change, but by creating gentle, repeatable somatic moments in your everyday routine. Through simple steps, we learn to:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: ShieldCheck, title: "Pause and step out of autopilot." },
                { icon: Activity, title: "Notice what your body is holding in real time." },
                { icon: Wind, title: "Support your nervous system with gentle somatic practices." },
                { icon: Footprints, title: "Repattern and choose a steady, grounded response." },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm flex items-center gap-6 hover:shadow-md transition-all">
                  <div className="p-4 bg-rose-50 rounded-2xl shrink-0">
                    <item.icon className="w-8 h-8 text-rose-400" />
                  </div>
                  <p className="text-sage-900 font-bold text-lg leading-snug">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT A DAY LOOKS LIKE */}
          <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-sage-200 max-w-3xl mx-auto shadow-sm space-y-6 text-left">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-rose-500">A Look Inside</span>
              <h3 className="text-2xl sm:text-3xl font-serif text-sage-900">What a day looks like</h3>
              <p className="text-sage-600 text-sm">Bite-sized moments designed for busy lives that need gentle support, not another heavy task.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-cream-50 border border-sage-100">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-3 py-1 rounded-full shrink-0">Day 1</span>
                <div>
                  <p className="font-bold text-sage-900 text-base">A 3-minute arrival practice</p>
                  <p className="text-sage-600 text-sm leading-relaxed mt-0.5">Noticing where your body meets the chair or floor, observing your breath without trying to change it, and arriving in the present moment.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-cream-50 border border-sage-100">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-3 py-1 rounded-full shrink-0">Day 7</span>
                <div>
                  <p className="font-bold text-sage-900 text-base">Observing activation and ease</p>
                  <p className="text-sage-600 text-sm leading-relaxed mt-0.5">A short guided reflection to notice subtle cues of tension and where your body naturally feels even 5% more supported.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-cream-50 border border-sage-100">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-3 py-1 rounded-full shrink-0">Day 14</span>
                <div>
                  <p className="font-bold text-sage-900 text-base">Practicing physical boundaries</p>
                  <p className="text-sage-600 text-sm leading-relaxed mt-0.5">A gentle physical movement inspired by how herd animals naturally sense and maintain their personal space without aggression.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-sage-500 pt-3 border-t border-sage-100 text-center sm:text-left">
              Every day includes a 3–5 minute guided somatic audio, an equine-inspired perspective on stress, and a quiet check-in.
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6 bg-sage-100 p-12 rounded-[3rem] border border-sage-200 shadow-inner">
            <h3 className="text-3xl font-serif text-sage-900 leading-tight">
              Moving forward without abandoning your body.
            </h3>
            <p className="text-xl text-sage-800 font-medium tracking-wide">
              Steady. Responsive. Connected.
            </p>
            <div className="pt-8 mt-8 border-t border-sage-300">
              <p className="text-lg text-sage-900 italic font-serif">
                Take a quiet breath and check in with your body. <br/><strong className="text-rose-800 text-xl not-italic block mt-4 drop-shadow-sm">An invitation to begin when you feel ready.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 APP FEATURES MOCKUPS */}
      <section id="curriculum" className="bg-sage-900 py-32 px-6 text-cream-50 border-t-8 border-rose-300">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <p className="tracking-[0.25em] uppercase text-sm font-bold text-rose-300">Inside the App</p>
            <h2 className="text-4xl md:text-5xl font-serif text-cream-100 leading-tight">Your pocket sanctuary for the next 21 days.</h2>
            <p className="text-xl text-sage-300 leading-relaxed">
              Everything you need to track your nervous system, process stress in real-time, and build somatic self-trust—all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Mockup 1: The Ring */}
            <div className="bg-cream-50 rounded-[2.5rem] p-8 shadow-2xl border border-sage-800 text-sage-900 flex flex-col items-center transform md:translate-y-8 hover:-translate-y-2 transition-transform duration-500">
              <h3 className="text-2xl font-serif mb-2 text-center">Interactive Discovery Ring</h3>
              <p className="text-sage-600 text-center mb-8 text-sm">Tap a section of the ring that matches how your body feels.</p>
              <div className="w-full aspect-square relative flex items-center justify-center py-4">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-md">
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#f43f5e" strokeWidth="20" strokeDasharray="31.4 157" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#fb923c" strokeWidth="20" strokeDasharray="31.4 157" strokeDashoffset="-31.4" />
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#fde047" strokeWidth="20" strokeDasharray="31.4 157" strokeDashoffset="-62.8" />
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#4ade80" strokeWidth="20" strokeDasharray="31.4 157" strokeDashoffset="-94.2" />
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#60a5fa" strokeWidth="20" strokeDasharray="31.4 157" strokeDashoffset="-125.6" />
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#d946ef" strokeWidth="20" strokeDasharray="31.4 157" strokeDashoffset="-157" />
                </svg>
                <div className="absolute w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center z-10 shadow-sm border border-sage-100">
                  <span className="font-bold text-sm tracking-widest text-sage-900">SELF</span>
                  <span className="text-[10px] text-sage-500">(CORE)</span>
                </div>
              </div>
            </div>

            {/* Mockup 2: SOS Flow */}
            <div className="bg-cream-50 rounded-[2.5rem] p-8 shadow-2xl border border-sage-800 text-sage-900 flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-500 relative z-10">
              <div className="w-full flex justify-between items-center mb-6">
                 <span className="text-xs font-bold text-sage-400 tracking-widest uppercase">Day 1</span>
                 <span className="text-xs font-bold text-sage-400">12:54</span>
              </div>
              <h3 className="text-3xl font-serif mb-6 text-left w-full leading-tight">Finding Your<br/>Inner Rhythm</h3>
              
              <div className="w-full bg-sage-900 rounded-3xl p-6 text-cream-50 relative overflow-hidden shadow-lg mt-4">
                <div className="absolute inset-0 opacity-40 bg-[url('/play_horse.png')] bg-cover bg-right mix-blend-overlay"></div>
                <div className="relative z-10">
                  <p className="text-xs font-bold tracking-widest uppercase text-sage-300 mb-2">Pre-Lesson State</p>
                  <h4 className="text-4xl font-serif text-rose-300 mb-8">Play</h4>
                  <div className="flex justify-between border-t border-sage-700 pt-4">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-sage-400 mb-1">Tension</p>
                      <p className="text-xl font-bold">5/10</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-sage-400 mb-1">Ease</p>
                      <p className="text-xl font-bold">5/10</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-6 flex justify-center">
                <button className="flex items-center gap-2 font-bold tracking-widest text-sage-900 uppercase text-sm hover:text-rose-500 transition-colors">
                  Begin Lesson <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mockup 3: Ledger */}
            <div className="bg-cream-50 rounded-[2.5rem] p-8 shadow-2xl border border-sage-800 text-sage-900 flex flex-col transform md:translate-y-8 hover:-translate-y-2 transition-transform duration-500">
               <div className="flex justify-between mb-8 px-4">
                 <div className="text-center">
                   <p className="text-[10px] font-bold tracking-widest uppercase text-sage-500">Overall<br/>Tension</p>
                   <p className="text-lg font-bold text-sage-400 mt-1">5</p>
                 </div>
                 <div className="text-center">
                   <p className="text-[10px] font-bold tracking-widest uppercase text-sage-500">Overall<br/>Ease</p>
                   <p className="text-lg font-bold text-sage-400 mt-1">5</p>
                 </div>
               </div>

               <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-sage-200">
                 <div className="h-32 bg-sage-200 rounded-xl mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('/play_horse.png')] bg-cover bg-center"></div>
                 </div>
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                   <h4 className="text-xl font-bold tracking-widest uppercase text-sage-900">Play</h4>
                 </div>
                 <p className="text-sage-700 leading-relaxed font-medium mb-6">
                   How are you experiencing this energy? (Upbeat, lively, creative?)
                 </p>
                 <div className="bg-sage-50 rounded-xl p-4 border border-sage-100 border-dashed text-sage-400 italic text-sm">
                   Your Somatic Diary entry...
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. NATIVE NERVOUS SYSTEM CAPACITY QUIZ TEASER */}
      <section className="bg-sage-900 text-cream-50 py-24 px-6 border-y border-sage-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            Free 60-Second Nervous System Check-In
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-cream-100 max-w-2xl leading-tight">
            Discover Your Nervous System State Before You Begin
          </h2>
          
          <p className="text-base md:text-xl text-sage-300 max-w-2xl leading-relaxed">
            Notice where your body tends to go under pressure—whether into <strong>Overdrive</strong> (the sentinel on watch), <strong>Guarded Freeze</strong> (the quiet shelter), or oscillating between both. Take our gentle 6-question check-in.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4">
            {[
              { title: "Overdrive Sentinel", badge: "Fight / Flight", desc: "Hyper-vigilant & tense" },
              { title: "Guarded Haven", badge: "Dorsal Vagal", desc: "Numb, heavy, or foggy" },
              { title: "Oscillating Pendulum", badge: "Burnout Cycle", desc: "Sprint then crash" },
              { title: "Emerging Anchor", badge: "Ventral Safety", desc: "Grounded & steady" },
            ].map((arch, i) => (
              <div key={i} className="bg-sage-800/80 p-5 rounded-2xl border border-sage-700 text-left space-y-1 hover:border-rose-400/50 transition-colors">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-300 bg-rose-900/40 px-2 py-0.5 rounded-full">
                  {arch.badge}
                </span>
                <p className="font-serif text-base text-cream-100 font-bold pt-1">{arch.title}</p>
                <p className="text-xs text-sage-400">{arch.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link
              href="/quiz"
              className="inline-flex items-center px-10 py-5 bg-rose-200 text-sage-900 rounded-full font-bold uppercase tracking-widest hover:bg-rose-300 transition-all hover:scale-105 active:scale-95 shadow-xl text-sm"
            >
              Start Your Free 60-Second Check-In <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <p className="text-xs text-sage-400 mt-3 max-w-lg mx-auto">
              Take the 60-second check-in to identify your primary response pattern. You'll receive an instant reflection on your body's stress language and an email with gentle somatic exercises tailored to where you are.
            </p>
          </div>
        </div>
      </section>

      {/* 7. EXPERIENCES WITH MARIA'S METHOD */}
      <section className="bg-cream-100 py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-sage-900">Experiences with Maria's Method</h2>
            <p className="text-sage-700 text-lg max-w-2xl mx-auto">Clients reflect on experiencing Maria's somatic method and equine-guided work in person—the foundational principles behind this 21-day digital reset.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-sage-200 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-amber-400 text-xl">★★★★★</div>
                  <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest text-center">Learned to align</span>
                </div>
                <p className="text-sage-800 leading-relaxed italic mb-8">"One of the most profound and beneficial therapeutic experiences! I enjoyed learning how to align deep breathing and relaxing movements with my intentions. I attribute my success to the wonderful and professional Maria, who guided me gently and patiently."</p>
              </div>
              <p className="font-bold tracking-widest uppercase text-xs text-sage-500">— L. (8-Week Journey Client)</p>
            </div>
            
            {/* Review 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-sage-200 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-amber-400 text-xl">★★★★★</div>
                  <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest text-center">Found balance</span>
                </div>
                <p className="text-sage-800 leading-relaxed italic mb-8">"Participating in Mane Discovery was a transformative experience. I learned about my nervous system and how to find balance. The practical techniques empowered me to manage stress and enhance my well-being. The facilitators created such a safe space."</p>
              </div>
              <p className="font-bold tracking-widest uppercase text-xs text-sage-500">— Lorraine (In-Person Client)</p>
            </div>
            
            {/* Review 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-sage-200 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-amber-400 text-xl">★★★★★</div>
                  <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest text-center">Felt safer</span>
                </div>
                <p className="text-sage-800 leading-relaxed italic mb-8">"I had a beautiful experience at my private session with Maria. The facilitator was knowledgeable, providing practical tools to manage stress and enhance well-being. I highly recommend Mane Discovery to anyone seeking personal growth."</p>
              </div>
              <p className="font-bold tracking-widest uppercase text-xs text-sage-500">— Tina (Private Session Client)</p>
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
               <Image src="/maria-guide.jpg" alt="Maria - Facilitator" fill className="object-cover object-top" />
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
                Through somatic inquiry and equine-facilitated learning, I've supported people in reconnecting with their bodies in ways that feel grounded, steady, and sustainable.
              </p>
              <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                <p className="font-serif text-xl pr-4 text-sage-900 italic">"This 21-day journey is a gentle starting point. We don't need to have it all figured out. We just need a quiet place to notice and begin."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING / CHECKOUT */}
      <section id="pricing" className="py-32 bg-sage-900 text-cream-50 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-rose-900/20 blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-16 space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-cream-100">Join the 21-Day Reset</h2>
          <p className="text-sage-300 max-w-xl mx-auto text-lg pt-4 border-t border-sage-700/50">
            This isn't a challenge where you push yourself.<br/>This is a reset where you finally learn to work with your nervous system.
          </p>
        </div>

        {/* SINGLE FOCUSED $39 OFFER */}
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="bg-white text-sage-900 rounded-[3rem] p-8 sm:p-12 md:p-14 shadow-2xl border-2 border-rose-200/60 relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold uppercase tracking-widest px-8 py-2.5 rounded-bl-3xl shadow-md">
              Complete Online Access
            </div>

            <div className="space-y-4">
              <span className="inline-block bg-sage-100 text-sage-800 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-sage-200">
                The 21-Day Digital Sanctuary
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-sage-900 leading-tight">
                The 21-Day Nervous System Reset
              </h3>
              <p className="text-sage-600 text-base md:text-lg leading-relaxed">
                Step off the chronic survival treadmill. Get instant lifetime access to the 21-day guided curriculum, daily somatic practices, and personal recalibration tracker.
              </p>
            </div>

            {/* Price Lock */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 pb-8 border-b border-sage-200">
              <span className="text-6xl sm:text-7xl font-sans font-bold text-sage-900 tracking-tight">$39</span>
              <div className="text-sage-600 text-sm font-medium">
                <span className="text-sage-900 font-bold uppercase tracking-wider block sm:inline">One-time payment</span>
                <span className="hidden sm:inline"> • </span>
                <span>Lifetime access • No subscriptions</span>
              </div>
            </div>

            {/* Everything Included */}
            <div className="space-y-4">
              <p className="text-xs uppercase font-bold tracking-widest text-sage-500">
                Everything Included in Your Reset:
              </p>
              <ul className="space-y-4 text-sm sm:text-base text-sage-800 font-medium">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Full 21-Day Guided App Journey</strong> with instant mobile, tablet, and desktop sync</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Daily 3-5 Minute Somatic Practices</strong> micro-dosed for stressed, busy nervous systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Interactive Discovery Ring & SOS Regulation Flow</strong> for grounding and support in moments of activation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Daily Equine-Inspired Insights</strong> exploring how horses move through stress as fellow nervous systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Day 21 Attachment Radar Report</strong> to visually track your somatic expansion and changes over time</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Official Somatic Reset Certificate</strong> generated upon completion</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>7-Day Compassionate Guarantee</strong> — 100% full refund if it is not the right time for your biology</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleCheckout}
                disabled={loadingCheckout}
                className="w-full py-6 bg-sage-900 text-cream-50 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-sage-800 transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loadingCheckout ? 'Opening Checkout...' : 'Start Your 21-Day Reset for $39 →'}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-sage-500 pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Secure 256-Bit Stripe Checkout</span>
                <span>•</span>
                <span>Instant Account Access</span>
              </div>

              {/* Short Disclaimer Near Pricing */}
              <div className="text-[11px] text-sage-500 text-center pt-3 leading-relaxed border-t border-sage-100">
                This program is educational and experiential. It is not psychotherapy or medical treatment, and it is not a substitute for professional care.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div id="faq" className="max-w-4xl mx-auto mt-28 relative z-10 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase font-bold tracking-widest text-rose-300">Got Questions?</p>
            <h3 className="text-3xl md:text-5xl font-serif text-cream-100">Frequently Asked Questions</h3>
            <p className="text-sage-300 text-sm max-w-xl mx-auto leading-relaxed">
              Everything you need to know about the 21-day reset, daily practices, and how your nervous system recalibrates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Do I need to be around actual horses?",
                a: "No! All practices are designed specifically for your home, bedroom, or office. Mane Discovery translates observational wisdom from horse herds into simple 3-minute body-based practices you can do anywhere."
              },
              {
                q: "How much time does it take each day?",
                a: "Just 3 to 5 minutes a day. It is intentionally micro-dosed for busy or tired nervous systems that don't have hours to meditate or journal. Regular, small somatic pauses help your body learn new patterns over time."
              },
              {
                q: "Are there any recurring subscriptions or hidden fees?",
                a: "None. The $39 is a single one-time payment that gives you lifetime access to the entire 21-day curriculum, daily somatic practices, interactive discovery ring, attachment report, and graduation certificate."
              },
              {
                q: "Do I need to download an app from the App Store?",
                a: "No downloads required. Mane Discovery is a high-performance web app that runs directly in your browser on iPhone, Android, tablet, or desktop with instant auto-sync across all your devices."
              },
              {
                q: "What happens right after I pay $39?",
                a: "Your access is instantly provisioned in our system. You will receive an immediate welcome email from Maria Roach with your direct dashboard link, so you can begin Day 1 immediately without waiting."
              },
              {
                q: "How does the 7-Day Guarantee work?",
                a: "Your biological safety comes first. If you start the journey and feel it is simply not the right time for your nervous system, email info@manediscovery.com within 7 days for a prompt, full refund. No questions asked."
              },
            ].map((faq, i) => (
              <div key={i} className="bg-sage-800/80 p-8 rounded-3xl border border-sage-700/80 space-y-3 hover:border-rose-400/30 transition-colors">
                <h4 className="font-serif text-lg text-rose-200">{faq.q}</h4>
                <p className="text-sm text-sage-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Compassionate Guarantee */}
        <div className="max-w-2xl mx-auto mt-20 bg-sage-800/40 p-8 rounded-3xl border border-sage-700/50 text-center relative z-10 hover:-translate-y-1 transition-transform">
          <div className="mx-auto w-12 h-12 bg-sage-700 rounded-full flex items-center justify-center mb-4">
            <HeartPulse className="w-6 h-6 text-rose-300" />
          </div>
          <h4 className="text-xl font-serif text-cream-100 mb-2">7-Day Guarantee</h4>
          <p className="text-sage-300 text-sm leading-relaxed">
            If you start the journey and your nervous system determines it's simply not the right time, email me at <a href="mailto:info@manediscovery.com" className="text-rose-300 hover:text-rose-200 underline underline-offset-2 transition-colors">info@manediscovery.com</a> within 7 days for a full refund. No questions, no pressure. Your biological safety always comes first.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-950 border-t border-sage-900 py-16 px-6 text-center text-sage-500 text-sm">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-sm text-sage-300 leading-relaxed max-w-3xl mx-auto text-justify sm:text-center p-6 bg-sage-900/50 rounded-2xl border border-sage-700">
            <strong>Disclaimer:</strong> The Mane Discovery 21-Day Nervous System Reset and all associated materials are provided for educational and self-exploration purposes only. This program is not intended to diagnose, treat, prevent, or cure any medical or psychological condition. The somatic practices and insights offered are not a substitute for professional medical advice, diagnosis, or clinical therapy. By participating, you acknowledge that you are responsible for your own well-being and agree to consult with a qualified healthcare provider or therapist before making any decisions regarding your mental health or wellness routines.
          </div>
          <p>© {new Date().getFullYear()} Mane Discovery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
