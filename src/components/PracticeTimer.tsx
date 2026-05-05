'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';
import { DailyPractice } from '@/data/lessons';

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (e) {
    console.log("Audio init failed", e);
  }
};

let silentOsc: OscillatorNode | null = null;
let silentGain: GainNode | null = null;

const startBackgroundAudio = () => {
  if (!audioCtx) return;
  try {
    if (!silentOsc) {
      silentOsc = audioCtx.createOscillator();
      silentGain = audioCtx.createGain();
      silentOsc.type = 'sine';
      silentOsc.frequency.value = 440;
      silentGain.gain.value = 0.0001; // barely audible
      silentOsc.connect(silentGain);
      silentGain.connect(audioCtx.destination);
      silentOsc.start();
    }
  } catch(e) {
    console.log('Background audio failed', e);
  }
};

const stopBackgroundAudio = () => {
  if (silentOsc) {
    try {
      silentOsc.stop();
      silentOsc.disconnect();
      silentGain?.disconnect();
    } catch(e) {}
    silentOsc = null;
    silentGain = null;
  }
};

const playChime = () => {
  try {
    if (!audioCtx) return;
    const ctx = audioCtx;
    
    const playTone = (freq: number, type: OscillatorType, duration: number, vol: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    };

    // A nice soothing bell-like chime (C major chord variations)
    playTone(523.25, 'sine', 3, 0.4); // C5
    playTone(659.25, 'sine', 2.5, 0.2); // E5
    playTone(783.99, 'sine', 2, 0.1); // G5
  } catch (e) {
    console.log("Audio API not supported", e);
  }
};

interface PracticeTimerProps {
  onComplete: () => void;
  practice?: DailyPractice;
}

export default function PracticeTimer({ onComplete, practice }: PracticeTimerProps) {
  const initialTime = practice ? practice.durationMinutes * 60 : 180;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [endTime, setEndTime] = useState<number | null>(null);
  const wakeLockRef = useRef<any>(null);

  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
      }
    } catch (err) {
      console.log(`Wake Lock error: ${err}`);
    }
  };

  const releaseWakeLock = () => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release().catch(console.error);
      wakeLockRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      releaseWakeLock();
      stopBackgroundAudio();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isActive && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive]);

  useEffect(() => {
    setTimeLeft(initialTime);
    setIsActive(false);
    setIsFinished(false);
    setEndTime(null);
  }, [initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && endTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
        setTimeLeft(remaining);
        
        if (remaining === 0) {
          setIsActive(false);
          setIsFinished(true);
          setEndTime(null);
          releaseWakeLock();
          stopBackgroundAudio();
          playChime();
          onComplete();
        }
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, endTime, onComplete]);

  const toggle = () => {
    if (!isActive) {
      initAudio();
      startBackgroundAudio();
      setEndTime(Date.now() + timeLeft * 1000);
      setIsActive(true);
      requestWakeLock();
    } else {
      setIsActive(false);
      setEndTime(null);
      stopBackgroundAudio();
      releaseWakeLock();
    }
  };

  const reset = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(initialTime);
    setEndTime(null);
    stopBackgroundAudio();
    releaseWakeLock();
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progressPercent = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-sage-100 rounded-[2.5rem] shadow-sm border border-sage-300/30 max-w-md mx-auto relative overflow-hidden group">
      
      {/* Background decoration ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[0.5px] border-sage-500/20 rounded-full transition-transform duration-1000 group-hover:scale-105" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[0.5px] border-sage-500/10 rounded-full transition-transform duration-1000 group-hover:scale-110" />

      {/* Dynamic Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-rose-300 transition-all duration-1000 ease-linear" style={{ width: `${progressPercent}%` }} />
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-sage-300/30" />

      {practice && (
        <div className="z-10 text-center mb-6">
          <h4 className="font-serif text-xl text-sage-900 mb-2">{practice.title}</h4>
          <p className="text-sm text-sage-700 max-w-[250px] mx-auto leading-relaxed">{practice.description}</p>
        </div>
      )}

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
