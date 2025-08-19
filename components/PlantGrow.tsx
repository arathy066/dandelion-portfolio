"use client";

import { useEffect, useRef, useState } from "react";

export default function PlantGrow() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [canStart, setCanStart] = useState(false);

  // Start only when user has scrolled a bit and the section is in view
  const [userScrolled, setUserScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) setUserScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (window.scrollY > 120) setUserScrolled(true);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const section = imgRef.current?.closest("section");
    if (!section) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.5 && userScrolled) {
          setCanStart(true);
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [userScrolled]);

  return (
    <section className="relative flex justify-center items-center py-20">
      <img
        ref={imgRef}
        src="/plant.png"   // keep your PNG in public/plant.png
        alt="Dandelion Plant"
        className={[
          "w-[320px] h-auto will-change-transform transition-opacity duration-5000 ease-out",
          canStart ? "opacity-100" : "opacity-0",
          canStart ? "animate-[plantGrow_1.2s_ease-out_forwards]" : "",
        ].join(" ")}
      />
      <style jsx>{`
        @keyframes plantGrow {
          0%   { transform: scale(0.2); opacity: 0; filter: blur(2px); }
          60%  { transform: scale(1.06); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
      `}</style>
    </section>
  );
}