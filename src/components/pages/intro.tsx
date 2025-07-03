"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const BRIDGE_LETTERS = ["B", "R", "I", "D", "G", "E"];

const Intro = () => {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHidden = useRef(false);

  useEffect(() => {
    // 등장 애니메이션
    gsap.from(letterRefs.current, {
      y: 80,
      opacity: 0,
      stagger: 0.12,
      ease: "back.out(1.7)",
      duration: 1.2,
    });
    gsap.from(circleRefs.current, {
      y: -40,
      opacity: 0,
      stagger: 0.12,
      ease: "power2.out",
      duration: 1.1,
      delay: 0.3,
    });

    // 스크롤 이벤트로 사라짐/복귀 애니메이션
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100 && !isHidden.current) {
        isHidden.current = true;
        gsap.to(letterRefs.current, {
          y: -100,
          opacity: 0,
          stagger: 0.08,
          ease: "power2.in",
          duration: 0.7,
        });
        gsap.to(circleRefs.current, {
          y: -80,
          opacity: 0,
          stagger: 0.08,
          ease: "power2.in",
          duration: 0.6,
        });
      } else if (scrollY <= 100 && isHidden.current) {
        isHidden.current = false;
        gsap.to(letterRefs.current, {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          duration: 0.7,
        });
        gsap.to(circleRefs.current, {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          duration: 0.6,
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-transparent select-none">
      {/* 다리 구조: 원 + 글자 */}
      <div className="flex flex-row items-end gap-4 md:gap-8 relative z-10">
        {BRIDGE_LETTERS.map((char, i) => (
          <div key={char} className="flex flex-col items-center group">
            {/* 다리 위 원 */}
            <div
              ref={(el) => {
                circleRefs.current[i] = el;
              }}
              className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-sub2 mb-2 shadow-lg transition-transform duration-300 group-hover:scale-125 group-hover:from-sub2 group-hover:to-primary"
            />
            {/* 글자 */}
            <span
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-primary to-sub2 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:text-[var(--sub2)]"
            >
              {char}
            </span>
            {/* 다리 기둥 (선) */}
            <div className="w-1 h-12 md:h-20 bg-gradient-to-b from-primary to-sub2 mt-2 rounded-full opacity-80" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Intro;
