import React, { useEffect, useRef, useState } from 'react';

interface CinematicRevealProps {
  children: React.ReactNode;
  delay?: number; // 0–4
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}

/**
 * Wraps any content with a cinematic scroll-reveal animation.
 * Uses IntersectionObserver — no layout shift, GPU-accelerated.
 */
export const CinematicReveal: React.FC<CinematicRevealProps> = ({
  children,
  delay = 0,
  className = '',
  style,
  threshold = 0.12,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect(); // one-shot
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const delayClass = delay > 0 ? `cinematic-reveal-delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`cinematic-reveal ${revealed ? 'revealed' : ''} ${delayClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
