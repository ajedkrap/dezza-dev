"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseDuration = 1800,
  loop = true,
}: UseTypewriterOptions) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const tick = useCallback(function tickFn() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Typing forward
      const nextText = currentWord.slice(0, text.length + 1);
      setText(nextText);

      if (nextText === currentWord) {
        // Finished typing — pause then start deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return;
      }
    } else {
      // Deleting
      const nextText = currentWord.slice(0, text.length - 1);
      setText(nextText);

      if (nextText === "") {
        setIsDeleting(false);
        const nextIndex = wordIndex + 1;
        if (nextIndex >= words.length) {
          if (!loop) return;
          setWordIndex(0);
        } else {
          setWordIndex(nextIndex);
        }
        return;
      }
    }

    timeoutRef.current = setTimeout(tickFn, isDeleting ? deleteSpeed : typeSpeed);
  }, [text, wordIndex, isDeleting, words, typeSpeed, deleteSpeed, pauseDuration, loop]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timeoutRef.current);
  }, [tick, isDeleting, deleteSpeed, typeSpeed]);

  return text;
}
