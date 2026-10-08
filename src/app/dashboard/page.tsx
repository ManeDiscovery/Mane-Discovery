'use client';

import { useAppStore } from '@/store/useAppStore';
import { Lock, Unlock, CheckCircle2, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const phases = [
  { name: 'Phase 1: Awareness', start: 1, end: 7 },
  { name: 'Phase 2: Regulation', start: 8, end: 14 },
  { name: 'Phase 3: Embodiment', start: 15, end: 21 },
];

export default function Dashboard() {
  const { currentDay, unlockedDays, checkins, debugUnlockAll, resetProgress, hasPaid, tier } = useAppStore();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    resetProgress();
    router.push('/login');
  };

  const getDayStatus = (day: number) => {
    // Free preview users can access Day 1
    if (!hasPaid && day > 1) return 'locked';
    if (day < currentDay) return 'completed';
    if (unlockedDays.includes(day)) return 'unlocked';
    return 'locked';
  };

  return (
    <div className="w-full max-w-4xl px-6 py-12 mx-auto space-y-16">
      {/* Header */}
      <header className="flex flex-col items-center text-center space-y-6">
        <div className="relative w-24 h-24 mb-2">
          <Image 
            src="/logo.png" 
            alt="Mane Discovery Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-sage-900 tracking-tight">
          Nervous System Reset
        </h1>
        <p className="text-lg text-sage-700 max-w-xl leading-relaxed">
          A 21-day journey to recalibrate your nervous system, build emotional resilience, and discover your true mane.
        </p>

        {/* Access Tier Badge & Upgrade Banner */}
        {!hasPaid ? (
          <div className="w-full bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center shadow-sm space-y-3">
            <span className="inline-block bg-rose-200 text-rose-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Free Sample Mode (Day 1 Unlocked)
            </span>
            <p className="text-sm text-sage-800 max-w-lg mx-auto leading-relaxed">
              You are currently enjoying the Day 1 sample practice. Unlock the complete 21-day immersion, self-trust tracking, and graduation certificate anytime.
            </p>
            <div className="pt-1">
              <Link
                href="/#pricing"
                className="inline-flex items-center px-6 py-2.5 bg-sage-900 text-cream-50 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors shadow-sm"
              >
                Unlock All 21 Days ($39)
              </Link>
            </div>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-sage-100 border border-sage-300 text-sage-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {tier === 'premium' ? 'Guided Cohort Member' : 'Full Reset Unlocked'}
          </div>
        )}

        {/* Developer / Account Overrides */}
        <div className="flex gap-4 pt-2 flex-wrap justify-center">
          <button 
            onClick={handleLogout}
            className="text-xs px-4 py-2 bg-white text-sage-700 border border-sage-200 rounded-full hover:bg-sage-50 transition-colors shadow-sm flex items-center"
          >
            <LogOut className="w-3 h-3 mr-2" />
            Log Out
          </button>
        </div>
      </header>

      {unlockedDays.length < 3 && (
        <section className="bg-sage-50 border border-sage-200 rounded-[2rem] p-8 md:p-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-xl font-serif text-sage-900 mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center text-xs font-bold mr-3">?</span>
            How to Use This App
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-sage-800 text-sm leading-relaxed">
            <div>
              <p className="font-bold text-sage-900 mb-1">1. Daily Check-in</p>
              <p>Start each day by tapping the interactive ring. Notice how your body feels before consuming content.</p>
            </div>
            <div>
              <p className="font-bold text-sage-900 mb-1">2. The Lesson</p>
              <p>Read the day's equine insight and reflect using the secure, private journal built into the dashboard.</p>
            </div>
            <div>
              <p className="font-bold text-sage-900 mb-1">3. Somatic Practice</p>
              <p>Use the 3-minute timer to physically integrate the lesson into your biology. Then, the next day unlocks.</p>
            </div>
          </div>
        </section>
      )}

      {/* Progress Phases */}
      <div className="space-y-16">
        {phases.map((phase) => (
          <section key={phase.name} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: `${(phase.start - 1) * 30}ms` }}>
            <h2 className="text-2xl font-serif border-b border-sage-300/50 pb-3 text-sage-900 flex items-center justify-between">
              <span>{phase.name}</span>
              <span className="text-sm font-sans tracking-widest text-sage-500 uppercase">
                Days {phase.start}-{phase.end}
              </span>
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {Array.from({ length: 7 }, (_, i) => phase.start + i).map((day) => {
                const status = getDayStatus(day);
                const isLocked = status === 'locked';
                const isCompleted = status === 'completed';

                return (
                  <Link 
                    key={day} 
                    href={isLocked ? '#' : `/day/${day}/checkin`}
                    className={`
                      relative flex flex-col items-center justify-center py-6 px-4 rounded-3xl transition-all duration-300
                      ${isLocked 
                        ? 'bg-cream-500/40 cursor-not-allowed opacity-50 hover:opacity-60 grayscale' 
                        : isCompleted
                          ? 'bg-sage-100 hover:bg-sage-300 text-sage-900 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-1'
                          : 'bg-rose-100 hover:bg-rose-300 text-rose-900 shadow-md hover:shadow-lg cursor-pointer ring-2 ring-rose-300 ring-offset-4 ring-offset-background hover:-translate-y-1'
                      }
                    `}
                  >
                    <span className="text-xs font-semibold tracking-widest uppercase mb-3 opacity-70">
                      Day {day}
                    </span>
                    
                    <div className={`
                      h-12 w-12 flex items-center justify-center rounded-full shadow-inner transition-colors duration-300
                      ${isCompleted ? 'bg-sage-300/50' : isLocked ? 'bg-sage-900/5' : 'bg-rose-500/20'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-sage-700" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5 text-sage-900/40" />
                      ) : (
                        <Unlock className="w-6 h-6 text-rose-700" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {unlockedDays.includes(21) && (
        <section className="animate-in fade-in pt-8">
          <Link 
            href="/day/21/reveal"
            className="block w-full text-center bg-sage-900 border-2 border-sage-700 hover:border-cream-300 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-cream-500/10 rounded-full blur-2xl group-hover:bg-cream-500/20 transition-all duration-500" />
            <h3 className="text-2xl font-serif text-cream-100 mb-3 group-hover:text-white transition-colors">
              View Your 21-Day Attachment Report
            </h3>
            <p className="text-sage-100/80 leading-relaxed text-sm max-w-2xl mx-auto">
              You've unlocked Day 21! Click here to see your Discovery Artifact—a unique synthesis of your somatic check-ins mapping your relational triggers and biological attachment styles.
            </p>
          </Link>
        </section>
      )}

      {/* Somatic Diary Section */}
      {Object.keys(checkins).length > 0 && (
        <section className="space-y-8 animate-in fade-in pt-16 border-t border-sage-300/30">
          <h2 className="text-3xl font-serif text-sage-900">Somatic Diary</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(checkins).reverse().map(([day, checkin]) => {
              if (!checkin.somaticEntry) return null;
              return (
                <div key={day} className="p-6 bg-white/60 backdrop-blur-sm rounded-3xl border border-sage-200 shadow-sm space-y-4">
                  <header className="flex items-center justify-between border-b border-sage-100 pb-3">
                    <span className="text-xs font-bold tracking-widest uppercase text-sage-900">Day {day}</span>
                    <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 bg-rose-100 text-rose-800 rounded-full">
                      {checkin.somaticEntry.section}
                    </span>
                  </header>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-sage-700 opacity-80">{checkin.somaticEntry.prompt}</p>
                    <p className="text-sage-900 leading-relaxed italic border-l-2 border-rose-300 pl-4">
                      "{checkin.somaticEntry.response}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
