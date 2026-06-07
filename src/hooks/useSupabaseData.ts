import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export function useSupabaseData<T>(table: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: result, error: supabaseError } = await supabase
          .from(table)
          .select('*');

        if (supabaseError) throw supabaseError;
        setData(result || []);
      } catch (err: any) {
        setError(err.message);
        console.error(`Error fetching from ${table}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table]);

  return { data, loading, error };
}
