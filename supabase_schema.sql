-- SQL Schema for Play Loksewa Dashboard (Supabase PostgreSQL)

-- 1. PROFILES TABLE (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'editor',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MODEL SETS TABLE
CREATE TABLE IF NOT EXISTS public.model_sets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  set_id TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  duration INTEGER NOT NULL DEFAULT 45,
  positive_mark NUMERIC(4,2) NOT NULL DEFAULT 2.0,
  negative_mark NUMERIC(4,2) NOT NULL DEFAULT 0.4,
  status TEXT NOT NULL DEFAULT 'Draft',
  premium BOOLEAN NOT NULL DEFAULT FALSE,
  option_shuffling BOOLEAN NOT NULL DEFAULT TRUE,
  anti_cheat BOOLEAN NOT NULL DEFAULT FALSE,
  immediate_results BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MODEL SET QUESTIONS TABLE (Dedicated for exam bundles, prevents collision with general questions table)
CREATE TABLE IF NOT EXISTS public.model_set_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model_set_id UUID REFERENCES public.model_sets(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  difficulty TEXT DEFAULT 'Easy',
  subject TEXT DEFAULT 'GENERAL',
  text_np TEXT,
  text_en TEXT,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_option_id TEXT DEFAULT 'A',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_set_questions ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR MODEL SETS (Allow anonymous and authenticated access for dashboard ops)
CREATE POLICY "Allow public read access to model sets" ON public.model_sets
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to model sets" ON public.model_sets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to model sets" ON public.model_sets
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to model sets" ON public.model_sets
  FOR DELETE USING (true);

-- POLICIES FOR MODEL SET QUESTIONS
CREATE POLICY "Allow public read access to model_set_questions" ON public.model_set_questions
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to model_set_questions" ON public.model_set_questions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to model_set_questions" ON public.model_set_questions
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access to model_set_questions" ON public.model_set_questions
  FOR DELETE USING (true);

-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
