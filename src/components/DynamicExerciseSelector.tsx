'use client';

import { useState } from 'react';
import PracticeTimer from '@/components/PracticeTimer';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface PracticeData {
  title: string;
  durationMinutes: number;
  description: string;
}

const exercises: Record<string, { a: { title: string, desc: string }, b: { title: string, desc: string }, c: { title: string, desc: string, image: string } }> = {
  'stillness': {
    a: { title: 'The Soft Gaze', desc: 'Observe your surroundings and find three things that bring you a sense of peace.' },
    b: { title: 'Gratitude Expansion', desc: 'Place your hands on your heart and breathe into the feeling of a recent moment of connection.' },
    c: { title: 'The Grazing Herd', desc: 'Picture a herd of horses grazing peacefully. Notice how their calm state is contagious. Breathe into that sense of shared safety and stillness.', image: '/stillness_horse.png' }
  },
  'play': {
    a: { title: 'Joyful Shake', desc: 'Gently shake your hands and feet to celebrate the energy moving through you.' },
    b: { title: 'Mirroring Life', desc: 'Move your body like a horse in a field, finding fluid, expressive movement.' },
    c: { title: 'The Spirited Canter', desc: 'Visualize a horse galloping freely. Feel that same lively, creative energy sparking in your own body, ready to be expressed.', image: '/play_horse.png' }
  },
  'hopeless': {
    a: { title: 'Gentle Orienting', desc: 'Slowly name 3 colors you see in the room to signal safety to your brain.' },
    b: { title: 'The Humming Reset', desc: "Inhale deeply and exhale with a low 'Voo' sound to vibrate the vagus nerve." },
    c: { title: 'Standing Guard', desc: 'Horses can rest while standing, maintaining a low-level awareness. Imagine that quiet, protective presence within you, offering safety even when you feel numb.', image: '/hopeless_horse.png' }
  },
  'tension': {
    a: { title: 'Wall Push', desc: 'Stand and push against a wall with all your strength for 10 seconds, then release and feel the tension leave.' },
    b: { title: 'Lengthened Exhale', desc: "Inhale for a count of 4, and exhale for a count of 8 to signal the 'braking system' of your body." },
    c: { title: 'The Ear Swivel', desc: "A horse uses its ears to track sound and orient to its environment. As you inhale, imagine your senses 'swiveling' to find one pleasant or neutral thing to focus on, signaling a shift toward safety.", image: '/tension_horse.png' }
  },
  'overwhelm': {
    a: { title: 'Weight of the Earth', desc: 'Sit on the floor and focus entirely on the feeling of the ground supporting your full weight.' },
    b: { title: 'Cold Water Splash', desc: 'Splash cold water on your face or hold an ice cube to rapidly shift the nervous system.' },
    c: { title: 'Find the Lead Horse', desc: 'In a moment of panic, a herd looks to a calm, confident leader. Picture that lead horse now, its grounded presence acting as your anchor. Focus on its steady breath until your own begins to match it.', image: '/overwhelm_horse.png' }
  },
  'safe': {
    a: { title: 'The Soft Gaze', desc: 'Observe your surroundings and find three things that bring you a sense of peace.' },
    b: { title: 'Gratitude Expansion', desc: 'Place your hands on your heart and breathe into the feeling of a recent moment of connection.' },
    c: { title: 'The Grazing Herd', desc: 'Picture a herd of horses grazing peacefully. Notice how their calm state is contagious. Breathe into that sense of shared safety and stillness.', image: '/safe_horse.png' }
  },
  'shame': {
    a: { title: 'The Self-Hug', desc: 'Cross your arms and give yourself a firm, loving squeeze to provide the containment your body needs.' },
    b: { title: 'Breath Softening', desc: 'Imagine your breath like a warm blanket wrapping around the area in your body that feels heavy.' },
    c: { title: 'Herd Connection', desc: "Horses don't isolate their wounded. They move closer, offering presence without demanding anything. Imagine your body is being gently held and supported by a wise, non-judgmental herd. Allow yourself to receive that comfort.", image: '/shame_horse.png' }
  }
};

