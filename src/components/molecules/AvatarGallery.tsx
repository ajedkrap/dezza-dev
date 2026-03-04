"use client";

import { useSyncExternalStore, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getStorageUrl } from "@/lib/supabase";
import { motion } from "motion/react";

const AVATAR_FILES = [
  "ghibli",
  "pixar",
  "simpsons",
  "one-piece",
  "dragonball",
  "lego-3d",
  "marvel-comic",
  "van-gogh",
  "rick-and-morty",
  "disney-2d",
  "naruto",
  "clay-motion",
  "anime",
  "anime-2",
  "asterix",
  "boku-no-hero",
  "capt-tsubasa",
  "caricature",
  "cupcake",
  "demon-slayer",
  "doraemon",
  "final-fantasy",
  "lego-2d",
  "manga",
  "one-piece-2",
  "picasso",
  "pixel",
  "roblox",
  "steven-universe",
  "tintin",
  "upin-ipin",
];
const styleAvatars = AVATAR_FILES.map((file) =>
  getStorageUrl(`avatars/${file}.png`),
);
const ORIGINAL = getStorageUrl("avatars/original.png");
const GALLERY_SIZE = 7;

function shufflePick(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Stable gallery: original only on server, shuffled picks on client
const serverGallery = [ORIGINAL];
const clientGallery = [ORIGINAL, ...shufflePick(styleAvatars, GALLERY_SIZE)];

const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

interface AvatarGalleryProps {
  size?: "md" | "lg";
  animate?: boolean;
  className?: string;
}

const AvatarGallery = ({
  size = "lg",
  animate = true,
  className,
}: AvatarGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isClient = useIsClient();
  const gallery = isClient ? clientGallery : serverGallery;

  const sizeClass = size === "lg" ? "h-36 w-36 md:h-44 md:w-44" : "h-28 w-28";
  const imgSizes = size === "lg" ? "176px" : "112px";

  const content = (
    <div
      className={cn("relative", sizeClass, className)}
      onMouseLeave={() => setActiveIndex(0)}
    >
      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent-purple/20"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* Image stack */}
      <div className="relative h-full w-full overflow-hidden rounded-full border border-accent-purple/30">
        {gallery.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Avatar"
            fill
            sizes={imgSizes}
            className={cn(
              "object-cover transition-opacity duration-300",
              i === activeIndex ? "opacity-100" : "opacity-0",
            )}
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Invisible hover columns */}
      <div className="absolute inset-0 z-10 flex overflow-hidden rounded-full">
        {gallery.map((_, i) => (
          <div
            key={i}
            className="h-full flex-1"
            onMouseEnter={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      className="relative shrink-0"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {content}
    </motion.div>
  );
};

export default AvatarGallery;
