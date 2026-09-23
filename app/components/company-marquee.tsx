"use client";

import { useState } from "react";
import styles from "./company-marquee.module.css";

const messages = [
  "Cal-Comp",
  "Prime Products",
  "Pataya Food",
  "Cargill",
  "CPF",
];

export default function CompanyMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className={styles.marquee} aria-label="Placement experience with" data-paused={paused}>
      <div className={styles.heading}>
        <p>Placement experience with</p>
        <button
          type="button"
          className={styles.control}
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Resume marquee" : "Pause marquee"}
          aria-pressed={paused}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            {paused ? <path d="M3 1.5 10 6l-7 4.5z" /> : <path d="M2 1h3v10H2zm5 0h3v10H7z" />}
          </svg>
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {messages.map((message) => (
                <li key={message}>
                  <span>{message}</span>
                  <svg className={styles.spark} width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                    <path d="M13 0c0 9-4 13-13 13 9 0 13 4 13 13 0-9 4-13 13-13-9 0-13-4-13-13Z" fill="currentColor" />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
