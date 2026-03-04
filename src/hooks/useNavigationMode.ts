"use client";

import { useState, useEffect } from "react";

export type NavigationMode = "sidebar" | "bottom-tab" | "top-bar";

export const useNavigationMode = (): NavigationMode => {
  const [mode, setMode] = useState<NavigationMode>("sidebar");

  useEffect(() => {
    function determine() {
      const width = window.innerWidth;
      // const ratio = width / window.innerHeight;

      if (width < 768) {
        // Mobile: always bottom tabs regardless of orientation
        setMode("bottom-tab");
      } else if (width < 1024) {
        // Desktop: sidebar, but if very wide & short (ultrawide), still sidebar
        setMode("sidebar");
      } else {
        // Tablet: top bar with hamburger
        setMode("top-bar");
      }
    }

    determine();
    window.addEventListener("resize", determine);
    return () => window.removeEventListener("resize", determine);
  }, []);

  return mode;
};
