'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';
import PracticeTimer from '@/components/PracticeTimer';
import { ChevronRight, ArrowRight, ShieldAlert, Sparkles, HeartHandshake, Zap, Activity } from 'lucide-react';
import Link from 'next/link';

export default function SOSProtocol() {
  const router = useRouter();
  const { saveLedgerEntry } = useAppStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    glimmer1: '', glimmer2: '', glimmer3: '',
    anchor: '',
    limitingBelief: '',
    protector: '', youngerSelf: '',
    newBelief: '',
    microPromise: ''
  });

  const updateForm = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinish = () => {
    // Save to ledger utilizing today's date string as the ID
    const todayStr = new Date().toISOString().split('T')[0];
    saveLedgerEntry(todayStr, {
      promise: formData.microPromise,
      glimmers: [formData.glimmer1, formData.glimmer2, formData.glimmer3].filter(Boolean),
    });
    router.push('/ledger');
  };

  return (
    <div className="w-full max-w-2xl px-6 py-20 mx-auto min-h-[90vh] flex flex-col pt-12 pb-32">
      
      <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-amber-100 text-amber-600 rounded-full mb-4 shadow-inner">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-sage-900 mb-2">The Somatic SOS</h1>
        <p className="text-sage-700">A 5-step rapid cycle to dismantle self-sabotage using the Mane Discovery Method.</p>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mt-6 max-w-sm mx-auto">
          {[1,2,3,4,5].map(num => (
            <div key={num} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= num ? 'bg-amber-400' : 'bg-sage-200'}`} />
          ))}
        </div>
      </header>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
            <h2 className="text-2xl font-serif text-sage-900 border-b border-sage-200 pb-4 flex items-center gap-3">
              <span className="text-amber-500">1. Arrive</span> (Container & Safety)
            </h2>
            <p className="text-sage-700">Before attempting to shift a belief, we must establish a container of safety in the body.</p>
            
            <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-sage-100">
              <label className="block text-sm font-bold tracking-widest uppercase text-sage-900">Name 3 neutral or pleasant things you see right now (Glimmers)</label>
              <input value={formData.glimmer1} onChange={e => updateForm('glimmer1', e.target.value)} placeholder="1. E.g. The sunlight on the floor..." className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:border-amber-300" />
              <input value={formData.glimmer2} onChange={e => updateForm('glimmer2', e.target.value)} placeholder="2. " className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:border-amber-300" />
              <input value={formData.glimmer3} onChange={e => updateForm('glimmer3', e.target.value)} placeholder="3. " className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:border-amber-300" />
            </div>

            <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-sage-100">
              <label className="block text-sm font-bold tracking-widest uppercase text-sage-900">Choose a Physical Anchor</label>
              <p className="text-xs text-sage-600 mb-2">Connect deeply with something tangible (e.g. feet flat on the ground, leaning back fully into the chair).</p>
              <input value={formData.anchor} onChange={e => updateForm('anchor', e.target.value)} placeholder="My anchor is..." className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:border-amber-300" />
            </div>

            <button onClick={() => setStep(2)} disabled={!formData.glimmer1 || !formData.anchor} className="w-full py-5 bg-amber-500 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors disabled:opacity-50 flex justify-center items-center">
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
            <h2 className="text-2xl font-serif text-sage-900 border-b border-sage-200 pb-4 flex items-center gap-3">
              <span className="text-amber-500">2. Notice</span> (Identify Misalignment)
            </h2>
            <p className="text-sage-700">Track the micro-signals in your body. Notice the tension, then identify exactly what limiting narrative is driving it.</p>
            
            <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-sage-100">
              <label className="block text-sm font-bold tracking-widest uppercase text-sage-900">Name the Misalignment</label>
              <p className="text-xs text-sage-600 mb-2">What limiting belief about yourself, the outcome, or your capacity is currently running the show?</p>
              <textarea 
                value={formData.limitingBelief} 
                onChange={e => updateForm('limitingBelief', e.target.value)} 
                placeholder="I am believing that..." 
                className="w-full p-4 rounded-xl border-2 border-sage-200 bg-cream-50 focus:outline-none focus:border-rose-300 h-32 resize-none" 
              />
            </div>

            <button onClick={() => setStep(3)} disabled={!formData.limitingBelief} className="w-full py-5 bg-sage-900 text-cream-50 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors disabled:opacity-50 flex justify-center items-center">
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
            <h2 className="text-2xl font-serif text-sage-900 border-b border-sage-200 pb-4 flex items-center gap-3">
              <span className="text-amber-500">3. Relate</span> (Parts Inquiry)
            </h2>
            <p className="text-sage-700">Self-sabotage is just a misguided mechanism for safety. Let's communicate with the parts of you trying to keep you safe.</p>
            
            <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-sage-100">
              <label className="block text-sm font-bold tracking-widest uppercase text-sage-900">The Protector</label>
              <p className="text-xs text-sage-600 mb-2">If the tension in your body had a voice, what is it trying to prevent from happening?</p>
              <input value={formData.protector} onChange={e => updateForm('protector', e.target.value)} placeholder="It is trying to prevent..." className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:border-sage-400" />
            </div>

            <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-sage-100">
              <label className="block text-sm font-bold tracking-widest uppercase text-sage-900">The Younger Self</label>
              <p className="text-xs text-sage-600 mb-2">What does the younger version of you inside this tension actually need to hear right now?</p>
              <input value={formData.youngerSelf} onChange={e => updateForm('youngerSelf', e.target.value)} placeholder="I need to hear that..." className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:border-sage-400" />
            </div>

            <button onClick={() => setStep(4)} disabled={!formData.protector || !formData.youngerSelf} className="w-full py-5 bg-sage-900 text-cream-50 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors disabled:opacity-50 flex justify-center items-center">
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
            <h2 className="text-2xl font-serif text-sage-900 border-b border-sage-200 pb-4 flex items-center gap-3">
              <span className="text-amber-500">4. Choose</span> (Rewiring)
            </h2>
            <p className="text-sage-700">We must overwrite the old biological association with a grounded, supportive truth.</p>
            
            <div className="space-y-4 bg-white p-6 rounded-3xl shadow-sm border border-rose-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 pointer-events-none" />
              <label className="relative z-10 block text-sm font-bold tracking-widest uppercase text-rose-800 mb-2">Re-script in the body</label>
              
              <div className="relative z-10 p-4 bg-cream-100 rounded-xl line-through text-sage-400 text-sm mb-4">
                "{formData.limitingBelief}"
              </div>

              <textarea 
                value={formData.newBelief} 
                onChange={e => updateForm('newBelief', e.target.value)} 
                placeholder="Write your new empowering alignment here..." 
                className="relative z-10 w-full p-4 rounded-xl border-2 border-rose-300 bg-white focus:outline-none focus:border-rose-500 text-sage-900 h-24 resize-none shadow-inner" 
              />
            </div>

            <div className="pt-4">
              <PracticeTimer 
                practice={{ 
                  title: "Somatic Resourcing", 
                  durationMinutes: 2, 
                  description: "Repeat your new belief silently while extending your exhale or humming gently to wire it into the ventral vagal state." 
                }} 
                onComplete={() => {}} 
              />
            </div>

            <button onClick={() => setStep(5)} disabled={!formData.newBelief} className="w-full py-5 bg-sage-900 text-cream-50 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors disabled:opacity-50 flex justify-center items-center mt-6">
              Continue to Final Step <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
            <h2 className="text-2xl font-serif text-sage-900 border-b border-sage-200 pb-4 flex items-center gap-3">
              <span className="text-amber-500">5. Become</span> (Self-Trust)
            </h2>
            <p className="text-sage-700">Self-trust is built through reliable follow-through over time. Let's cement this shift with a tiny promise.</p>

            <div className="space-y-4 bg-white p-6 rounded-3xl shadow-md border-2 border-sage-200">
              <label className="block text-sm font-bold tracking-widest uppercase text-sage-900">Your Self-Trust Ledger</label>
              <p className="text-xs text-sage-600 mb-4">Based on your new belief, what is <strong className="text-rose-600">one daily micro-promise</strong> you can make to yourself today that is 95% doable?</p>
              
              <div className="flex gap-4 items-start">
                <HeartHandshake className="w-6 h-6 text-rose-400 flex-shrink-0 mt-3" />
                <textarea 
                  value={formData.microPromise} 
                  onChange={e => updateForm('microPromise', e.target.value)} 
                  placeholder="Today, I promise myself I will..." 
                  className="w-full p-4 rounded-xl border border-sage-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-rose-300 h-24 resize-none" 
                />
              </div>
            </div>

            <div className="bg-sage-100 text-sage-800 p-6 rounded-3xl text-sm leading-relaxed border border-sage-200">
              <strong className="block text-sage-900 mb-2 uppercase tracking-widest text-xs">Act of Triumph (Optional)</strong>
              Before clicking complete, physicalize this ending. Complete a previously blocked impulse: stretch your arms wide, take a deep fulfilling breath, or stand up fully tall.
            </div>

            <button onClick={handleFinish} disabled={!formData.microPromise} className="w-full py-5 bg-rose-500 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-rose-600 shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 flex justify-center items-center group">
              Cement it into your Ledger <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
