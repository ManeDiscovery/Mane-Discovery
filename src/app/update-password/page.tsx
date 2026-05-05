'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  // Ensure they are actually in a recovery session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // If they landed here without a valid token, redirect to login
        router.replace('/login');
      }
    };
    checkSession();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ text: 'Password successfully updated! Redirecting to dashboard...', type: 'success' });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (err: any) {
      setMessage({ text: err?.message || 'An unexpected error occurred.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-sm border border-sage-100 space-y-8 animate-in fade-in duration-700">
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-16 h-16 opacity-80">
            <Image 
              src="/logo.png" 
              alt="Mane Discovery Logo" 
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-serif text-sage-900">
            Update Password
          </h1>
          <p className="text-sage-600 text-sm">
            Please enter your new password below.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-sage-900 mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full p-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-300 text-sage-900"
              placeholder="••••••••"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-sm border font-medium text-center ${
              message.type === 'error' 
                ? 'bg-rose-100 text-rose-900 border-rose-300' 
                : 'bg-sage-100 text-sage-900 border-sage-300 leading-relaxed'
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || message?.type === 'success'}
            className="w-full py-4 bg-sage-900 text-cream-100 rounded-2xl font-bold uppercase tracking-widest hover:bg-sage-700 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

      </div>
    </div>
  );
}
