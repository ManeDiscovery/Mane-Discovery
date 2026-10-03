-- ==============================================================================
-- MANE DISCOVERY: AUTONOMOUS BUSINESS DATABASE SCHEMA
-- Run this script in the Supabase SQL Editor to enable zero-touch automation
-- ==============================================================================

-- 1. Profiles Table Enhancement (Access Control & Tier Tracking)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_paid BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'basic';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Pending Purchases Table (Store Stripe checkouts before account signup)
CREATE TABLE IF NOT EXISTS public.pending_purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  tier TEXT DEFAULT 'basic',
  stripe_session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Purchases Ledger Table (Full financial log for reporting & revenue command center)
CREATE TABLE IF NOT EXISTS public.purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'basic',
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_session_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Interactive Quiz Leads (Capturing 24/7 cold traffic into qualified buyers)
CREATE TABLE IF NOT EXISTS public.quiz_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  archetype TEXT NOT NULL,
  tension_score INTEGER DEFAULT 0,
  ease_score INTEGER DEFAULT 0,
  dominant_state TEXT,
  answers JSONB,
  converted_to_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_quiz_leads_email ON public.quiz_leads(email);

-- 5. Practitioner Applications (High-Ticket Pipeline $1,500+)
CREATE TABLE IF NOT EXISTS public.practitioner_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  experience_level TEXT,
  motivation TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'interview_scheduled', 'enrolled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_practitioner_apps_email ON public.practitioner_applications(email);

-- 6. Trigger: Automatically unlock account if user paid before signing up
CREATE OR REPLACE FUNCTION public.handle_new_user_purchase() 
RETURNS TRIGGER AS $$
DECLARE
  v_tier TEXT;
BEGIN
  -- Check if their new email matches any pending purchases
  IF EXISTS (SELECT 1 FROM public.pending_purchases WHERE LOWER(email) = LOWER(NEW.email)) THEN
    SELECT tier INTO v_tier FROM public.pending_purchases WHERE LOWER(email) = LOWER(NEW.email) LIMIT 1;
    
    -- Update the profile created for this user
    UPDATE public.profiles 
    SET has_paid = true, tier = COALESCE(v_tier, 'basic')
    WHERE id = NEW.id;
    
    -- Clean up the pending purchase list
    DELETE FROM public.pending_purchases WHERE LOWER(email) = LOWER(NEW.email);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach the trigger to fire right AFTER a user is created in the auth table
DROP TRIGGER IF EXISTS on_auth_user_purchase ON auth.users;
CREATE TRIGGER on_auth_user_purchase
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_purchase();

-- 7. Security Policies (RLS)
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practitioner_applications ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own purchase history
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- Allow public insert for leads and practitioner applications
CREATE POLICY "Anyone can submit quiz lead" ON public.quiz_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit practitioner application" ON public.practitioner_applications
  FOR INSERT WITH CHECK (true);
