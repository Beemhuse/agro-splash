'use client';
import { useEffect, useRef } from "react";
import anime from "animejs";

const useAnimeOnView = (animationOptions: anime.AnimeParams) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: ref.current,
            ...animationOptions,
          });
          observer.disconnect(); // Run animation once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [animationOptions]);

  return ref;
};

export default useAnimeOnView;
