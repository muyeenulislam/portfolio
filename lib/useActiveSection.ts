"use client";

import { useEffect, useMemo, useState } from "react";

export function useActiveSection(hrefs: ReadonlyArray<string>) {
  const hrefKey = hrefs.join("|");
  const targets = useMemo(
    () =>
      hrefKey
        .split("|")
        .filter((href) => href.startsWith("#") && href.length > 1),
    [hrefKey],
  );
  const [activeHref, setActiveHref] = useState(targets[0] ?? "");

  useEffect(() => {
    if (targets.length === 0) return;

    const sections = targets
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.3, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveHref(targets[0]);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targets]);

  return activeHref;
}
