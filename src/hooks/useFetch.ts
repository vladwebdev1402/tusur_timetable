import {useEffect, useState} from 'react';

const CORS_LINK = "Перейдите на https://cors-anywhere.herokuapp.com/corsdemo и нажмите 'Request temporary access to the demo server' для обхода CORS";

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
      } catch (e) {
        if (e instanceof Error)
          setError(
            e.message + CORS_LINK
          );
        else setError('Произошла ошибка. ' + CORS_LINK);
      } finally {
        setIsLoading(false);
      }
    };

    makeFetch();
  }, deps);

  return {data, error, isLoading};
};
