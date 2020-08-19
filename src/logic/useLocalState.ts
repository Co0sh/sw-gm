import { Dispatch, SetStateAction, useState, useEffect } from 'react';

export const useLocalState = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const raw = localStorage.getItem(key);
  const localStorageValue = (raw ? JSON.parse(raw) : undefined) as
    | T
    | undefined;
  const finalInitialValue = localStorageValue ?? initialValue;
  const [value, setValue] = useState(finalInitialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
