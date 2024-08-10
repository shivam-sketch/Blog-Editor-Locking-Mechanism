import { useState } from "react";
import Cookies from "js-cookie";

export const useCookies = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = Cookies.get(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        Cookies.set(keyName, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      Cookies.set(keyName, newValue);
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
