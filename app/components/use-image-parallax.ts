"use client";

import { useEffect } from "react";

export default function useImageParallax(ready: boolean) {
  useEffect(() => {
    if (!ready) return;

    const frames = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      frames.forEach((element) => {
        delete element.dataset.parallaxActive;
        element.style.removeProperty("--parallax-y");
        element.style.removeProperty("--parallax-scale");
      });
    };

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const distance = window.innerWidth <= 700 ? 10 : 22;
      // Read all bounds before changing styles to avoid repeated layout work.
      const measurements = frames.map((element) => ({ element, rect: element.getBoundingClientRect() }));
      measurements.forEach(({ element, rect }) => {
        if (rect.height === 0 || rect.bottom < 0 || rect.top > viewport) return;
        const progress = Math.max(-1, Math.min(1, (viewport - 2 * rect.top - rect.height) / (viewport + rect.height)));
        element.dataset.parallaxActive = "true";
        element.style.setProperty("--parallax-y", `${(progress * distance).toFixed(2)}px`);
        // Extra image area keeps the frame covered at both ends of the motion.
        element.style.setProperty("--parallax-scale", String(1 + (2 * distance + 2) / rect.height));
      });
    };

    const schedule = () => {
      if (!preference.matches && !frame) frame = requestAnimationFrame(update);
    };
    const onPreferenceChange = () => {
      if (preference.matches) reset();
      else schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", onPreferenceChange);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", onPreferenceChange);
      reset();
    };
  }, [ready]);
}
