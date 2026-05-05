'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('payment_success') === 'true') {
        setSuccessMessage('✨ Payment successful! Welcome to the Journey. Please sign up to create your account and access your dashboard.');
        setIsSignUp(true);
      }
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let authError;
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        authError = error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        authError = error;
      }

      if (authError) {
        setError(authError.message);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Supabase Auth Exception:', err);
      setError(err?.message || 'An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-sm border border-sage-100 space-y-8 animate-in fade-in duration-700">
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-20 h-20">
            <Image 
              src="/logo.png" 
              alt="Mane Discovery Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-serif text-sage-900">
            {isSignUp ? 'Begin Your Journey' : 'Welcome Back'}
          </h1>
          <p className="text-sage-600 text-sm">
            {isSignUp ? 'Create an account to save your somatic diary across devices.' : 'Log in to continue your 21-day reset.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
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
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-sage-900 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-300 text-sage-900"
                placeholder="••••••••"
              />
            </div>
          </div>

          {successMessage && (
            <div className="p-4 rounded-xl bg-sage-100 text-sage-900 border border-sage-300 text-center text-sm mb-4 leading-relaxed font-medium">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-rose-100 text-rose-900 text-sm border border-rose-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-sage-900 text-cream-100 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-700 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="flex flex-col items-center space-y-4">
          {!isSignUp && (
            <Link href="/forgot-password" className="text-sage-600 text-sm hover:text-sage-900 transition-colors">
              Forgot Password?
            </Link>
          )}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sage-600 text-sm hover:text-sage-900 transition-colors"
          >
            {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
          </button>
        </div>

      </div>
    </div>
  );
}
