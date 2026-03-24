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
  const isSafari = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome"),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let frame = 0;

    const speedValue = speed === "slow" ? 0.001 : 0.002;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      width = context.canvas.width = parent.clientWidth;
      height = context.canvas.height = parent.clientHeight;
      context.filter = `blur(${blur}px)`;
    };

    const drawWave = (lines: number) => {
      time += speedValue;

      for (let i = 0; i < lines; i += 1) {
        context.beginPath();
        context.lineWidth = waveWidth;
        context.strokeStyle = colors[i % colors.length];

        for (let x = 0; x <= width; x += 5) {
          const y = noise(x / 800, 0.3 * i, time) * 100;
          context.lineTo(x, y + height * 0.5);
        }

        context.stroke();
        context.closePath();
      }
    };

    const render = () => {
      context.fillStyle = backgroundFill;
      context.globalAlpha = waveOpacity;
      context.fillRect(0, 0, width, height);
      drawWave(5);
      frame = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [backgroundFill, blur, colors, noise, speed, waveOpacity, waveWidth]);

  return (
    <div className={cn("relative w-full overflow-hidden", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
        style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
