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
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    if (targets.length === 0) return;

    const heroSection = document.querySelector<HTMLElement>("#top");
    const sections = targets
      .map((href) => {
        const element = document.querySelector<HTMLElement>(href);
        if (!element) return null;
        return { href, element };
      })
      .filter((item): item is { href: string; element: HTMLElement } => item !== null);

    let ticking = false;

    const updateActive = () => {
      const offset = window.innerHeight * 0.28;
      if (heroSection && heroSection.getBoundingClientRect().bottom > offset) {
        setActiveHref((previous) => (previous === "" ? previous : ""));
        return;
      }

      let current = "";

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top - offset <= 0) {
          current = section.href;
        }
      }

      setActiveHref((previous) => (previous === current ? previous : current));
    };

    const updateFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#top" || hash === "") {
        setActiveHref((previous) => (previous === "" ? previous : ""));
        return;
      }
      if (targets.includes(hash)) {
        window.requestAnimationFrame(updateActive);
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
      if (!hash) return;
      if (hash === "#top") {
        setActiveHref((previous) => (previous === "" ? previous : ""));
        return;
      }
      if (!targets.includes(hash)) return;
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
