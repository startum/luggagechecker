-- Fix security issue: Restrict scheduled_posts access to authenticated users only
-- Add user_id column to associate posts with specific users
ALTER TABLE public.scheduled_posts 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow all users to create posts" ON public.scheduled_posts;
DROP POLICY IF EXISTS "Allow all users to delete posts" ON public.scheduled_posts;
DROP POLICY IF EXISTS "Allow all users to update posts" ON public.scheduled_posts;
DROP POLICY IF EXISTS "Allow all users to view posts" ON public.scheduled_posts;

-- Create secure RLS policies that require authentication
CREATE POLICY "Users can view their own posts" 
ON public.scheduled_posts 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own posts" 
ON public.scheduled_posts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
ON public.scheduled_posts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
ON public.scheduled_posts 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Update the fetch_airline_data function to have proper search_path
CREATE OR REPLACE FUNCTION public.fetch_airline_data()
RETURNS SETOF airlines_data
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT * FROM airlines_data;
END;
$function$;