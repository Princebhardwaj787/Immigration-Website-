import { useCallback, useEffect, useRef, useState } from 'react';
import { api, ApiError } from '@/services/api';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Lightweight data-fetching hook with loading, error and refetch states.
 * Cancels state updates on unmount and prevents double-fetching in StrictMode.
 */
export function useFetch<T>(path: string, deps: unknown[] = []): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get<T>(path)
      .then((res) => {
        if (!cancelled && mounted.current) setData(res);
      })
      .catch((err: ApiError) => {
        if (!cancelled && mounted.current) setError(err.message);
      })
      .finally(() => {
        if (!cancelled && mounted.current) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, nonce, ...deps]);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  return { data, loading, error, refetch };
}
