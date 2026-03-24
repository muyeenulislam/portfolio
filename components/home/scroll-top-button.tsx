"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed right-4 bottom-5 z-70 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200/35 bg-black/60 text-brand-100 shadow-xl shadow-black/60 backdrop-blur-md transition-all hover:scale-105 hover:bg-brand-700/35 sm:right-6 sm:bottom-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FiArrowUp size={"1.125rem"} />
    </button>
  );
}
