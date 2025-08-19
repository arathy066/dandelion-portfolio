"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A small "dot" that animates around the perimeter of an SVG <rect>.
 * You can drop anything as children (we use a radial gradient blob).
 */
export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;        // ms to loop around the border once
  rx?: string;              // rect radius x (e.g., "30%")
  ry?: string;              // rect radius y (e.g., "30%")
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  // Drive "progress" (in px along the path) on every frame
  useAnimationFrame((time: number, delta: number) => {
    const length = pathRef.current?.getTotalLength();
    if (!length) return;

    const pxPerMs = length / duration;
    progress.set((time * pxPerMs) % length);
  });

  // Convert progress -> current point on the rect path
  const x = useTransform(progress, (val: number) =>
    pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(progress, (val: number) =>
    pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const transform = useMotionTemplate`
    translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)
  `;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect ref={pathRef} fill="none" width="100%" height="100%" rx={rx} ry={ry} />
      </svg>

      <motion.div
        className="absolute top-0 left-0"
        style={{ transform }}
      >
        {children}
      </motion.div>
    </>
  );
};

/**
 * Easy wrapper: animated gradient border around arbitrary content.
 * Use like:
 * <MovingBorderWrapper className="max-w-6xl mx-auto" borderRadius="2rem">
 *   ...your section content...
 * </MovingBorderWrapper>
 */
export function MovingBorderWrapper({
  borderRadius = "1.75rem",
  duration = 3500,
  className,
  children,
}: {
  borderRadius?: string;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative overflow-hidden p-[1px]", className)}
      style={{ borderRadius }}
    >
      {/* Animated border layer */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="28%" ry="28%">
          {/* The little glowing blob that travels the border */}
          <div className="h-20 w-20 opacity-80 bg-white-100" />
        </MovingBorder>
      </div>

      {/* Inner content surface */}
      <div
        className="relative z-10 bg-black-100/80 backdrop-blur-sm"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </div>
  );
}
