'use client';

import { useState } from 'react';
import { RingSelection, SomaticEntry } from '@/store/useAppStore';

const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const getPath = (cx: number, cy: number, rOut: number, rIn: number, startAngle: number, endAngle: number) => {
  const startOut = polarToCartesian(cx, cy, rOut, endAngle);
  const endOut = polarToCartesian(cx, cy, rOut, startAngle);
  const startIn = polarToCartesian(cx, cy, rIn, endAngle);
  const endIn = polarToCartesian(cx, cy, rIn, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', startOut.x, startOut.y,
    'A', rOut, rOut, 0, largeArcFlag, 0, endOut.x, endOut.y,
    'L', endIn.x, endIn.y,
    'A', rIn, rIn, 0, largeArcFlag, 1, startIn.x, startIn.y,
    'Z',
  ].join(' ');
};

const segments = [
  { id: 'stillness', label: 'Stillness', color: '#FDE047', start: -30, end: 30, prompt: 'What does this stillness feel like? (Calm, quiet, peaceful?)' },
  { id: 'play', label: 'Play', color: '#FB923C', start: 30, end: 90, prompt: 'How are you experiencing this energy? (Upbeat, lively, creative?)' },
  { id: 'hopeless', label: 'Hopeless', color: '#EF4444', start: 90, end: 150, prompt: 'What does this shutdown feel like? (Numb, heavy, burnt out?)' },
  { id: 'tension', label: 'Tension', color: '#D946EF', start: 150, end: 210, prompt: 'What does this tension feel like? (Tight, hot, buzzy?)' },
  { id: 'shame', label: 'Shame & Grief', color: '#3B82F6', start: 210, end: 270, prompt: 'How are you holding this sadness or hurt? (Ache, heaviness, tightness?)' },
  { id: 'safe', label: 'Safe & Connected', color: '#22C55E', start: 270, end: 330, prompt: 'How does safety show up in your body right now? (Warm, open, grounded?)' },
];

