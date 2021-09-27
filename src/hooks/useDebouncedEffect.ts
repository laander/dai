import { useEffect } from "react";

export default function useDebouncedEffect(
  handler: Function,
  deps: any[],
  delay: number
) {
  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      handler();
    }, delay);
    return () => {
      clearTimeout(timeoutHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler, delay, ...deps]);
}
