"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Generates a convex lens displacement map using Snell's Law refraction.
 * Returns a base64 data URL of a canvas image where:
 *   R channel = x displacement (128 = none, 0/255 = max left/right)
 *   G channel = y displacement (128 = none, 0/255 = max up/down)
 */
function generateDisplacementMap(resolution = 64): string {
  const canvas = document.createElement("canvas");
  canvas.width = resolution;
  canvas.height = resolution;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(resolution, resolution);
  const data = imageData.data;

  const center = resolution / 2;
  const radius = resolution / 2;
  const nRatio = 1.0 / 1.5; // air / glass refractive index
  const curvature = 1.2;

  // First pass: compute displacement vectors
  const displacements: [number, number][] = [];
  let maxDisp = 0;

  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy) / radius;

      // Outside the lens — no displacement
      if (dist >= 0.95) {
        displacements.push([0, 0]);
        continue;
      }

      // Parabolic lens surface slope → surface angle
      const slope = curvature * dist;
      const surfaceAngle = Math.atan(slope);

      // Snell's law: n1 * sin(θ1) = n2 * sin(θ2)
      const sinRefracted = nRatio * Math.sin(surfaceAngle);
      if (Math.abs(sinRefracted) >= 1) {
        displacements.push([0, 0]);
        continue;
      }

      const refractedAngle = Math.asin(sinRefracted);
      // Displacement = difference in ray paths, faded at edges
      const magnitude =
        (Math.tan(surfaceAngle) - Math.tan(refractedAngle)) *
        (1 - dist * dist);

      const angle = Math.atan2(dy, dx);
      const vx = Math.cos(angle) * magnitude;
      const vy = Math.sin(angle) * magnitude;

      displacements.push([vx, vy]);
      maxDisp = Math.max(maxDisp, Math.abs(vx), Math.abs(vy));
    }
  }

  // Second pass: normalize to 8-bit channels (128 = neutral)
  for (let i = 0; i < displacements.length; i++) {
    const [vx, vy] = displacements[i];
    const px = i * 4;
    data[px] =
      maxDisp > 0 ? Math.round(128 + (vx / maxDisp) * 127) : 128; // R
    data[px + 1] =
      maxDisp > 0 ? Math.round(128 + (vy / maxDisp) * 127) : 128; // G
    data[px + 2] = 128; // B (unused)
    data[px + 3] = 255; // A
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

/**
 * Global SVG filter for liquid glass refraction.
 * - Chrome/Chromium: adds `liquid-glass` class to <html> + renders SVG filter
 * - Other browsers: renders nothing, CSS fallback to blur()
 */
const LiquidGlassFilter = () => {
  const isChromium = useSyncExternalStore(
    noopSubscribe,
    () => "chrome" in window,
    () => false,
  );

  const mapUrl = useMemo(
    () => (isChromium ? generateDisplacementMap(64) : null),
    [isChromium],
  );

  useEffect(() => {
    if (!isChromium) return;
    document.documentElement.classList.add("liquid-glass");
    return () => {
      document.documentElement.classList.remove("liquid-glass");
    };
  }, [isChromium]);

  if (!mapUrl) return null;

  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="liquid-glass-filter"
          colorInterpolationFilters="sRGB"
          filterUnits="objectBoundingBox"
          primitiveUnits="objectBoundingBox"
          x="0"
          y="0"
          width="1"
          height="1"
        >
          {/* Displacement map stretched to element bounds */}
          <feImage
            href={mapUrl}
            x="0"
            y="0"
            width="1"
            height="1"
            preserveAspectRatio="none"
            result="dispMap"
          />
          {/* Apply refraction — scale is in bounding box units (~6% displacement) */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="dispMap"
            scale="0.06"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilter;
