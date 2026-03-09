"use client";

import { useSyncExternalStore, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getStorageUrl } from "@/lib/supabase";
import { motion } from "motion/react";

const AVATAR_FILES = [
  "2bit-pixel",
  "8bit-pixel",
  "arcane",
  "art-nouveau",
  "art-paper",
  "ascii",
  "asterix",
  "attack-on-titan",
  "banksy-cardboard",
  "banksy-wall",
  "beavis-and-buthead",
  "bleach",
  "blueprint",
  "boku-no-hero",
  "borderlands",
  "brushwork",
  "capt-tsubasa",
  "carricature",
  "caucasian",
  "chalkboard",
  "claymation",
  "corporate-memphis",
  "cowboy-bebop",
  "crayon-shinchan",
  "cupcake",
  "cuphead",
  "datamosh",
  "demon-slayer",
  "detective-conan",
  "disney-2d",
  "disney-3d",
  "doraemon",
  "dragonball",
  "dragonball-2",
  "edvard-munch",
  "family-guy",
  "final-fantasy",
  "frieren",
  "ghibli",
  "gta-v-loading",
  "jojo",
  "jujutsu-kaizen",
  "lego",
  "low-poly",
  "makoto-shinkai",
  "manga",
  "marvel",
  "minecraft",
  "mona-lisa",
  "naruto",
  "naruto-2",
  "noir",
  "old-photo",
  "one-piece-1",
  "one-piece-2",
  "one-punch-man",
  "osamu-tezuka",
  "picasso",
  "pixar",
  "pixar-2",
  "rick-and-morty",
  "roblox",
  "sin-city",
  "sketch",
  "spider-verse",
  "stained-glass",
  "steven-universe",
  "steven-universe-2",
  "sumi-e",
  "surrealism",
  "surrealism-2",
  "synthwave",
  "takehiko-inoue",
  "the-simpsons",
  "tintin",
  "tron",
  "ukiyo-e",
  "upin-ipin",
  "upin-ipin-3",
  "van-gogh",
  "victorian",
  "voxel",
];
const styleAvatars = AVATAR_FILES.map((file) =>
  getStorageUrl(`new-avatars/${file}.webp`),
);
const ORIGINAL = getStorageUrl("new-avatars/original.webp");
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
  const imgSizes = size === "lg" ? "216px" : "144px";

  const content = (
    <div
      className={cn("relative", sizeClass, className)}
      onMouseLeave={() => setActiveIndex(0)}
    >
      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent-purple/20"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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
