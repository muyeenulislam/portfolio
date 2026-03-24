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

    let ticking = false;

    const updateActive = () => {
      const offset = window.innerHeight * 0.28;
      let current = targets[0];

      for (const href of targets) {
        const section = document.querySelector<HTMLElement>(href);
        if (!section) continue;
        if (section.getBoundingClientRect().top - offset <= 0) {
          current = href;
        }
      }

      setActiveHref((previous) => (previous === current ? previous : current));
    };

    const updateFromHash = () => {
      const hash = window.location.hash;
      if (targets.includes(hash)) {
        setActiveHref((previous) => (previous === hash ? previous : hash));
        return;
      }
      updateActive();
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateFromHash();

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || !targets.includes(hash)) return;
      setActiveHref((previous) => (previous === hash ? previous : hash));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("hashchange", updateFromHash);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", updateFromHash);
      document.removeEventListener("click", handleClick);
    };
  }, [targets]);

  return activeHref;
}
