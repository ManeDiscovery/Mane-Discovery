'use client';

import { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
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
          <h1 className="text-5xl sm:text-6xl md:text-[6.5rem] font-serif text-sage-900 tracking-tight leading-[0.95] md:leading-[0.9] drop-shadow-md w-full break-words">
            The 21-Day Nervous<br /><span className="text-rose-300">System</span> <span className="text-white">Reset</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-sage-900 font-serif max-w-3xl leading-relaxed mx-auto drop-shadow-sm mt-6 mb-2 bg-white/70 backdrop-blur-md px-6 sm:px-8 py-4 rounded-3xl border border-white/50 shadow-sm w-full">
            A 21-day guided app with daily lessons, 3-minute somatic practices, self-trust tracking, and a personalized graduation report.
          </h2>
          <p className="text-lg md:text-2xl text-cream-50 max-w-2xl leading-relaxed mx-auto font-medium drop-shadow-md pb-8 pt-4 w-full px-2">
            This is the Year of the Fire Horse. Fire doesn't wait. It moves, intensifies, and brings everything to the surface. Give yourself 21 days to slow down, reconnect, and shift permanently out of survival mode.
          </p>
          <a href="#pricing" className="inline-flex items-center px-10 py-5 bg-sage-900 text-cream-50 rounded-full font-bold uppercase tracking-widest hover:bg-sage-800 transition-all hover:scale-105 active:scale-95 shadow-xl">
            Start Your Journey <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </div>
      </header>

      {/* 2. THE PAIN & POLARIZATION */}
      <section className="bg-cream-50 pb-24 pt-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-sage-900 leading-tight">The Somatic Reset you've been searching for.</h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto leading-relaxed">
              You’ve done the talk therapy, read the books, and tried other healing modalities. But your body is still stuck in survival mode. The tension lingers. You feel exhausted, yet you're always “on,” unable to fully land even when nothing is wrong.
            </p>
          </div>
          
          <div className="bg-rose-50 p-10 rounded-[3rem] text-center border border-rose-100 shadow-sm relative overflow-hidden">
            <h3 className="text-2xl font-serif text-sage-900 mb-4 relative z-10">This journey isn’t for everyone.</h3>
            <p className="text-lg text-sage-800 leading-relaxed max-w-2xl mx-auto relative z-10">
              But for those who are ready to stop fighting their bodies—and finally work <em>with</em> their biology—this is the approach that truly shifts something.
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
              How does a 1,000-pound animal hold the secret to healing human chronic stress?
            </h2>
          </div>

          <div className="bg-sage-800/50 p-10 md:p-14 rounded-[3rem] border border-sage-700 backdrop-blur-sm text-sage-100 text-lg leading-relaxed space-y-6">
            <p>
              Horses are prey animals. They experience fear, stress, and anxiety just like we do. But unlike us, they don't hold onto it. They naturally <strong className="text-rose-300">co-regulate</strong> and use embodiment techniques to process danger.
            </p>
            <p>
              When a horse experiences a stress spike, they physically move the energy through their body. You’ll see them literally quiver, yawn, roll, and return to grazing—completely resetting their nervous system in minutes.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 border-y border-sage-700/50 my-8">
              <div className="text-center flex-1">
                <div className="w-16 h-16 bg-sage-700 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-sage-600">
                  <Wind className="w-8 h-8 text-rose-300" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase text-sage-300 mb-2">The Horse</p>
                <p className="text-cream-100">Processes stress purely through the physical body</p>
              </div>
              <ArrowRight className="w-8 h-8 text-sage-600 hidden md:block" />
              <ArrowRight className="w-8 h-8 text-sage-600 rotate-90 md:hidden" />
              <div className="text-center flex-1">
                <div className="w-16 h-16 bg-sage-700 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-sage-600">
                  <HeartPulse className="w-8 h-8 text-rose-300" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase text-sage-300 mb-2">The Human</p>
                <p className="text-cream-100">Can relearn body-based release to clear trauma</p>
              </div>
              <ArrowRight className="w-8 h-8 text-sage-600 hidden md:block" />
              <ArrowRight className="w-8 h-8 text-sage-600 rotate-90 md:hidden" />
              <div className="text-center flex-1">
                <div className="w-16 h-16 bg-rose-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-rose-800">
                  <Activity className="w-8 h-8 text-rose-300" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase text-rose-300 mb-2">The Method</p>
                <p className="text-cream-100">Guides your practice step-by-step for 21 days</p>
              </div>
            </div>

            <h3 className="text-2xl font-serif text-cream-50 pt-4">As humans, we’ve unlearned how to do this.</h3>
            <p>
              Right now, life asks more of your nervous system than it was ever designed to hold. That’s your nervous system running an old survival pattern in a life that has already moved on.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE YEAR OF THE FIRE HORSE & BENEFITS */}
      <section className="bg-cream-50 py-32 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-rose-800">And this year… you’ll feel that more than ever.</h2>
            <p className="text-xl text-sage-800 italic font-medium leading-relaxed">
              After all, this is the year of the <strong>Fire Horse</strong>.
            </p>
            <div className="bg-white p-8 rounded-3xl border border-rose-200 mt-8 shadow-sm">
              <p className="text-lg text-sage-700 leading-relaxed font-serif">
                Fire doesn’t wait. It moves. It intensifies. It brings everything to the surface. That’s what the 21-day horse-inspired reset is for now.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-serif text-sage-900 mb-6">What you will learn</h2>
              <p className="text-lg text-sage-700 max-w-2xl mx-auto leading-relaxed">
                This reset is designed to expand your capacity—not by forcing change, but by creating new experiences in your body. Through simple, repeatable steps, you'll learn to:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: ShieldCheck, title: "Pause and step out of autopilot." },
                { icon: Activity, title: "Track what your body is doing in real-time." },
                { icon: Wind, title: "Regulate and support your system." },
                { icon: Footprints, title: "Repattern and choose a new, steady response." },
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

          <div className="max-w-3xl mx-auto text-center space-y-6 bg-sage-100 p-12 rounded-[3rem] border border-sage-200 shadow-inner">
            <h3 className="text-3xl font-serif text-sage-900 leading-tight">
              Learn to move forward without abandoning yourself.
            </h3>
            <p className="text-xl text-sage-800 font-medium tracking-wide">
              Be steady. Be responsive. Be connected.
            </p>
            <div className="pt-8 mt-8 border-t border-sage-300">
              <p className="text-lg text-sage-900 italic font-serif">
                Pause and check in with your body. <br/><strong className="text-rose-800 text-xl not-italic block mt-4 drop-shadow-sm">Ask yourself... are you ready for this?</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 APP FEATURES MOCKUPS */}
      <section className="bg-sage-900 py-32 px-6 text-cream-50 border-t-8 border-rose-300">
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


      {/* 5. NERVOUS SYSTEM CAPACITY QUIZ */}
      <section className="bg-sage-200 py-32 px-6 border-y border-sage-300">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-sage-900 drop-shadow-sm">Check Your Nervous System Capacity</h2>
            <p className="text-lg text-sage-800 max-w-2xl mx-auto font-medium">
              Take this quick free assessment to discover how much of your biological capacity is currently tied up in survival mode before proceeding.
            </p>
          </div>

          <div className="w-full bg-white rounded-[2.5rem] shadow-2xl border-4 border-sage-100 p-2 overflow-hidden relative min-h-[500px]">
            {/* Loading placeholder while quiz loads */}
            <div className="absolute inset-0 flex items-center justify-center bg-white z-0">
              <span className="text-sage-500 uppercase tracking-widest font-bold text-sm animate-pulse">Loading Assessment...</span>
            </div>
            
            {/* ScoreApp div with Next.js specific styling formatting */}
            <div  
              className="relative z-10 bg-white"
              data-sa-url="https://78c97874-7d7e-48fb-9556-8f07457d7ca1.scoreapp.com/?sa_target=_top" 
              data-sa-view="inline" 
              style={{ maxWidth: '100%', width: '100%' }} 
              data-sa-auto-height="1"
            ></div>

            {/* Next.js specifically optimized Script loading */}
            <Script 
              src="https://static.scoreapp.com/js/integration/v1/embedding.js?v=FC6_jg" 
              strategy="lazyOnload" 
            />
          </div>

        </div>
      </section>

      {/* 7. EXPERIENCES FROM THE HERD / TESTIMONIALS */}
      <section className="bg-cream-100 py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-sage-900">Experiences from the Herd</h2>
            <p className="text-sage-700 text-lg max-w-2xl mx-auto">What it's like to experience the Mane Discovery somatic method with Maria.</p>
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
                Through somatic work and equine-facilitated learning, I've helped people reconnect to themselves in ways that feel real, grounded, and incredibly sustainable.
              </p>
              <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                <p className="font-serif text-xl pr-4 text-sage-900 italic">"This 21-day journey is a starting point. You don't need to have it all figured out. You just need a place to begin."</p>
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch relative z-10">
          
          <div className="bg-white text-sage-900 rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all hover:-translate-y-1">
            <div>
              <div className="inline-block bg-sage-100 text-sage-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-sage-200">
                Best for self-starters
              </div>
              <h3 className="text-3xl font-serif mb-2">The Solo Reset</h3>
              <p className="text-sage-500 text-sm mb-8">For the independent traveler ready to commit to their own pacing.</p>
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
              {loadingTier === 'basic' ? 'Opening...' : 'Start Your Journey'}
            </button>
          </div>

          <div className="bg-sage-800 text-cream-50 rounded-[2.5rem] p-10 shadow-2xl border border-sage-600 flex flex-col justify-between hover:shadow-3xl transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-bl-3xl shadow-md">
              Cohort
            </div>
            <div>
              <div className="inline-block bg-rose-500/20 text-rose-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-rose-500/30">
                Best for deeper healing
              </div>
              <h3 className="text-3xl font-serif mb-2 text-rose-100">Guided Embodiment</h3>
              <p className="text-sage-400 text-sm mb-8">The app journey plus live co-regulation and group support.</p>
              <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-sage-700">
                 <span className="text-6xl font-sans font-medium">$97</span>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-start text-sage-200 font-medium"><Check className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> Everything in The Solo Reset</li>
                <li className="flex items-start text-sage-200 font-medium"><HeartHandshake className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> 4 Weekly Live Group Support Calls</li>
                <li className="flex items-start text-sage-200 font-medium"><HeartHandshake className="w-5 h-5 text-rose-300 mr-4 shrink-0" /> Priority guidance from Maria</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <div className="bg-rose-900/40 border border-rose-300/30 text-rose-100 text-sm p-4 rounded-xl mb-4 text-center font-medium">
                <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-rose-400 mr-2"></span>
                Next Cohort Starting Soon.<br/>Limited live support spots available.
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

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto mt-20 relative z-10 hidden md:block">
          <h3 className="text-3xl font-serif text-center mb-10 text-cream-100">Compare the Journeys</h3>
          <div className="bg-sage-800/80 rounded-3xl border border-sage-700 overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sage-900/50">
                  <th className="p-6 font-serif text-xl text-sage-200 w-1/2">Features</th>
                  <th className="p-6 text-center font-bold tracking-widest uppercase text-sm text-sage-300 w-1/4 border-l border-sage-700/50">The Solo Reset</th>
                  <th className="p-6 text-center font-bold tracking-widest uppercase text-sm text-rose-300 w-1/4 border-l border-sage-700/50">Guided Embodiment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-700/50">
                {[
                  { feature: "21-Day App Access", basic: true, premium: true },
                  { feature: "Daily Somatic Audio Practices", basic: true, premium: true },
                  { feature: "Interactive Discovery Ring & SOS Flow", basic: true, premium: true },
                  { feature: "Self-Trust Ledger & Tracking", basic: true, premium: true },
                  { feature: "Attachment Radar Report", basic: true, premium: true },
                  { feature: "Certificate of Completion", basic: true, premium: true },
                  { feature: "4 Weekly Live Group Calls", basic: false, premium: true },
                  { feature: "Live Co-regulation Practices", basic: false, premium: true },
                  { feature: "Priority Guidance from Maria", basic: false, premium: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-sage-700/20 transition-colors">
                    <td className="p-5 pl-6 text-sage-100 font-medium">{row.feature}</td>
                    <td className="p-5 text-center border-l border-sage-700/50">
                      {row.basic ? <Check className="w-5 h-5 text-sage-400 mx-auto" /> : <span className="text-sage-600">-</span>}
                    </td>
                    <td className="p-5 text-center border-l border-sage-700/50 bg-rose-900/10">
                      {row.premium ? <Check className="w-6 h-6 text-rose-400 mx-auto" /> : <span className="text-sage-600">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7-Day Compassionate Guarantee */}
        <div className="max-w-2xl mx-auto mt-16 bg-sage-800/40 p-8 rounded-3xl border border-sage-700/50 text-center relative z-10 hover:-translate-y-1 transition-transform">
          <div className="mx-auto w-12 h-12 bg-sage-700 rounded-full flex items-center justify-center mb-4">
            <HeartPulse className="w-6 h-6 text-rose-300" />
          </div>
          <h4 className="text-xl font-serif text-cream-100 mb-2">7-Day Guarantee</h4>
          <p className="text-sage-300 text-sm leading-relaxed">
            If you start the journey and your nervous system determines it's simply not the right time, email me at <a href="mailto:info@manediscovery.com" className="text-rose-300 hover:text-rose-200 underline underline-offset-2 transition-colors">info@manediscovery.com</a> within 7 days for a full refund. No questions, no pressure. Your biological safety always comes first.
          </p>
        </div>
      </section>

      {/* 9. EFL PRACTITIONER CALLOUT */}
      <section className="bg-sage-100 py-20 px-6 border-t border-sage-200 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-horse-landscape.png')] opacity-5 bg-cover bg-center"></div>
        <div className="max-w-3xl mx-auto space-y-8 relative z-10 bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border border-white">
          <div>
            <h3 className="text-3xl font-serif text-sage-900 drop-shadow-sm mb-2">Become a Somatic Practitioner</h3>
            <p className="text-sage-700 text-lg">
              Learn the Mane Discovery method and help guide others through their own somatic healing journey.
            </p>
          </div>
          
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
             <p className="text-sage-900 font-bold text-lg mb-4">Join the Practitioner Pathway Interest List</p>
             <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("You've been added to the waitlist!"); }}>
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="flex-1 px-5 py-3 rounded-xl border border-sage-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sage-900"
                 required
               />
               <button 
                 type="submit" 
                 className="px-6 py-3 bg-sage-900 text-white font-bold tracking-widest uppercase text-sm rounded-xl hover:bg-sage-800 transition-colors shadow-md"
               >
                 Join Waitlist
               </button>
             </form>
             <p className="text-xs text-sage-500 mt-4">Spots for the next cohort will be extremely limited.</p>
          </div>
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
