"use client";

import Image from "next/image";

import type { NavItem, SocialLink } from "@/data/cvData";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";

type FooterProps = {
  name: string;
  logo: string;
  navItems: ReadonlyArray<NavItem>;
  socials: ReadonlyArray<SocialLink>;
};

export function Footer({ name, logo, navItems, socials }: FooterProps) {
  const visibleItems = navItems.filter((item) => item.href !== "#top");
  const activeHref = useActiveSection(visibleItems.map((item) => item.href));

  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-8 pt-6 sm:px-6 lg:px-10">
      <div className="rounded-3xl border border-brand-200/20 bg-black/45 p-5 backdrop-blur-md sm:p-6">
        <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="relative block h-14 w-14 overflow-hidden rounded-2xl border border-brand-200/30">
            <Image
              src={logo}
              alt="Footer logo"
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {visibleItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  activeHref === item.href
                    ? "border-brand-200/55 bg-brand-700/30 text-brand-100"
                    : "border-brand-200/20 text-brand-200/85 hover:border-brand-200/55 hover:text-brand-100",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-200/20 px-3 py-1.5 text-xs text-brand-200/85 transition hover:border-brand-200/55 hover:text-brand-100"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-brand-200/65 sm:text-sm">
          {new Date().getFullYear()} {name}. Crafted with Next.js, Tailwind CSS,
          and TypeScript.
        </p>
      </div>
    </footer>
  );
}
