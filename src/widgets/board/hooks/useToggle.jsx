import { useCallback, useState } from 'react';

const useToggle = (defaultValue = false) => {
  const [state, setState] = useState(defaultValue);

  const handleToggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return {
    state,
    handleToggle,
  };
};

export default useToggle;
