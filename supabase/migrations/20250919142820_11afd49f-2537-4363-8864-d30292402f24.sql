-- Enable Row Level Security on tables that are missing it

-- Enable RLS on SEO Summary Database Table (appears to be seo_summary based on structure)
ALTER TABLE public."SEO Summary Database Table" ENABLE ROW LEVEL SECURITY;

-- Create policy for SEO table - allow public read access since this seems to be public SEO data
CREATE POLICY "Allow public read access to SEO data" 
ON public."SEO Summary Database Table" 
FOR SELECT 
USING (true);

-- Enable RLS on airlines_data_backup
ALTER TABLE public.airlines_data_backup ENABLE ROW LEVEL SECURITY;

-- Create policy for backup table - similar to main airlines_data table
CREATE POLICY "Allow anonymous read access to backup data" 
ON public.airlines_data_backup 
FOR SELECT 
USING (true);

-- Enable RLS on temp_airlines_data  
ALTER TABLE public.temp_airlines_data ENABLE ROW LEVEL SECURITY;

-- Create policy for temp table - allow anonymous read access
CREATE POLICY "Allow anonymous read access to temp data" 
ON public.temp_airlines_data 
FOR SELECT 
USING (true);