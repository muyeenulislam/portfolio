"use client";

import type { CSSProperties, HTMLAttributes, MouseEvent } from "react";
import { useState } from "react";

import { cn } from "@/lib/cn";

type GlassCardProps = HTMLAttributes<HTMLDivElement>;

type GlowStyle = CSSProperties & {
  "--mx": string;
  "--my": string;
};

export function GlassCard({ className, onMouseMove, ...props }: GlassCardProps) {
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = `${event.clientX - bounds.left}px`;
    const y = `${event.clientY - bounds.top}px`;
    setMouse({ x, y });
    onMouseMove?.(event);
  }

  return (
    <div
      className={cn("glass-card glow-card rounded-3xl p-6 md:p-7", className)}
      onMouseMove={handleMouseMove}
      style={
        {
          "--mx": mouse.x,
          "--my": mouse.y,
        } as GlowStyle
      }
      {...props}
    />
  );
}
