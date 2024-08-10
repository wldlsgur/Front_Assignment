import { useCallback, useEffect, useRef, useState } from 'react';

const useLocalStorage = ({ key, defaultValue, onError }) => {
  const onErrorRef = useRef(onError);
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      onErrorRef.current(error);
      return defaultValue;
    }
  });

  const setItem = useCallback(
    (newValue) => {
      try {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        onErrorRef.current(error);
      }
    },
    [key]
  );

  const removeItem = useCallback(() => {
    setValue(defaultValue);
    localStorage.removeItem(key);
  }, [defaultValue, key]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  return { value, setItem, removeItem };
};

export default useLocalStorage;
