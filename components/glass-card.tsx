"use client";

import type { CSSProperties, HTMLAttributes, MouseEvent } from "react";
import { useState } from "react";

import { cn } from "@/lib/cn";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  cardHoverEffect?: boolean;
};

type GlowStyle = CSSProperties & {
  "--mx": string;
  "--my": string;
};

export function GlassCard({
  cardHoverEffect = false,
  className,
  onMouseMove,
  ...props
}: GlassCardProps) {
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
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-brand-200/20 p-6 backdrop-blur-lg! before:pointer-events-none before:absolute before:-inset-px before:-z-10 before:content-[''] before:opacity-0 before:transition-opacity before:duration-260 before:ease-out before:[background:radial-gradient(21.25rem_circle_at_var(--mx,50%)_var(--my,50%),rgba(176,228,204,0.23),rgba(64,138,113,0.16)_25%,transparent_62%)] hover:before:opacity-100 md:p-7 shadow-card",
        cardHoverEffect &&
          "transition-all duration-350 ease-out hover:-translate-y-1.5 hover:border-brand-200/35 hover:shadow-[0_1.5625rem_3.75rem_rgba(0,0,0,0.45),inset_0_0.0625rem_0_rgba(176,228,204,0.25)]",
        className,
      )}
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
