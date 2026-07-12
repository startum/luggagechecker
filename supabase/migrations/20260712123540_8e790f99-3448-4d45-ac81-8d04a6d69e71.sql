
-- 1) storage.objects: restrict the private `check-size` bucket
-- Explicit deny policies for anon/authenticated. service_role bypasses RLS.
CREATE POLICY "Deny anon access to check-size bucket"
ON storage.objects
FOR ALL
TO anon
USING (bucket_id <> 'check-size')
WITH CHECK (false);

CREATE POLICY "Deny authenticated access to check-size bucket"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id <> 'check-size')
WITH CHECK (false);

-- 2) airlines_data_backup: ensure no client role has access.
REVOKE ALL ON public.airlines_data_backup FROM anon, authenticated, PUBLIC;
GRANT ALL ON public.airlines_data_backup TO service_role;
