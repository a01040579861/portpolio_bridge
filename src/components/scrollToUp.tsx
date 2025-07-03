"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToUp = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-16 right-28 p-3 rounded-full bg-[var(--main)] text-[var(--light)] shadow-lg hover:bg-[var(--light)]-600 transition-all duration-500"
        aria-label="Scroll to top"
      >
        <ArrowUp />
      </button>
    )
  );
};

export default ScrollToUp;