interface DynamicExerciseSelectorProps {
  sectionId: string;
  stateLabel: string;
  onTimerComplete: (exerciseTitle: string, isHorseReflection: boolean) => void;
  dailyPractice?: PracticeData;
}

export default function DynamicExerciseSelector({ sectionId, stateLabel, onTimerComplete, dailyPractice }: DynamicExerciseSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<'a' | 'b' | 'c' | null>(null);

  const baseOptions = exercises[sectionId] || exercises['safe'];
  const options = {
    a: dailyPractice ? { title: `Today's Lesson: ${dailyPractice.title}`, desc: dailyPractice.description, durationMinutes: dailyPractice.durationMinutes } : baseOptions.a,
    b: baseOptions.b,
    c: baseOptions.c
  };

  if (!selectedOption) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h3 className="text-2xl font-serif text-sage-900 text-center">Your Personalized Integration</h3>
        <p className="text-center text-sage-700 pb-4 border-b border-sage-300/30">
          Based on your check-in state of <strong className="text-rose-700">{stateLabel}</strong>, please select one of the following 3-minute somatic exercises:
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 mt-4">
          <button 
            onClick={() => setSelectedOption('a')}
            className="flex flex-col text-left p-6 sm:p-8 bg-white/60 hover:bg-white border-2 border-sage-100 hover:border-rose-300 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-rose-500 mb-2 group-hover:text-rose-700">Option A</span>
            <h4 className="text-xl font-serif text-sage-900 mb-3">{options.a.title}</h4>
            <p className="text-sage-700 leading-relaxed text-sm">{options.a.desc}</p>
          </button>

          <button 
            onClick={() => setSelectedOption('b')}
            className="flex flex-col text-left p-6 sm:p-8 bg-white/60 hover:bg-white border-2 border-sage-100 hover:border-sage-300 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-sage-500 mb-2 group-hover:text-sage-700">Option B</span>
            <h4 className="text-xl font-serif text-sage-900 mb-3">{options.b.title}</h4>
            <p className="text-sage-700 leading-relaxed text-sm">{options.b.desc}</p>
          </button>

          <button 
            onClick={() => setSelectedOption('c')}
            className="md:col-span-2 flex flex-col md:flex-row text-left bg-sage-900 border-2 border-sage-700 hover:border-cream-300 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
          >
            <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
              <Image 
                src={options.c.image} 
                alt="Horse Reflection" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-sage-900 via-sage-900/40 to-transparent" />
            </div>

            <div className="p-6 sm:p-8 md:w-2/3 relative z-10 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-widest uppercase text-sage-300 mb-2 flex items-center gap-3">
                Option C
                <span className="bg-rose-900/50 text-rose-200 px-3 py-1 rounded-full text-[10px] shadow-sm border border-rose-800/50">
                  Horse Reflection
                </span>
              </span>
              <h4 className="text-2xl font-serif text-cream-100 mb-3">{options.c.title}</h4>
              <p className="text-sage-100/80 leading-relaxed text-sm max-w-xl">{options.c.desc}</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  const activeExercise = options[selectedOption];
  const practiceObj = {
    title: activeExercise.title,
    description: activeExercise.desc,
    durationMinutes: (activeExercise as any).durationMinutes || 3
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
      <button 
        onClick={() => setSelectedOption(null)}
        className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-sage-500 hover:text-rose-500 transition-colors"
      >
        <ArrowLeft className="w-3 h-3 mr-2" />
        Choose a different exercise
      </button>

      <PracticeTimer 
        practice={practiceObj} 
        onComplete={() => onTimerComplete(activeExercise.title, selectedOption === 'c')} 
      />
    </div>
  );
}
