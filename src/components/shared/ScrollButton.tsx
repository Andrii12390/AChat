"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { RefObject } from "react";

interface ScrollButtonProps {
  containerRef: RefObject<HTMLDivElement>;
}

export const ScrollButton = ({ containerRef }: ScrollButtonProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const container = containerRef.current;
      if (container) {
        const scrolled = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        
        if (scrolled && scrolled < maxScroll - 10) setVisible(true);
        else setVisible(false);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", toggleVisible);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", toggleVisible);
      }
    };
  }, [containerRef]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={scrollToBottom}
      className={`${
        visible ? "block" : "hidden"
      } text-white fixed right-2 bottom-16 p-2 rounded-full bg-blue-500/80 dark:bg-indigo-500/80 hover:opacity-90 transition-opacity`}
    >
      <ChevronDown />
    </button>
  );
};

