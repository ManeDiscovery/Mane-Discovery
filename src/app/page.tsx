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
          <h1 className="text-6xl md:text-[6.5rem] font-serif text-sage-900 tracking-tight leading-[0.9] drop-shadow-md">
            The 21-Day Nervous<br /><span className="text-rose-300">System</span> <span className="text-white">Reset</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream-50 max-w-2xl leading-relaxed mx-auto font-medium drop-shadow-md pb-8">
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
                <div className="flex text-amber-400 mb-6 text-xl">★★★★★</div>
                <p className="text-sage-800 leading-relaxed italic mb-8">"One of the most profound and beneficial therapeutic experiences! I enjoyed learning how to align deep breathing and relaxing movements with my intentions. I attribute my success to the wonderful and professional Maria, who guided me gently and patiently."</p>
              </div>
              <p className="font-bold tracking-widest uppercase text-xs text-sage-500">— L. (8-Week Journey Client)</p>
            </div>
            
            {/* Review 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-sage-200 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex text-amber-400 mb-6 text-xl">★★★★★</div>
                <p className="text-sage-800 leading-relaxed italic mb-8">"Participating in Mane Discovery was a transformative experience. I learned about my nervous system and how to find balance. The practical techniques empowered me to manage stress and enhance my well-being. The facilitators created such a safe space."</p>
              </div>
              <p className="font-bold tracking-widest uppercase text-xs text-sage-500">— Lorraine (In-Person Client)</p>
            </div>
            
            {/* Review 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-sage-200 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex text-amber-400 mb-6 text-xl">★★★★★</div>
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
      <section className="bg-sage-100 py-16 px-6 border-t border-sage-200 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-serif text-sage-900 drop-shadow-sm">Interested in becoming a Somatic EFL Practitioner?</h3>
          <p className="text-sage-700 text-lg">
            Learn the Mane Discovery method and help guide others through their own somatic journey.
            <br className="mb-2" />
            <a href="mailto:info@manediscovery.com" className="font-bold text-rose-800 hover:text-rose-900 underline underline-offset-4 transition-colors">Email us at info@manediscovery.com</a> to learn more about our upcoming certification pathways.
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
