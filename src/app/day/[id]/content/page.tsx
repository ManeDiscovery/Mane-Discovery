'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import PracticeTimer from '@/components/PracticeTimer';
import ManeDiscoveryRing from '@/components/ManeDiscoveryRing';
import Link from 'next/link';
import Image from 'next/image';
import DynamicExerciseSelector from '@/components/DynamicExerciseSelector';
import { ArrowLeft, CheckCircle, ChevronRight, Wind } from 'lucide-react';
import { dailyLessons } from '@/data/lessons';

export default function ContentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const day = parseInt(id, 10);
  const { journals, checkins, saveJournal, saveCheckin, unlockNextDay, currentDay } = useAppStore();
  
  const [journalEntry, setJournalEntry] = useState('');
  const [step, setStep] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [postCheckinCompleted, setPostCheckinCompleted] = useState(false);
  
  const isCompleted = currentDay > day;
  const lessonData = dailyLessons[day] || dailyLessons[21];
  const preCheckin = checkins[day];

  const getDynamicHerdInsight = () => {
    if (!preCheckin?.somaticEntry?.sectionId) return lessonData.herdInsight;
    
    let baseWisdom = '';
    switch(preCheckin.somaticEntry.sectionId) {
      case 'stillness': baseWisdom = "Like a resting horse, you've found a quiet, steady rhythm. Enjoy this peaceful awareness."; break;
      case 'play': baseWisdom = "Like horses galloping in an open pasture, your system is full of joyful, creative energy."; break;
      case 'hopeless': baseWisdom = "Like a horse conserving energy in a harsh winter, your biology has pulled back to protect you. It's okay to rest here."; break;
      case 'tension': baseWisdom = "Like a sentinel horse with ears pinned forward, your system is highly vigilant and running hot to keep you safe."; break;
      case 'shame': baseWisdom = "Your system has tucked itself away to process heavy emotion, taking shelter from the herd. Treat yourself with deep compassion."; break;
      case 'safe': baseWisdom = "Like a lead mare resting with her herd, you feel securely anchored, open, and connected."; break;
      default: return lessonData.herdInsight;
    }
    return `${baseWisdom} Today's lesson, "${lessonData.title}", and the "${lessonData.practice.title}" practice will help you honor and integrate this state.`;
  };

  useEffect(() => {
    if (journals[day]) {
      setJournalEntry(journals[day]);
    }
  }, [day, journals]);

  const handleComplete = () => {
    saveJournal(day, journalEntry);
    if (!isCompleted) {
      unlockNextDay();
    }
    router.push('/');
  };

  return (
    <div className="w-full max-w-3xl px-6 py-12 mx-auto space-y-16 pb-24 animate-in fade-in duration-700">
      <Link href={`/day/${day}/checkin`} className="inline-flex items-center text-sage-500 hover:text-sage-900 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Pre-Check-in
      </Link>

      <header className="space-y-6 border-b border-sage-300/30 pb-10">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold tracking-widest text-rose-700 uppercase">Day {day}</h2>
          {isCompleted && <span className="bg-sage-100 text-sage-700 text-xs px-3 py-1 rounded-full border border-sage-300/50 font-semibold tracking-widest uppercase">Completed</span>}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-sage-900 tracking-tight leading-tight">{lessonData.title}</h1>
      </header>

      {/* STEP 0: PRE-CHECK-IN REVIEW */}
      {step === 0 && (
        <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-8">
          <div className="bg-sage-900 text-cream-50 rounded-3xl p-8 shadow-lg relative overflow-hidden">
            {preCheckin?.somaticEntry && (
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-60 pointer-events-none fade-in">
                <Image 
                  src={`/${preCheckin.somaticEntry.sectionId}_horse.png`}
                  alt="Horse State Reflection"
                  fill
                  className="object-cover object-center [mask-image:linear-gradient(to_right,transparent,black)]"
                />
              </div>
            )}
            <div className="relative z-10">
              <h3 className="text-xs font-bold tracking-widest uppercase text-sage-400 mb-6">Pre-Lesson State</h3>
            {preCheckin?.somaticEntry ? (
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-serif text-rose-200">{preCheckin.somaticEntry.section}</span>
                </div>
                {preCheckin.attachmentPattern && (
                  <p className="text-sm text-sage-300">
                    Relational Field: <span className="text-cream-50 font-medium">{preCheckin.attachmentPattern}</span>
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sage-700/50 mt-4">
                  <div>
                    <span className="text-xs text-sage-400 uppercase tracking-widest block mb-1">Tension</span>
                    <span className="text-lg font-medium">{preCheckin.tension}/10</span>
                  </div>
                  <div>
                    <span className="text-xs text-sage-400 uppercase tracking-widest block mb-1">Ease</span>
                    <span className="text-lg font-medium">{preCheckin.ease}/10</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sage-300 italic">No check-in recorded for today yet.</p>
            )}
            </div>
          </div>
          <button 
            onClick={() => setStep(1)}
            className="w-full py-5 bg-cream-200 text-sage-900 rounded-2xl font-bold uppercase tracking-widest hover:bg-cream-300 transition-all flex items-center justify-center group"
          >
            Begin Lesson <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* STEP 1: THE LESSON & INSIGHT */}
      {step === 1 && (
        <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-12">
          
          {/* Herd Insight Callout */}
          <div className="bg-amber-50 border border-amber-200/60 rounded-3xl p-8 relative overflow-hidden">
            <Wind className="absolute -top-4 -right-4 w-32 h-32 text-amber-900/5" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-amber-800 mb-4 relative z-10">Horse Wisdom Insight</h3>
            <p className="text-amber-950/80 leading-relaxed font-medium relative z-10 italic">"{getDynamicHerdInsight()}"</p>
          </div>

          <section className="space-y-6 prose-sage max-w-none text-sage-900">
            {lessonData.lessonText.map((paragraph, index) => (
              <p key={index} className={`leading-relaxed ${index === 0 ? 'text-xl text-sage-800' : 'text-lg text-sage-700/80'}`}>
                {paragraph}
              </p>
            ))}
          </section>

          <section className="space-y-6 pt-6 border-t border-sage-300/30">
            <h3 className="text-2xl font-serif text-sage-900">Journal Reflection</h3>
            <p className="text-lg text-sage-700">{lessonData.journalPrompt}</p>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Write your thoughts here... (autosaved locally)"
              className="w-full min-h-[160px] p-6 rounded-3xl border border-sage-300/50 bg-cream-500/30 text-sage-900 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-y transition-shadow shadow-inner"
            />
          </section>

          <button 
            onClick={() => setStep(2)}
            className="w-full py-5 bg-sage-900 text-cream-50 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-800 transition-all flex items-center justify-center group"
          >
            Continue to Somatic Practice <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* STEP 2: PRACTICE & POST CHECK-IN */}
      {step === 2 && (
        <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-12">
          
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-serif text-sage-900">Daily Integration Practice</h3>
            <p className="text-sage-700 max-w-md mx-auto mb-8">
              Anchor today's lesson into your nervous system through somatic expression.
            </p>
            {preCheckin?.somaticEntry ? (
              <DynamicExerciseSelector
                sectionId={preCheckin.somaticEntry.sectionId}
                stateLabel={preCheckin.somaticEntry.section}
                dailyPractice={lessonData.practice}
                onTimerComplete={() => setPracticeCompleted(true)}
              />
            ) : (
              <PracticeTimer 
                practice={lessonData.practice} 
                onComplete={() => setPracticeCompleted(true)} 
              />
            )}
          </div>

          {practiceCompleted && !postCheckinCompleted && (
            <div className="animate-in fade-in slide-in-from-top-8 duration-700 pt-12 border-t border-sage-300/30">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-serif text-sage-900">Post-Practice Check-in</h3>
                <p className="text-sage-700">Notice how your body feels after completing the practice.</p>
              </div>
              <ManeDiscoveryRing day={day} onSave={(data) => {
                // We overwrite the day's check-in with the final state, or we could save it separately.
                // For simplicity, we just save the final regulated state.
                saveCheckin(day, data);
                setPostCheckinCompleted(true);
              }} />
            </div>
          )}

          {(postCheckinCompleted || (isCompleted && practiceCompleted)) && (
            <div className="flex justify-center pt-8 animate-in fade-in duration-500">
              <button
                onClick={handleComplete}
                className="flex items-center gap-3 px-12 py-5 rounded-full font-bold uppercase tracking-widest bg-sage-900 text-cream-300 hover:bg-sage-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-md cursor-pointer"
              >
                {isCompleted ? 'Update Journal' : 'Complete Day'}
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
