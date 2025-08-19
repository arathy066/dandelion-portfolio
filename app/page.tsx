"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// 3D seed (robust dynamic)
const FloatingModel = dynamic(
  () =>
    import("@/components/FloatingModel").then(
      (m) => (m.default ?? (m as any).FloatingModel) as React.ComponentType<any>
    ),
  { ssr: false }
);

import { navItems } from "@/data";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import PlantGrow from "@/components/PlantGrow";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

/** Sticky span that can be disabled (to stop rendering seeds) */
function SeedSpan({
  children,
  height = "h-[180vh]",
  disabled = false,
}: {
  children: React.ReactNode;
  height?: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setActive(entries[0].isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`relative ${height}`}>
      <div className="sticky top-0 h-screen pointer-events-none z-10">
        {!disabled && active && <FloatingModel />}
      </div>
      <div className="relative z-20">{children}</div>
    </section>
  );
}

export default function Home() {
  const finalRef = useRef<HTMLDivElement | null>(null);
  const [finalActive, setFinalActive] = useState(false);

  // When final section is visible, disable seeds everywhere
  useEffect(() => {
    const el = finalRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setFinalActive(entries[0].isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full isolate">
        <FloatingNav navItems={navItems} />

        {/* HERO */}
        <Hero />

        {/* Seed spans */}
        <SeedSpan disabled={finalActive}><RecentProjects /></SeedSpan>
        
        <SeedSpan disabled={finalActive}><Clients /></SeedSpan>
        <SeedSpan disabled={finalActive}><Experience /></SeedSpan>

        {/* Final section with PNG plant; no theme toggle */}
        <section ref={finalRef} className="relative z-40 isolate">
          <div className="absolute inset-0 -z-10 bg-black-100" />
          <PlantGrow />
          <Footer />
        </section>

        <div className="h-[30vh]" />
      </div>
    </main>
  );
}