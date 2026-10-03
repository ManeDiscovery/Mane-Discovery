'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, HeartPulse, Brain, Shield, Compass, RotateCcw, Lock } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    state: 'sympathetic' | 'dorsal' | 'oscillating' | 'ventral';
    points: { tension: number; ease: number };
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    title: "The Pressure Trigger",
    subtitle: "When unexpected conflict, chaos, or pressure hits, what is your body's instantaneous physical reflex?",
    options: [
      {
        label: "Racing & Hyper-Readiness",
        description: "Heart accelerates, breath stays high in the chest, throat tightens, and an urge to fix or move immediately kicks in.",
        state: 'sympathetic',
        points: { tension: 8, ease: 2 }
      },
      {
        label: "Sudden Fog & Shut-Off",
        description: "Mind goes blank, limbs feel heavy or numb, energy drops instantly, and you want to disappear into hiding.",
        state: 'dorsal',
        points: { tension: 7, ease: 1 }
      },
      {
        label: "Whiplash Spike & Crash",
        description: "You panic-react or over-explain initially, followed immediately by total exhaustion and collapse.",
        state: 'oscillating',
        points: { tension: 9, ease: 2 }
      },
      {
        label: "Grounded Pause",
        description: "You feel the jolt, but can exhale, feel your feet on the ground, and respond deliberately.",
        state: 'ventral',
        points: { tension: 3, ease: 8 }
      }
    ]
  },
  {
    id: 2,
    title: "The Rest Dilemma",
    subtitle: "When you finally have a free afternoon with nowhere to be, how does stillness feel?",
    options: [
      {
        label: "Uncomfortable & Anxious",
        description: "Sitting still triggers guilt or restlessness. You find chores or projects to stay occupied.",
        state: 'sympathetic',
        points: { tension: 8, ease: 2 }
      },
      {
        label: "Numbing & Disconnected",
        description: "You scroll or lie down for hours, but emerge feeling drained, sluggish, and not truly refreshed.",
        state: 'dorsal',
        points: { tension: 6, ease: 2 }
      },
      {
        label: "Guilt Followed by Crash",
        description: "You resist stopping until your body literally forces you to sleep or collapse.",
        state: 'oscillating',
        points: { tension: 9, ease: 2 }
      },
      {
        label: "Nourishing & Restorative",
        description: "You can soften into the cushions, take slow belly breaths, and enjoy being.",
        state: 'ventral',
        points: { tension: 2, ease: 9 }
      }
    ]
  },
  {
    id: 3,
    title: "Somatic Body Geography",
    subtitle: "Where does tension, tightness, or disconnection consistently lodge itself in your physique?",
    options: [
      {
        label: "Jaw, Neck & Upper Shoulders",
        description: "Teeth clenching, headaches, or holding tension as if bracing for impact.",
        state: 'sympathetic',
        points: { tension: 8, ease: 3 }
      },
      {
        label: "Hollow Gut or Heavy Chest",
        description: "A sinking feeling, shallow respiration, or feeling detached from physical sensations below the neck.",
        state: 'dorsal',
        points: { tension: 7, ease: 2 }
      },
      {
        label: "Shifting Tension Across the Body",
        description: "Different days hurt in different ways—sometimes tight back, sometimes nervous stomach.",
        state: 'oscillating',
        points: { tension: 8, ease: 2 }
      },
      {
        label: "Transient & Easily Released",
        description: "Mild temporary tightness that lets go once acknowledged or gently stretched.",
        state: 'ventral',
        points: { tension: 2, ease: 8 }
      }
    ]
  },
  {
    id: 4,
    title: "Relational Boundary Instinct",
    subtitle: "When a friend, partner, or colleague asks something of you that pushes your limits:",
    options: [
      {
        label: "Instant Over-Accommodating",
        description: "You say 'yes' before thinking, or over-explain your reasons to avoid any potential discord.",
        state: 'sympathetic',
        points: { tension: 8, ease: 2 }
      },
      {
        label: "Ghosting or Emotional Wall",
        description: "You pull back, delay replying, or mentally detach to protect yourself from demand.",
        state: 'dorsal',
        points: { tension: 7, ease: 1 }
      },
      {
        label: "Resentment Loop",
        description: "You say yes, feel intensely resentful inside, and later want to cut communication entirely.",
        state: 'oscillating',
        points: { tension: 9, ease: 2 }
      },
      {
        label: "Calm, Kind Boundaries",
        description: "You can say 'I cannot do that this week' with warmth and zero bodily panic.",
        state: 'ventral',
        points: { tension: 2, ease: 9 }
      }
    ]
  },
  {
    id: 5,
    title: "Sensory & Environment Load",
    subtitle: "How does your nervous system handle open offices, loud restaurants, or back-to-back screen notifications?",
    options: [
      {
        label: "Vigilant Agitation",
        description: "Every ding or sudden noise jolts you. You feel fried and on edge by 3 PM.",
        state: 'sympathetic',
        points: { tension: 9, ease: 1 }
      },
      {
        label: "Dissociative Spacing Out",
        description: "You check out, miss parts of conversations, and feel like you are looking at life through a glass wall.",
        state: 'dorsal',
        points: { tension: 7, ease: 2 }
      },
      {
        label: "Rapid Depletion & Headaches",
        description: "You push through on adrenaline, then hit a hard biological wall with migraines or mood drops.",
        state: 'oscillating',
        points: { tension: 9, ease: 2 }
      },
      {
        label: "Adaptable Filtering",
        description: "You notice the noise, but can filter it without draining your biological battery.",
        state: 'ventral',
        points: { tension: 2, ease: 8 }
      }
    ]
  },
  {
    id: 6,
    title: "The Mind vs. Body Paradox",
    subtitle: "Which statement best mirrors your past experiences with therapy, reading, or mental wellness?",
    options: [
      {
        label: "Intellectually Clear, Biologically Stuck",
        description: "I have read the books and understand my patterns in my head, but my body still reacts like it's in danger.",
        state: 'sympathetic',
        points: { tension: 8, ease: 2 }
      },
      {
        label: "Talking Often Drains Me More",
        description: "Re-analyzing my story verbally often leaves me more disconnected or exhausted than when I started.",
        state: 'dorsal',
        points: { tension: 7, ease: 2 }
      },
      {
        label: "Great in Theory, Vanishes Under Stress",
        description: "Mindfulness works when everything is quiet, but evaporates the second real life challenges strike.",
        state: 'oscillating',
        points: { tension: 8, ease: 2 }
      },
      {
        label: "Ready for Deep Somatic Mastery",
        description: "I know my body needs direct biological practice, not more conceptual advice.",
        state: 'ventral',
        points: { tension: 3, ease: 8 }
      }
    ]
  }
];

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const currentQ = quizQuestions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Archetype Computation
  const calculateResult = () => {
    let sympatheticCount = 0;
    let dorsalCount = 0;
    let oscillatingCount = 0;
    let ventralCount = 0;
    let totalTension = 0;
    let totalEase = 0;

    quizQuestions.forEach((q, idx) => {
      const selectedOptIdx = selectedAnswers[idx] ?? 0;
      const opt = q.options[selectedOptIdx];
      if (opt.state === 'sympathetic') sympatheticCount++;
      if (opt.state === 'dorsal') dorsalCount++;
      if (opt.state === 'oscillating') oscillatingCount++;
      if (opt.state === 'ventral') ventralCount++;
      totalTension += opt.points.tension;
      totalEase += opt.points.ease;
    });

    const maxScore = Math.max(sympatheticCount, dorsalCount, oscillatingCount, ventralCount);

    if (sympatheticCount === maxScore) {
      return {
        archetype: "The Overdrive Sentinel",
        state: "Sympathetic Dominant",
        tensionScore: totalTension,
        easeScore: totalEase,
        quote: "Your nervous system has been running sentinel duty for so long that hyper-vigilance feels like normal life.",
        somaticAnalysis: "Your body is trapped in perpetual forward-lean. Cortisol and muscular bracing are kept on standby. You don't need 'more relaxation'—you need biological evidence of safety that allows your optic nerve and diaphragmatic muscles to release.",
        herdWisdom: "In wild herds, a sentinel horse only watches when danger is present. Once the wolf leaves, they shake vigorously, chew, drop their head, and re-enter the herd. Your system never completed that discharge.",
        recommendedDay: "Day 1: Finding Your Inner Rhythm & The Soft Gaze"
      };
    } else if (dorsalCount === maxScore) {
      return {
        archetype: "The Guarded Haven",
        state: "Dorsal Vagal Freeze Dominant",
        tensionScore: totalTension,
        easeScore: totalEase,
        quote: "When emotional demand exceeded your threshold, your biology wisely deployed the ancient shield of freeze and detachment.",
        somaticAnalysis: "Your system preserves vital energy by pulling sensations behind a fortress wall. You aren't 'lazy' or 'unmotivated'—your dorsal vagus has temporarily dialled down your metabolic engine to protect you from pain.",
        herdWisdom: "A horse conserving stamina during harsh blizzard conditions lowers its head and reduces outer movement to survive. Healing here comes through micro-movements and safe relational touch.",
        recommendedDay: "Day 2: Mapping the Landscape & Somatic Observation"
      };
    } else if (oscillatingCount === maxScore) {
      return {
        archetype: "The Oscillating Pendulum",
        state: "Chronic Burnout Cycle",
        tensionScore: totalTension,
        easeScore: totalEase,
        quote: "You live in a biological swing between 150mph adrenaline bursts and debilitating crash shutdowns.",
        somaticAnalysis: "Your nervous system has lost its intermediate gears. It only knows full-throttle fight or zero-fuel shutdown. Expanding your 'window of tolerance' through somatic equine co-regulation stabilizes this pendulum permanently.",
        herdWisdom: "Young horses learn their pacing from the steady, rhythmic heartbeat of older mares. By co-regulating with equine rhythms, the nervous system discovers how to move without burning out.",
        recommendedDay: "Day 4: Meeting Resistance & Rhythmic Centering"
      };
    } else {
      return {
        archetype: "The Emerging Anchor",
        state: "Ventral Safety Foundation",
        tensionScore: totalTension,
        easeScore: totalEase,
        quote: "You have natural somatic awareness and are primed to step into deep embodiment and nervous system leadership.",
        somaticAnalysis: "Your biological baseline is primed for grounded regulation. The 21-day reset will allow you to deepen this into unshakeable self-trust and learn how to hold space for others.",
        herdWisdom: "The lead mare doesn't control the herd through force; she leads through the unshakeable calm and clarity of her own autonomic nervous system.",
        recommendedDay: "Day 7: The Polyvagal Ladder & Relational Attunement"
      };
    }
  };

  const result = calculateResult();

  const handleCaptureLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Track Meta Pixel Lead event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: result.archetype,
        status: 'completed',
      });
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          archetype: result.archetype,
          dominantState: result.state,
          tensionScore: result.tensionScore,
          easeScore: result.easeScore,
          answers: selectedAnswers,
        }),
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectCheckout = async (tier: 'basic' | 'premium') => {
    setCheckoutLoading(true);

    // Track Meta Pixel InitiateCheckout event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 39.00,
        currency: 'USD',
        content_name: 'The 21-Day Nervous System Reset',
      });
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start checkout');
      }
    } catch (e: any) {
      alert(e.message || 'Checkout error');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 font-sans selection:bg-rose-200 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-sage-200 pb-6">
          <Link href="/" className="inline-flex items-center text-sage-600 hover:text-sage-900 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mane Discovery
          </Link>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-sage-500 bg-sage-100 px-3 py-1 rounded-full">
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            <span>Somatic Diagnostic</span>
          </div>
        </div>

        {!quizCompleted ? (
          /* QUIZ QUESTIONS FLOW */
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-sage-600">
                <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <span>{progressPercent}% Complete</span>
              </div>
              <div className="w-full bg-sage-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sage-800 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-sage-200/80 space-y-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                  Step {currentQ.id}
                </span>
                <h1 className="text-2xl md:text-3xl font-serif text-sage-900 mt-4 leading-tight">
                  {currentQ.title}
                </h1>
                <p className="text-sage-600 text-base md:text-lg mt-2 leading-relaxed">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3.5">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-6 rounded-2xl border transition-all flex items-start gap-4 ${
                        isSelected
                          ? 'border-sage-900 bg-sage-50 shadow-md translate-x-1'
                          : 'border-sage-200 hover:border-sage-400 bg-cream-50/50 hover:bg-cream-50'
                      }`}
                    >
                      <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'border-sage-900 bg-sage-900' : 'border-sage-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="space-y-1">
                        <p className={`font-serif text-lg ${isSelected ? 'text-sage-950 font-bold' : 'text-sage-800'}`}>
                          {option.label}
                        </p>
                        <p className="text-sm text-sage-600 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-sage-100">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-5 py-3 text-sage-600 hover:text-sage-900 text-sm font-bold uppercase tracking-wider disabled:opacity-30 disabled:hover:text-sage-600"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  className="inline-flex items-center px-8 py-4 bg-sage-900 text-cream-50 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-sage-800 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'Analyze My Biology' : 'Continue'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* QUIZ DIAGNOSTIC RESULTS + LEAD CAPTURE + STRIPE OFFER BRIDGE */
          <div className="space-y-12 animate-in zoom-in-95 duration-500">
            
            {/* Result Header */}
            <div className="bg-sage-900 text-cream-50 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden space-y-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-900/30 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                  Your Biological Archetype
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-cream-100 leading-tight">
                  {result.archetype}
                </h1>
                <p className="text-lg md:text-xl text-rose-200 font-serif italic max-w-2xl">
                  "{result.quote}"
                </p>
              </div>

              {/* Bio Breakdown Grid */}
              <div className="relative z-10 grid md:grid-cols-2 gap-6 pt-6 border-t border-sage-800">
                <div className="bg-sage-800/80 p-6 rounded-2xl border border-sage-700 space-y-3">
                  <div className="flex items-center gap-2 text-sage-200 font-bold text-sm tracking-wide uppercase">
                    <Brain className="w-4 h-4 text-rose-300" />
                    Autonomic State
                  </div>
                  <p className="text-sage-300 text-sm leading-relaxed">
                    {result.somaticAnalysis}
                  </p>
                </div>

                <div className="bg-sage-800/80 p-6 rounded-2xl border border-sage-700 space-y-3">
                  <div className="flex items-center gap-2 text-sage-200 font-bold text-sm tracking-wide uppercase">
                    <Compass className="w-4 h-4 text-amber-300" />
                    The Equine Reset Insight
                  </div>
                  <p className="text-sage-300 text-sm leading-relaxed">
                    {result.herdWisdom}
                  </p>
                </div>
              </div>
            </div>

            {/* Email Lead Capture Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-sage-200 space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <h2 className="text-2xl md:text-3xl font-serif text-sage-900">
                  Save Your Somatic Blueprint
                </h2>
                <p className="text-sage-600 text-sm leading-relaxed">
                  Enter your email to receive your full PDF diagnostic breakdown and custom somatic practices tailored specifically for <strong>{result.archetype}</strong>.
                </p>
              </div>

              <form onSubmit={handleCaptureLead} className="max-w-md mx-auto space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your First Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-400 text-sage-900 text-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Best Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-400 text-sage-900 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-sage-900 text-cream-50 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-sage-800 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Saving...'
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-rose-300" />
                      Email My Somatic Blueprint
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Direct High-Converting Checkout Bridge */}
            <div className="bg-gradient-to-br from-sage-900 via-sage-950 to-sage-900 text-cream-50 rounded-[3rem] p-10 md:p-14 shadow-2xl space-y-8 relative overflow-hidden border border-sage-800">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Instant Starter Offer
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-cream-100">
                  Begin The 21-Day Reset Today
                </h3>
                <p className="text-sage-300 text-base leading-relaxed">
                  Your assessment points directly to <strong>{result.recommendedDay}</strong>. In 21 days of 3-minute guided practices, permanently shift your biology out of survival mode.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Solo Reset $39 */}
                <div className="bg-white text-sage-900 p-8 rounded-3xl shadow-lg flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-widest font-bold text-sage-500">Self-Paced App</p>
                    <h4 className="text-2xl font-serif">The Solo Reset</h4>
                    <div className="text-4xl font-sans font-bold text-sage-900">$39</div>
                    <p className="text-xs text-sage-600 leading-relaxed">
                      Instant lifetime access to the 21-Day App, somatic practices, attachment radar report, and certificate.
                    </p>
                  </div>
                  <button
                    onClick={() => handleDirectCheckout('basic')}
                    disabled={checkoutLoading}
                    className="w-full py-4 bg-sage-900 text-cream-50 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-sage-800 transition-all shadow-md"
                  >
                    {checkoutLoading ? 'Opening...' : 'Start Solo ($39)'}
                  </button>
                </div>

                {/* Cohort $97 */}
                <div className="bg-rose-950/40 text-cream-50 border border-rose-400/30 p-8 rounded-3xl shadow-lg flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-widest font-bold text-rose-300">Live Co-Regulation</p>
                    <h4 className="text-2xl font-serif text-rose-100">Guided Embodiment</h4>
                    <div className="text-4xl font-sans font-bold text-rose-200">$97</div>
                    <p className="text-xs text-sage-300 leading-relaxed">
                      Everything in Solo + 4 weekly live group co-regulation calls and priority guidance with Maria Roach.
                    </p>
                  </div>
                  <button
                    onClick={() => handleDirectCheckout('premium')}
                    disabled={checkoutLoading}
                    className="w-full py-4 bg-rose-200 text-sage-900 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-rose-300 transition-all shadow-md"
                  >
                    {checkoutLoading ? 'Opening...' : 'Join Cohort ($97)'}
                  </button>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/"
                  className="text-xs text-sage-400 hover:text-cream-100 underline underline-offset-4 tracking-wider uppercase font-medium"
                >
                  Explore Full Program Curriculum
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
