'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { BookHeart, CheckCircle, XCircle, HeartHandshake, ShieldAlert, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

export default function LedgerPage() {
  const { ledgerEntries, saveLedgerEntry } = useAppStore();
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysEntry = ledgerEntries[todayStr];
  
  const [localRepair, setLocalRepair] = useState(todaysEntry?.repairPlan || '');

  const handleCompleteToggle = (completed: boolean) => {
    saveLedgerEntry(todayStr, { completed });
  };

  const handleSaveRepair = () => {
    saveLedgerEntry(todayStr, { repairPlan: localRepair, completed: true }); // Repair counts as completion!
  };

  const sortedEntries = Object.entries(ledgerEntries).sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <div className="w-full max-w-3xl px-6 py-20 mx-auto min-h-[90vh] flex flex-col pt-12 pb-32">
      
      <header className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="inline-flex items-center justify-center p-4 bg-rose-100 text-rose-600 rounded-full mb-4 shadow-inner">
          <BookHeart className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-sage-900 mb-2">Self-Trust Ledger</h1>
        <p className="text-sage-700 max-w-xl mx-auto">
          Self-trust is not built by never failing. It is built by making tiny, 95%-doable promises and repairing compassionately when we miss them.
        </p>
      </header>

      {!todaysEntry ? (
        <div className="bg-white/60 backdrop-blur-sm p-10 rounded-[3rem] border border-sage-200 text-center shadow-sm animate-in zoom-in-95 duration-500 mb-12">
          <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-serif text-sage-900 mb-2">No active micro-promise today</h2>
          <p className="text-sage-700 mb-6">You haven't established your micro-promise for today yet.</p>
          <Link href="/sos" className="inline-flex items-center px-8 py-4 bg-sage-900 text-cream-50 rounded-full font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors shadow-lg">
            Start SOS Rewire Protocol
          </Link>
        </div>
      ) : (
        <div className="bg-sage-900 text-cream-50 p-8 rounded-[2rem] shadow-xl mb-12 animate-in slide-in-from-bottom-8 duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-300/10 rounded-full blur-3xl -mr-10 -mt-10" />
          
          <h2 className="text-xs font-bold tracking-widest uppercase text-sage-400 mb-6 inline-flex items-center">
            <BadgeCheck className="w-4 h-4 mr-2" /> Today's Micro-Promise
          </h2>
          
          <p className="text-2xl font-serif text-cream-100 mb-8 leading-relaxed">
            "{todaysEntry.promise}"
          </p>

          {todaysEntry.completed === undefined && (
            <div className="space-y-4">
              <p className="text-sm text-sage-300 mb-3">Did you execute your micro-promise today?</p>
              <div className="flex gap-4">
                <button onClick={() => handleCompleteToggle(true)} className="flex-1 py-4 bg-sage-800 border border-sage-600 rounded-xl font-bold uppercase tracking-widest hover:bg-sage-700 transition-all flex items-center justify-center text-cream-100 group">
                  <CheckCircle className="w-5 h-5 mr-2 text-sage-400 group-hover:text-green-400 transition-colors" /> Yes
                </button>
                <button onClick={() => handleCompleteToggle(false)} className="flex-1 py-4 bg-sage-800 border border-sage-600 rounded-xl font-bold uppercase tracking-widest hover:bg-sage-700 transition-all flex items-center justify-center text-sage-300 group">
                  <XCircle className="w-5 h-5 mr-2 text-sage-500 group-hover:text-rose-400 transition-colors" /> No
                </button>
              </div>
            </div>
          )}

          {todaysEntry.completed === false && !todaysEntry.repairPlan && (
            <div className="mt-8 pt-8 border-t border-sage-700 animate-in fade-in duration-500">
              <h3 className="text-xl font-serif text-rose-200 mb-2 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5" /> Compassionate Repair
              </h3>
              <p className="text-sage-300 text-sm mb-4">
                Missing a promise is just data. What does your younger self need right now? How can we softly repair this without shame?
              </p>
              <textarea 
                value={localRepair} 
                onChange={(e) => setLocalRepair(e.target.value)} 
                placeholder="I am repairing this by..." 
                className="w-full p-4 rounded-xl border border-sage-600 bg-sage-800 focus:outline-none focus:ring-2 focus:ring-rose-300 h-24 resize-none mb-4 text-cream-50" 
              />
              <button onClick={handleSaveRepair} disabled={!localRepair} className="w-full py-4 bg-rose-200 text-sage-900 rounded-xl font-bold uppercase tracking-widest hover:bg-rose-300 transition-colors disabled:opacity-50">
                Log Repair & Restore Trust
              </button>
            </div>
          )}

          {(todaysEntry.completed === true || todaysEntry.repairPlan) && (
            <div className="mt-8 pt-6 border-t border-sage-700 flex items-center text-cream-200 animate-in fade-in duration-500">
              <CheckCircle className="w-6 h-6 text-emerald-400 mr-3 flex-shrink-0" />
              <p className="text-sm">
                {todaysEntry.repairPlan 
                  ? "Repair logged. Accountability restored." 
                  : "Promise kept. Trust established. Excellent work forming your proof of capacity."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Ledger History View */}
      {sortedEntries.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-sage-200">
          <h3 className="text-2xl font-serif text-sage-900 mb-6">Historical Ledger</h3>
          
          <div className="space-y-4">
            {sortedEntries.map(([date, entry]) => (
              <div key={date} className="bg-white p-6 rounded-2xl border border-sage-200 shadow-sm flex flex-col gap-3 group hover:border-sage-300 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-sage-500">{new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric'})}</span>
                  {entry.completed === true ? (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-sage-100 text-sage-700 rounded-full">Kept</span>
                  ) : entry.repairPlan ? (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-rose-100 text-rose-700 rounded-full">Repaired</span>
                  ) : entry.completed === false ? (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 text-gray-500 rounded-full">Missed</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-amber-100 text-amber-700 rounded-full">Pending</span>
                  )}
                </div>
                <p className="text-sage-900 font-medium font-serif text-lg">"{entry.promise}"</p>
                {entry.repairPlan && (
                  <div className="mt-2 bg-sage-50 p-3 rounded-lg text-sm text-sage-700 border border-sage-100">
                    <span className="font-bold text-xs uppercase tracking-widest text-rose-500 block mb-1">Repair logged:</span>
                    {entry.repairPlan}
                  </div>
                )}
                {entry.glimmers && entry.glimmers.length > 0 && (
                   <div className="mt-2 flex flex-wrap gap-2">
                     {entry.glimmers.map((g, i) => (
                       <span key={i} className="text-[10px] bg-cream-100 text-sage-600 px-2 py-0.5 rounded-full border border-sage-200">✨ {g}</span>
                     ))}
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}
