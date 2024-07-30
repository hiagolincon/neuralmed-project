import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 2000): string => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [value, delay]);

  return debounce;
};
