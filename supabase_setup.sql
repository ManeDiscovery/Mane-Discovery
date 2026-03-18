-- 1. Add 'has_paid' to the profiles table so we know who bought the app
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_paid BOOLEAN DEFAULT false;

-- 2. Create a 'purchases' table to store Stripe checkouts that happen BEFORE the user creates an account
CREATE TABLE IF NOT EXISTS public.pending_purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  stripe_session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create a trigger function that automatically unlocks a user's profile if they paid first and signed up second
CREATE OR REPLACE FUNCTION public.handle_new_user_purchase() 
RETURNS TRIGGER AS $$
BEGIN
  -- Check if their new email matches any pending purchases
  IF EXISTS (SELECT 1 FROM public.pending_purchases WHERE email = NEW.email) THEN
    -- Update the profile that was just automatically created by your other trigger
    UPDATE public.profiles SET has_paid = true WHERE id = NEW.id;
    -- Clean up the pending purchase list
    DELETE FROM public.pending_purchases WHERE email = NEW.email;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Attach the trigger to fire right AFTER a user is created in the auth table
DROP TRIGGER IF EXISTS on_auth_user_purchase ON auth.users;
CREATE TRIGGER on_auth_user_purchase
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_purchase();
