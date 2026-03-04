"use client";

import { useEffect, useRef, useState } from "react";

interface RefractionPos {
  x: number; // 0–1
  y: number; // 0–1
}

// iOS extends DeviceOrientationEvent with a static permission API
interface DeviceOrientationEventIOS {
  requestPermission?: () => Promise<"granted" | "denied">;
}

export function useRefraction() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<RefractionPos>({ x: 0.3, y: 0 }); // default = current static position

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // --- Desktop: mouse tracking ---
    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setPos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    el.addEventListener("mousemove", handleMouse);

    // --- Mobile: gyroscope ---
    let gyroActive = false;

    const startGyro = () => {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        const gamma = e.gamma ?? 0; // left/right tilt (-90 to 90)
        const beta = e.beta ?? 0;   // front/back tilt (-180 to 180)
        const x = (gamma + 45) / 90; // normalize to 0–1
        const y = Math.max(0, Math.min(1, (beta - 20) / 60)); // 20°–80° → 0–1
        setPos({ x: Math.max(0, Math.min(1, x)), y });
      };
      window.addEventListener("deviceorientation", handleOrientation);
      gyroActive = true;
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    };

    // Check if mobile (no hover support)
    let cleanupGyro: (() => void) | undefined;
    if (window.matchMedia("(hover: none)").matches) {
      // iOS requires permission
      const DOE = DeviceOrientationEvent as unknown as DeviceOrientationEventIOS;
      if (typeof DOE.requestPermission === "function") {
        // Permission will be requested on first user interaction
        const requestOnce = () => {
          DOE.requestPermission?.().then((result) => {
            if (result === "granted") cleanupGyro = startGyro();
          });
          el.removeEventListener("touchstart", requestOnce);
        };
        el.addEventListener("touchstart", requestOnce, { once: true });
      } else {
        cleanupGyro = startGyro();
      }
    }

    return () => {
      el.removeEventListener("mousemove", handleMouse);
      cleanupGyro?.();
    };
  }, []);

  // Set CSS custom properties on the element
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--refract-x", `${(pos.x * 100).toFixed(1)}%`);
    el.style.setProperty("--refract-y", `${(pos.y * 100).toFixed(1)}%`);
  }, [pos]);

  return ref;
}
