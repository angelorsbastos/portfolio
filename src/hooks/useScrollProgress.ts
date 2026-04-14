import { useState, useEffect, useRef, RefObject } from "react";

export const useScrollProgress = (ref: RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateProgress = () => {
      // Linear Interpolation (LERP) for smooth ease-out
      const lerpFactor = 0.1;
      const diff = targetProgressRef.current - currentProgressRef.current;
      
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * lerpFactor;
        setProgress(currentProgressRef.current);
        rafRef.current = requestAnimationFrame(updateProgress);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(currentProgressRef.current);
        rafRef.current = undefined;
      }
    };

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const activationPoint = windowHeight * 0.7;
      const elementHeight = rect.height;
      const elementTop = rect.top;
      
      const scrolled = activationPoint - elementTop;
      const nextTarget = Math.min(Math.max(scrolled / elementHeight, 0), 1);
      
      targetProgressRef.current = nextTarget;

      // Start the smoothing loop if not already running
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);

  return progress;
};
