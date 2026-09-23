"use client";

import { useEffect, useRef } from "react";

const statistics = [
  { value: 26, suffix: "+", label: "Years of experience" },
  { value: 10100, suffix: "+", label: "Workers placed abroad" },
  { value: 3, suffix: "", label: "Established placement markets" },
];
const numberFormat = new Intl.NumberFormat("en-US");

export default function CompanyStats({ ready }: { ready: boolean }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const numbers = element.querySelectorAll<HTMLElement>("[data-count]");
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    const finish = () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      numbers.forEach((number, index) => {
        number.textContent = numberFormat.format(statistics[index].value);
      });
      element.dataset.motion = "complete";
    };

    if (preference.matches) return;
    element.dataset.motion = "waiting";
    numbers.forEach((number) => {
      number.textContent = "0";
    });

    if (ready) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          element.dataset.motion = "running";
          const start = performance.now();
          const tick = (now: number) => {
            numbers.forEach((number, index) => {
              const progress = Math.min(
                1,
                Math.max(0, (now - start - index * 130) / 1500),
              );
              const eased = 1 - Math.pow(1 - progress, 3);
              number.textContent = numberFormat.format(
                Math.round(statistics[index].value * eased),
              );
            });
            if (now - start < 1760) frame = requestAnimationFrame(tick);
            else finish();
          };
          frame = requestAnimationFrame(tick);
        },
        { threshold: 0.25 },
      );
      observer.observe(element);
    }

    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      finish();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [ready]);

  return (
    <div className="stats-bar" ref={container}>
      {statistics.map(({ value, suffix, label }) => (
        <div className="stat-item" key={label}>
          <strong aria-label={`${numberFormat.format(value)}${suffix}`}>
            <span className="stat-value" aria-hidden="true">
              <span data-count>{numberFormat.format(value)}</span>
              <span className="stat-suffix">{suffix}</span>
            </span>
          </strong>
          <p>{label}</p>
        </div>
      ))}
      <div className="stats-note stat-item">
        <p>
          Established in 2000.
          <br />
          <b>Based in Myanmar.</b>
        </p>
      </div>
    </div>
  );
}
