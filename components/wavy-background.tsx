"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";

import { cn } from "@/lib/cn";

type WavyBackgroundProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
};

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors = ["#091413", "#285A48", "#408A71", "#B0E4CC", "#285A48"],
  waveWidth = 50,
  backgroundFill = "#030706",
  blur = 12,
  speed = "fast",
  waveOpacity = 0.45,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const noise = useMemo(() => createNoise3D(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let frame = 0;
    let lastFrameTime = 0;
    let isInView = true;
    let isDocumentVisible = !document.hidden;
    let lowPowerMode = false;
    let reducedMotion = false;

    const speedValue = speed === "slow" ? 0.001 : 0.002;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const mobileViewportQuery = window.matchMedia("(max-width: 768px)");

    const updatePerformanceMode = () => {
      reducedMotion = reducedMotionQuery.matches;
      lowPowerMode =
        reducedMotion ||
        coarsePointerQuery.matches ||
        mobileViewportQuery.matches;
      resize();
    };

    const resize = () => {
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        lowPowerMode ? 1 : 1.5,
      );
      width = parent.clientWidth;
      height = parent.clientHeight;
      context.canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      context.canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawWave = (lines: number, xStep: number, amplitude: number) => {
      const currentWaveWidth = Math.max(
        36,
        waveWidth - (lowPowerMode ? 10 : 0),
      );

      for (let i = 0; i < lines; i += 1) {
        context.beginPath();
        context.lineWidth = currentWaveWidth;
        context.strokeStyle = colors[i % colors.length];

        for (let x = 0; x <= width; x += xStep) {
          const y = noise(x / 800, 0.3 * i, time) * amplitude;
          if (x === 0) {
            context.moveTo(0, y + height * 0.5);
          } else {
            context.lineTo(x, y + height * 0.5);
          }
        }

        context.stroke();
        context.closePath();
      }
    };

    const render = (now: number) => {
      frame = window.requestAnimationFrame(render);

      if (!isInView || !isDocumentVisible) return;

      const fps = reducedMotion ? 20 : lowPowerMode ? 24 : 36;
      if (now - lastFrameTime < 1000 / fps) return;
      lastFrameTime = now;

      time += reducedMotion ? speedValue * 0.5 : speedValue;

      context.fillStyle = backgroundFill;
      context.globalAlpha = waveOpacity;
      context.fillRect(0, 0, width, height);
      drawWave(
        reducedMotion ? 3 : lowPowerMode ? 4 : 5,
        reducedMotion ? 12 : lowPowerMode ? 9 : 6,
        reducedMotion ? 45 : lowPowerMode ? 65 : 100,
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.08 },
    );

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };

    updatePerformanceMode();
    resize();
    observer.observe(parent);
    render(0);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const cleanupFns: Array<() => void> = [];
    const registerMediaListener = (query: MediaQueryList) => {
      const legacyQuery = query as MediaQueryList & {
        addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
        removeListener?: (
          listener: (event: MediaQueryListEvent) => void,
        ) => void;
      };

      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", updatePerformanceMode);
        cleanupFns.push(() =>
          query.removeEventListener("change", updatePerformanceMode),
        );
        return;
      }

      if (typeof legacyQuery.addListener === "function") {
        legacyQuery.addListener(updatePerformanceMode);
        cleanupFns.push(() =>
          legacyQuery.removeListener?.(updatePerformanceMode),
        );
      }
    };

    registerMediaListener(reducedMotionQuery);
    registerMediaListener(coarsePointerQuery);
    registerMediaListener(mobileViewportQuery);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      for (const cleanup of cleanupFns) cleanup();
    };
  }, [backgroundFill, blur, colors, noise, speed, waveOpacity, waveWidth]);

  return (
    <div className={cn("relative w-full overflow-hidden", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
        style={{ filter: `blur(${blur}px)` }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
