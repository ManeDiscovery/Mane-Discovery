'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, BookHeart } from 'lucide-react';

export default function GlobalNav() {
  const pathname = usePathname();
  
  if (pathname === '/' || pathname === '/login') {
    return null; // Do not show on landing or login pages
  }

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-sage-900 text-cream-50 rounded-full px-8 py-3 flex items-center gap-10 z-50 animate-in slide-in-from-bottom-10 fade-in duration-700 shadow-[0_10px_40px_-10px_rgba(46,59,50,0.5)] border border-sage-700/50">
      <Link href="/dashboard" className={`flex flex-col items-center group transition-colors ${pathname === '/dashboard' ? 'text-rose-300' : 'text-sage-400 hover:text-cream-50'}`}>
        <Home className="w-5 h-5 mb-1 transition-transform group-hover:-translate-y-1" />
        <span className="text-[9px] tracking-widest uppercase font-bold">Journey</span>
      </Link>
      
      <div className="w-[1px] h-8 bg-sage-700/50" />
      
      <Link href="/sos" className={`flex flex-col items-center group transition-colors ${pathname === '/sos' ? 'text-amber-300' : 'text-amber-500/70 hover:text-amber-300'}`}>
        <Zap className="w-5 h-5 mb-1 transition-transform group-hover:-translate-y-1" />
        <span className="text-[9px] tracking-widest uppercase font-bold">SOS Rewire</span>
      </Link>
      
      <div className="w-[1px] h-8 bg-sage-700/50" />

      <Link href="/ledger" className={`flex flex-col items-center group transition-colors ${pathname === '/ledger' ? 'text-rose-300' : 'text-sage-400 hover:text-cream-50'}`}>
        <BookHeart className="w-5 h-5 mb-1 transition-transform group-hover:-translate-y-1" />
        <span className="text-[9px] tracking-widest uppercase font-bold">Ledger</span>
      </Link>
    </nav>
  );
}
