'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

export default function CertificatePage() {
  const [name, setName] = useState('');
  const [isReady, setIsReady] = useState(false);

  // Format today's date elegantly
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', dateOptions);

  return (
    <div className="min-h-screen bg-cream-50 pt-12 pb-24 px-6 relative animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation - hidden during print */}
        <div className="print:hidden">
          <Link href="/dashboard" className="inline-flex items-center text-sage-500 hover:text-sage-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Input Form - hidden during print */}
        {!isReady && (
          <div className="max-w-md mx-auto space-y-6 bg-white p-8 rounded-[2rem] shadow-sm border border-sage-100 text-center animate-in zoom-in-95 duration-500 print:hidden">
            <h2 className="text-2xl font-serif text-sage-900">Claim Your Certificate</h2>
            <p className="text-sage-700 text-sm">
              You've officially completed the 21-Day Nervous System Reset! Enter your name exactly as you'd like it to appear on your certificate.
            </p>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full text-center text-xl font-serif p-4 border-b-2 border-sage-200 focus:outline-none focus:border-rose-400 bg-transparent transition-colors"
            />
            <button 
              onClick={() => { if(name.trim()) setIsReady(true); }}
              disabled={!name.trim()}
              className="w-full py-4 bg-sage-900 text-cream-50 rounded-full font-bold uppercase tracking-widest hover:bg-sage-800 transition-colors disabled:opacity-50"
            >
              Generate Certificate
            </button>
          </div>
        )}

        {/* The Certificate - centered on screen, takes full page on print */}
        <div className={`transition-all duration-1000 ${isReady ? 'opacity-100 scale-100' : 'opacity-10 scale-95 pointer-events-none print:hidden'}`}>
          
          {/* Print Button Wrapper */}
          <div className="flex justify-center mb-8 print:hidden">
            <button 
              onClick={() => window.print()}
              className="px-6 py-3 bg-rose-100 text-rose-900 hover:bg-rose-200 rounded-full font-bold uppercase tracking-widest transition-colors flex items-center shadow-sm"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print / Save as PDF
            </button>
          </div>

          {/* Certificate Container (8.5 x 11 aspect ratio constraint conceptually) */}
          <div className="bg-white p-4 md:p-8 shadow-2xl print:shadow-none w-full max-w-[1056px] mx-auto aspect-[1.414/1] flex flex-col items-center justify-center print:w-[100vw] print:h-[100vh] print:p-0">
            {/* Inner Border System */}
            <div className="w-full h-full border-[12px] border-double border-sage-200 p-8 flex flex-col items-center justify-between text-center relative bg-cream-50/30">
              
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-rose-300" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-rose-300" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-rose-300" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-rose-300" />

              <div className="space-y-6 pt-12">
                <p className="tracking-[0.3em] text-xs font-bold uppercase text-sage-500">Mane Discovery</p>
                <h1 className="text-5xl md:text-7xl font-serif text-sage-900 tracking-tight">Certificate of Completion</h1>
              </div>

              <div className="space-y-12 w-full max-w-2xl px-8">
                <p className="text-lg md:text-xl text-sage-600 font-light italic">
                  This certifies that
                </p>
                <div className="border-b border-sage-300 pb-2">
                  <h2 className="text-4xl md:text-6xl font-serif text-sage-900 text-center">
                    {name || 'Your Name'}
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-sage-600 leading-relaxed">
                  has successfully completed the 21-Day Nervous System Reset, demonstrating a profound commitment to somatic awareness, regulation, and embodied transformation.
                </p>
              </div>

              <div className="w-full flex justify-between items-end px-16 pb-8">
                <div className="text-center space-y-2">
                  <p className="text-lg font-serif text-sage-900 border-b border-sage-300 px-8 pb-1">{today}</p>
                  <p className="text-xs uppercase tracking-widest text-sage-500 font-bold">Date of Completion</p>
                </div>
                
                {/* Logo Space */}
                <div className="hidden md:flex items-center justify-center opacity-20">
                   <div className="w-24 h-24 border border-sage-400 rounded-full flex items-center justify-center">
                     <div className="w-20 h-20 border border-sage-400 rounded-full" />
                   </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="px-8 pb-1 border-b border-sage-300">
                    <p className="text-2xl font-serif text-sage-900 italic transform -rotate-2">
                      Maria Roach
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-sage-500 font-bold">Creator of Mane Discovery</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
