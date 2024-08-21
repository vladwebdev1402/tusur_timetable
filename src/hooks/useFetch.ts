import {useEffect, useState} from 'react';

export const useFetch = <T>(call: () => Promise<T>, deps: unknown[]) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const makeFetch = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await call();
        setData(response);
      } catch {
        setError('Произошла ошибка');
      } finally {
        setIsLoading(false);
      }
    };

    makeFetch();
  }, deps);

  return {data, error, isLoading};
};
