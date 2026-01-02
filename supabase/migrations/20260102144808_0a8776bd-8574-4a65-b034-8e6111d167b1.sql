-- Fix 1: Change fetch_airline_data function from SECURITY DEFINER to SECURITY INVOKER
-- This ensures the function runs with the caller's privileges, not the creator's
CREATE OR REPLACE FUNCTION public.fetch_airline_data()
RETURNS SETOF airlines_data
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT * FROM airlines_data;
END;
$function$;

-- Fix 2: Drop the unused 'SEO Summary Database Table' to reduce attack surface
-- This table is empty, unused in the application, and has no business logic
DROP TABLE IF EXISTS public."SEO Summary Database Table";