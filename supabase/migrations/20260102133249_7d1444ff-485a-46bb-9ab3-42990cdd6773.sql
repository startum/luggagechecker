-- Remove the public read policy from airlines_data_backup
DROP POLICY IF EXISTS "Allow anonymous read access to backup data" ON public.airlines_data_backup;

-- Create a policy that only allows service role access (authenticated admin operations)
-- Note: Service role bypasses RLS, so we just need to ensure no public access
-- The table will only be accessible via service role key or direct database access