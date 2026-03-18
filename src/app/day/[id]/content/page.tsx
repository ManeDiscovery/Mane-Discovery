'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import PracticeTimer from '@/components/PracticeTimer';
import DynamicExerciseSelector from '@/components/DynamicExerciseSelector';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { dailyLessons } from '@/data/lessons';

export default function ContentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const day = parseInt(id, 10);
  const { journals, checkins, saveJournal, saveExercise, unlockNextDay, currentDay } = useAppStore();
  
  const [journalEntry, setJournalEntry] = useState('');
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const isCompleted = currentDay > day;
  
  const lessonData = dailyLessons[day] || dailyLessons[21];

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
        Back to Check-in
      </Link>

      <header className="space-y-6 border-b border-sage-300/30 pb-10">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold tracking-widest text-rose-700 uppercase">Day {day}</h2>
          {isCompleted && <span className="bg-sage-100 text-sage-700 text-xs px-3 py-1 rounded-full border border-sage-300/50 font-semibold tracking-widest uppercase">Completed</span>}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-sage-900 tracking-tight leading-tight">{lessonData.title}</h1>
      </header>

      <section className="space-y-6 prose-sage max-w-none text-sage-900">
        <h3 className="text-2xl font-serif text-sage-900">The Lesson</h3>
        {lessonData.lessonText.map((paragraph, index) => (
          <p key={index} className={`leading-relaxed ${index === 0 ? 'text-xl text-sage-700' : 'text-lg text-sage-700/80'}`}>
            {paragraph}
          </p>
        ))}
      </section>

      <section className="space-y-6 pt-6">
        <h3 className="text-2xl font-serif text-sage-900">Journal Reflection</h3>
        <p className="text-lg text-sage-700">{lessonData.journalPrompt}</p>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Write your thoughts here... (autosaved locally)"
          className="w-full min-h-[160px] p-6 rounded-3xl border border-sage-300/50 bg-cream-500/30 text-sage-900 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-y transition-shadow shadow-inner"
        />
      </section>

      <section className="space-y-10 pt-10 pb-14 border-b border-sage-300/30">
        {checkins[day]?.somaticEntry ? (
          <DynamicExerciseSelector 
            sectionId={checkins[day].somaticEntry.sectionId} 
            stateLabel={checkins[day].somaticEntry.section} 
            onTimerComplete={(title, isHorseReflection) => {
              saveExercise(day, { title, isHorseReflection });
              setPracticeCompleted(true);
            }} 
          />
        ) : (
          <div className="text-center space-y-4 shadow-sm bg-white p-10 rounded-[3rem] border border-sage-100">
            <h3 className="text-2xl font-serif text-sage-900">Integration Practice</h3>
            <p className="text-lg text-sage-700 max-w-lg mx-auto mb-10">
              Spend the next 3 minutes sitting with the sensations in your body. Notice what arises without judgment or story.
            </p>
            <PracticeTimer onComplete={() => setPracticeCompleted(true)} />
          </div>
        )}
      </section>

      <div className="flex justify-center pt-4 pb-12">
        <button
          onClick={handleComplete}
          disabled={!practiceCompleted && !isCompleted}
          className={`
            flex items-center gap-3 px-12 py-5 rounded-full font-bold uppercase tracking-widest transition-all duration-500 shadow-md
            ${(practiceCompleted || isCompleted)
              ? 'bg-sage-900 text-cream-300 hover:bg-sage-700 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
              : 'bg-sage-300/40 text-sage-700/60 cursor-not-allowed'
            }
          `}
        >
          {isCompleted ? 'Update Journal' : 'Complete Day'}
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
