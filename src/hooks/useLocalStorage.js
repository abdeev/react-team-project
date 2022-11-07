import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const storageData = JSON.parse(localStorage.getItem(key));
      return storageData ? { ...storageData } : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      return null;
    }
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
