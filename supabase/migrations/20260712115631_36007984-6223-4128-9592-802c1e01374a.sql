ALTER TABLE public.airlines_data
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();