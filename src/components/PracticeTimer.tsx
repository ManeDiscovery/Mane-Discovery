'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';

export default function PracticeTimer({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isFinished) {
      setIsActive(false);
      setIsFinished(true);
      onComplete();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onComplete, isFinished]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(180);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progressPercent = ((180 - timeLeft) / 180) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-sage-100 rounded-[2.5rem] shadow-sm border border-sage-300/30 max-w-md mx-auto relative overflow-hidden group">
      
      {/* Background decoration ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[0.5px] border-sage-500/20 rounded-full transition-transform duration-1000 group-hover:scale-105" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[0.5px] border-sage-500/10 rounded-full transition-transform duration-1000 group-hover:scale-110" />

      {/* Dynamic Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-rose-300 transition-all duration-1000 ease-linear" style={{ width: `${progressPercent}%` }} />
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-sage-300/30" />

      <div className={`text-7xl font-sans font-light tracking-tight mb-10 z-10 transition-colors duration-500 ${isFinished ? 'text-rose-500' : 'text-sage-900'}`}>
        {mins}:{secs.toString().padStart(2, '0')}
      </div>
      
      <div className="flex gap-4 z-10 w-full">
        {isFinished ? (
           <div className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-sage-300 text-sage-900 rounded-full font-bold uppercase tracking-widest text-sm">
             <Check className="w-5 h-5" /> Completed
           </div>
        ) : (
          <button
            onClick={toggle}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 ${
              isActive 
                ? 'bg-rose-100 text-rose-900 ring-2 ring-rose-300 ring-offset-2 ring-offset-sage-100'
                : 'bg-sage-900 text-cream-300 hover:bg-sage-700'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            {isActive ? 'Pause' : 'Start'}
          </button>
        )}
        
        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-white/50 hover:bg-white text-sage-900 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
