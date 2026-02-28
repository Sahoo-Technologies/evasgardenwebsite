import { useState, useEffect, useRef } from 'react';

interface StatsCounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function StatsCounter({ end, suffix = '', label, duration = 2000 }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-7xl font-serif font-light text-gold-400 mb-2">
        {count}{suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.3em] text-navy-300 font-bold">{label}</div>
    </div>
  );
}
