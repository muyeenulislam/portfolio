"use client";

import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import type { NavItem } from "@/data/cvData";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";
import Link from "next/link";

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
      <nav className="relative isolate mx-auto mt-4 flex w-[min(70rem,calc(100%-1rem))] items-center gap-3 rounded-2xl border border-brand-200/25 bg-black/35 px-3 py-2.5 shadow-md backdrop-blur-xl sm:px-4">
        <Link
          href="#top"
          className="group relative block h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-brand-200/35"
        >
          <Image
            src={logo}
            alt="Site logo"
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="2.75rem"
          />
          <span className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </Link>
        <ul className="hidden flex-1 items-center justify-end gap-1 text-sm md:flex">
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
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-200/30 bg-brand-700/20 text-brand-100 transition hover:bg-brand-700/40 md:hidden"
          onClick={() => setOpen((previous) => !previous)}
        >
          {open ? <FiX size={"1.125rem"} /> : <FiMenu size={"1.125rem"} />}
        </button>
        <div
          className={`absolute inset-x-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-brand-200/20 shadow-2xl shadow-black/60 transition-all duration-300 md:hidden bg-brand-950/80 ${
            open
              ? "max-h-96 opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="absolute inset-0 -z-10  backdrop-blur-2xl " />
          <ul className="grid gap-2 p-3 text-sm">
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
        </div>
      </nav>
    </header>
  );
}
