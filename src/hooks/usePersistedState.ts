import { useEffect } from "react";
import useDebouncedEffect from "./useDebouncedEffect";
import useUndo from "./useUndo";

export default function usePersistedState<T>(key: string, initialValue: T) {
  const [{ present }, { reset, canUndo, canRedo, redo, undo, set }] =
    useUndo<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return;
      const storedTodos = JSON.parse(item);
      reset(storedTodos);
    } catch (error) {
      console.log(error);
    }
  }, [key, reset]);

  useDebouncedEffect(
    () => {
      try {
        window.localStorage.setItem(key, JSON.stringify(present));
      } catch (error) {
        console.log(error);
      }
    },
    [present, key],
    1000
  );
  return [present, { reset, canUndo, canRedo, redo, undo, set }] as const;
}
