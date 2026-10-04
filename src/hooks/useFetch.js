import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(url, {
          signal: controller.signal,
        });

        setData(response.data);
      } catch (err) {
        if (
          err.name !== 'CanceledError' &&
          err.code !== 'ERR_CANCELED'
        ) {
          setError(
            err.message || 'No se pudo obtener la información',
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, retryCount]);

  return {
    data,
    loading,
    error,
    retry,
  };
}

export default useFetch;