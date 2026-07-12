import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Shows the most recent baggage-policy verification date across all airlines.
 * Reads MAX(updated_at) from airlines_data and formats it for humans.
 */
export const LastVerifiedBadge = () => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchLatest = async () => {
      const { data, error } = await supabase
        .from('airlines_data')
        .select('updated_at')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (cancelled) return;
      if (error || !data || data.length === 0) return;

      const value = (data[0] as { updated_at?: string }).updated_at;
      if (value) setLastUpdated(new Date(value));
    };

    fetchLatest();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!lastUpdated) return null;

  const formatted = lastUpdated.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex justify-center py-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-zinc-800 ring-1 ring-primary/30">
        <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
        <span>Baggage policies last verified: {formatted}</span>
      </div>
    </div>
  );
};

export default LastVerifiedBadge;
