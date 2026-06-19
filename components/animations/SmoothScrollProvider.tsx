"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenisInstance(): Lenis | null {
  return useContext(LenisContext).lenis;
}

type SmoothScrollProviderProps = {
  children: ReactNode;
  /** Disable Lenis entirely (e.g. reduced-motion fallback) */
  disabled?: boolean;
};

const NAV_OFFSET = -88;

/**
 * Global Lenis smooth-scroll provider.
 * Intercepts in-page anchor clicks for buttery section navigation.
 */
export function SmoothScrollProvider({
  children,
  disabled = false,
}: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (disabled) {
      setLenis(null);
      document.documentElement.classList.remove("lenis-active");
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.35,
      infinite: false,
    });

    setLenis(instance);
    document.documentElement.classList.add("lenis-active");

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis-active");
    };
  }, [disabled]);

  useEffect(() => {
    if (!lenis || disabled) return;

    const scroll = lenis;

    function handleAnchorClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const destination = document.querySelector(hash);
      if (!(destination instanceof HTMLElement)) return;

      event.preventDefault();
      scroll.scrollTo(destination, {
        offset: NAV_OFFSET,
        duration: 1.35,
      });
    }

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [lenis, disabled]);

  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  );
}
