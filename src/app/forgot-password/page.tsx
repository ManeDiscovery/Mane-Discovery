'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ 
          text: 'Check your email for the password reset link. It might take a few minutes to arrive.', 
          type: 'success' 
        });
      }
    } catch (err: any) {
      setMessage({ text: err?.message || 'An unexpected error occurred.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-sm border border-sage-100 space-y-8 animate-in fade-in duration-700 relative">
        
        <Link href="/login" className="absolute top-8 left-8 text-sage-400 hover:text-sage-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="flex flex-col items-center text-center space-y-4 pt-4">
          <div className="relative w-16 h-16 opacity-80">
            <Image 
              src="/logo.png" 
              alt="Mane Discovery Logo" 
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-serif text-sage-900">
            Reset Password
          </h1>
          <p className="text-sage-600 text-sm px-4">
            Enter the email associated with your account and we'll send you a secure link to reset your password.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-sage-900 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-300 text-sage-900"
              placeholder="Enter your email address"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-sm border font-medium ${
              message.type === 'error' 
                ? 'bg-rose-100 text-rose-900 border-rose-300' 
                : 'bg-sage-100 text-sage-900 border-sage-300 leading-relaxed text-center'
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || message?.type === 'success'}
            className="w-full py-4 bg-sage-900 text-cream-100 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-700 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

      </div>
    </div>
  );
}
