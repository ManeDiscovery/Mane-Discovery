'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ));
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { fetchUserProfile } = useAppStore();

  useEffect(() => {
    let mounted = true;

    console.log("[AuthProvider] Mounting and initiating checkAuth...");

    // Safety fallback: Force dismiss loading screen after 3 seconds
    const safetyTimeout = setTimeout(() => {
      if (mounted) {
        console.warn("[AuthProvider] Safety timeout triggered! Force-dismissing loader.");
        setLoading(false);
      }
    }, 3000);

    async function checkAuth() {
      try {
        console.log("[AuthProvider] Calling supabase.auth.getSession()...");
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("[AuthProvider] getSession() resolved. Session exists:", !!session);
        
        if (error) {
          console.error("Supabase getSession error:", error);
          throw error;
        }

        const isPublicRoute = pathname === '/' || pathname === '/login';
        if (!session && !isPublicRoute) {
          router.push('/login');
        } else if (session) {
          // Fetch the user's profile and check-ins into Zustand here
          try {
            console.log("[AuthProvider] Calling fetchUserProfile...");
            await fetchUserProfile(session.user.id);
            console.log("[AuthProvider] fetchUserProfile complete.");
          } catch (err) {
            console.error("Failed to fetch user profile on load:", err);
          }
          if (pathname === '/login') {
            router.push('/dashboard');
          }
        }
      } catch (err) {
        console.error("Fatal Auth Initialization Error:", err);
        // Fallback to login if we can't determine auth state
        if (pathname !== '/' && pathname !== '/login') {
           router.push('/login');
        }
      } finally {
        if (mounted) {
          console.log("[AuthProvider] checkAuth finally block reached, dismissing loader.");
          setLoading(false);
          clearTimeout(safetyTimeout);
        }
      }
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login');
        } else if (event === 'SIGNED_IN' && session) {
          try {
            await fetchUserProfile(session.user.id);
          } catch (err) {
            console.error("Failed to fetch user profile on sign in:", err);
          }
          if (pathname === '/login' || pathname === '/') {
            router.push('/dashboard');
          }
        }
      }
    );

    return () => {
      console.log("[AuthProvider] Component unmounting, cleaning up.");
      mounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, [pathname, router, fetchUserProfile, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="w-16 h-16 border-4 border-sage-200 border-t-sage-900 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
