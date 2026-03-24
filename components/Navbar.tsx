"use client";

import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import type { NavItem } from "@/data/cvData";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";

type NavbarProps = {
  logo: string;
  navItems: ReadonlyArray<NavItem>;
};

export function Navbar({ logo, navItems }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const visibleItems = navItems.filter((item) => item.href !== "#top");
  const activeHref = useActiveSection(visibleItems.map((item) => item.href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex gap-2  justify-between  items-center mx-auto mt-4 w-[min(1120px,calc(100%-1rem))] rounded-2xl border border-brand-200/25 bg-black/65 px-3 py-2.5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:px-4">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#top"
            className="group relative block h-11 w-11 overflow-hidden rounded-xl border border-brand-200/35"
          >
            <Image
              src={logo}
              alt="Site logo"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
              sizes="44px"
            />
            <span className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-200/30 bg-brand-700/20 text-brand-100 transition hover:bg-brand-700/40 md:hidden"
            onClick={() => setOpen((previous) => !previous)}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
        <ul className="hidden items-center gap-1 text-sm md:flex">
          {visibleItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition",
                  activeHref === item.href
                    ? "border border-brand-200/35 bg-brand-700/35 text-brand-100"
                    : "text-brand-100/80 hover:bg-brand-200/12 hover:text-brand-100",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ul
          className={`grid overflow-hidden text-sm transition-all duration-500 md:hidden ${
            open ? "mt-3 max-h-96 gap-2 opacity-100" : "max-h-0 gap-0 opacity-0"
          }`}
        >
          {visibleItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl border px-3 py-2 transition",
                  activeHref === item.href
                    ? "border-brand-200/45 bg-brand-700/35 text-brand-100"
                    : "border-brand-200/15 bg-brand-950/70 text-brand-100/85 hover:bg-brand-700/30",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
