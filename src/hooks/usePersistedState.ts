import { useCallback } from "react";
import useDebouncedEffect from "./useDebouncedEffect";

export default function usePersistedState<T>(
  key: string,
  defaultValue: T,
  watchState: T
) {
  const initialState = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) return JSON.parse(item);
      return defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  }, [defaultValue, key]);

  useDebouncedEffect(
    () => {
      try {
        window.localStorage.setItem(key, JSON.stringify(watchState));
      } catch (error) {
        console.log(error);
      }
    },
    [watchState, key],
    1000
  );

  return [initialState];
}
