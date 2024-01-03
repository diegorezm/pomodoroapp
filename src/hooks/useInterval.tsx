import { useRef, useEffect } from "react";
export function useInterval<c extends CallableFunction>(callback: c, delay: number | null): void {
  const savedCallback = useRef<c>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if(savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