export default function ManeDiscoveryRing({ onSave }: { onSave: (data: RingSelection) => void }) {
  const [tension, setTension] = useState(5);
  const [ease, setEase] = useState(5);
  const [selectedSegment, setSelectedSegment] = useState<typeof segments[0] | null>(null);
  const [diaryResponse, setDiaryResponse] = useState('');
  
  const [relationalEnabled, setRelationalEnabled] = useState(false);
  const [relationalContext, setRelationalContext] = useState('');
  const [showWisdomModal, setShowWisdomModal] = useState(false);

  const cx = 100;
  const cy = 100;
  const rOut = 95;
  const rIn = 45;

  const getAttachmentPattern = () => {
    if (!selectedSegment) return undefined;
    if (['stillness', 'play', 'safe'].includes(selectedSegment.id)) return 'Secure Base';
    if (['tension'].includes(selectedSegment.id)) return 'Anxious-Preoccupied';
    return 'Dismissive-Avoidant';
  };

  const getHorseWisdom = () => {
    const pattern = getAttachmentPattern();
    if (pattern === 'Anxious-Preoccupied') {
      return 'Like a foal seeking its mother, your system is calling for connection. Practice the "Wall Push" to find your own edges and strength.';
    }
    if (pattern === 'Dismissive-Avoidant') {
      return 'Like a lone stallion protecting its space, you have learned to find safety in solitude. Practice "Orienting" to gently notice that safety can also exist in the environment around you.';
    }
    return 'Like a mare at rest in the herd, you are a safe harbor. Enjoy this grounded connection.';
  };

  const handleSaveClick = () => {
    if (relationalEnabled && relationalContext && selectedSegment) {
      setShowWisdomModal(true);
    } else {
      submitData();
    }
  };

  const submitData = () => {
    const attachmentPattern = relationalEnabled && relationalContext ? getAttachmentPattern() : undefined;
    onSave({ 
      tension, 
      ease, 
      relationalContext: relationalEnabled ? relationalContext : undefined,
      attachmentPattern,
      somaticEntry: selectedSegment ? {
        sectionId: selectedSegment.id,
        section: selectedSegment.label,
        prompt: selectedSegment.prompt,
        response: diaryResponse || '',
        relationalContext: relationalEnabled ? relationalContext : undefined,
        attachmentPattern
      } : undefined
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto p-8 bg-white/50 backdrop-blur-md rounded-3xl shadow-sm border border-sage-100 space-y-10 animate-in fade-in duration-700">
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-serif text-sage-900">Interactive Discovery Ring</h3>
        <p className="text-sm text-sage-700">Tap a section of the ring that matches how your body feels.</p>
      </div>

      <div className="relative w-72 h-72 md:w-80 md:h-80 select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          {segments.map((seg) => {
            const isSelected = selectedSegment?.id === seg.id;
            return (
              <path
                key={seg.id}
                d={getPath(cx, cy, isSelected ? rOut : rOut - 5, rIn, seg.start, seg.end)}
                fill={seg.color}
                className="cursor-pointer transition-all duration-300 outline-none"
                onClick={() => {
                  setSelectedSegment(seg);
                  if (selectedSegment?.id !== seg.id) setDiaryResponse('');
                }}
                style={{
                  opacity: selectedSegment ? (isSelected ? 1 : 0.4) : 0.85,
                  transformOrigin: '50% 50%',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
              />
            );
          })}
          <circle cx={cx} cy={cy} r={rIn - 2} fill="#FFF" className="shadow-inner" />
          <text x={cx} y={cy - 5} textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-bold uppercase tracking-widest" fill="#2E3B32">
            SELF
          </text>
          <text x={cx} y={cy + 8} textAnchor="middle" dominantBaseline="middle" className="text-[8px] uppercase tracking-widest opacity-60" fill="#2E3B32">
            (Core)
          </text>
        </svg>
      </div>

      <div className="w-full space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="flex justify-between text-xs font-semibold text-sage-900 uppercase tracking-widest">
              <span>Overall Tension</span>
              <span className="text-sage-500">{tension}</span>
            </label>
            <input 
              type="range" min="1" max="10" value={tension} onChange={(e) => setTension(Number(e.target.value))}
              className="w-full h-2 bg-sage-300 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
          <div className="space-y-4">
            <label className="flex justify-between text-xs font-semibold text-sage-900 uppercase tracking-widest">
              <span>Overall Ease</span>
              <span className="text-sage-500">{ease}</span>
            </label>
            <input 
              type="range" min="1" max="10" value={ease} onChange={(e) => setEase(Number(e.target.value))}
              className="w-full h-2 bg-sage-300 rounded-lg appearance-none cursor-pointer accent-sage-700"
            />
          </div>
        </div>

        {selectedSegment && (
          <div className="space-y-4 p-6 bg-cream-500/50 border border-sage-300/30 rounded-2xl animate-in slide-in-from-top-4 fade-in duration-500">
            <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-sm mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/${selectedSegment.id}_horse.png`} alt={selectedSegment.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex items-center gap-3 border-b border-sage-300/30 pb-3">
              <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: selectedSegment.color }} />
              <h4 className="font-bold text-sage-900 uppercase tracking-widest">{selectedSegment.label}</h4>
            </div>
            <label className="block text-sm font-medium text-sage-900 mt-2">
              {selectedSegment.prompt}
            </label>
            <textarea 
              value={diaryResponse}
              onChange={(e) => setDiaryResponse(e.target.value)}
              placeholder="Your Somatic Diary entry..."
              className="w-full p-4 rounded-xl border-2 border-transparent bg-white text-sage-900 placeholder:text-sage-700/40 focus:outline-none focus:border-rose-300 resize-none h-24 transition-all duration-300 shadow-inner"
            />
          </div>
        )}

        <div className="space-y-4 pt-4 border-t border-sage-300/30">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sage-900 tracking-widest uppercase text-sm">Relational Context</h4>
              <p className="text-xs text-sage-700 mt-1">Track interpersonal triggers in your system</p>
            </div>
            <button
              onClick={() => {
                setRelationalEnabled(!relationalEnabled);
                if (relationalEnabled) setRelationalContext('');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${relationalEnabled ? 'bg-sage-600' : 'bg-sage-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${relationalEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
          {relationalEnabled && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-medium text-sage-900 mb-2">
                Who is in your field (physically or mentally)?
              </label>
              <select
                value={relationalContext}
                onChange={(e) => setRelationalContext(e.target.value)}
                className="w-full p-4 rounded-xl border border-sage-300/50 bg-white text-sage-900 focus:outline-none focus:ring-2 focus:ring-rose-300 appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a connection...</option>
                <option value="Partner">Partner</option>
                <option value="Parent">Parent</option>
                <option value="Child">Child</option>
                <option value="Client">Client</option>
                <option value="Horse">Horse</option>
                <option value="Self">Self</option>
              </select>
            </div>
          )}
        </div>

        <button 
          onClick={handleSaveClick}
          className="w-full py-4 mt-4 bg-sage-900 text-cream-300 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-700 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {selectedSegment ? 'Log Check-in & Entry' : 'Log Check-in'}
        </button>
      </div>

      {showWisdomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sage-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-cream-100 rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-500">
            <h3 className="text-2xl font-serif text-sage-900 mb-2">Horse Wisdom</h3>
            <div className="inline-block bg-rose-200/50 text-rose-900 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-rose-300/50">
              {getAttachmentPattern()}
            </div>
            <p className="text-sage-700 leading-relaxed text-lg mb-8">
              {getHorseWisdom()}
            </p>
            <button 
              onClick={() => {
                setShowWisdomModal(false);
                submitData();
              }}
              className="w-full py-4 bg-sage-900 text-cream-300 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-700 transition-all shadow-md"
            >
              Continue to Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
