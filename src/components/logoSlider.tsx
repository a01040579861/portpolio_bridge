"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { useRef, useState, useEffect, useLayoutEffect } from "react";

interface LogoSliderProps {
  logos: string[];
  folder: string;
  direction?: "left" | "right";
  speed?: number; // px/sec
}

const LogoSlider = ({
  logos,
  folder,
  direction = "left",
  speed = 100,
}: LogoSliderProps) => {
  const baseX = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dir, setDir] = useState(direction === "left" ? -1 : 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [maxOffset, setMaxOffset] = useState(0);

  // 측정
  useLayoutEffect(() => {
    if (containerRef.current && wrapperRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const wrapperWidth = wrapperRef.current.offsetWidth;
      setMaxOffset(wrapperWidth - containerWidth);
    }
  }, [logos]);

  // 방향 재설정 (direction prop이 바뀔 때만)
  useEffect(() => {
    setDir(direction === "left" ? -1 : 1);
  }, [direction]);

  // 애니메이션 진행
  useAnimationFrame((t, delta) => {
    if (!isPaused && maxOffset > 0) {
      const deltaInSeconds = delta / 1000;
      const currentX = baseX.get();
      const newX = currentX + dir * speed * deltaInSeconds;

      if (newX <= -maxOffset || newX >= 0) {
        setDir((prev) => -prev);
      } else {
        baseX.set(newX);
      }
    }
  });

  const x = useTransform(baseX, (latest) => `${latest}px`);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div ref={wrapperRef} className="flex gap-32 w-max" style={{ x }}>
        {/* 로고 2배로 복제 (너비 확보용) */}
        {[...logos, ...logos].map((name, idx) => (
          <img
            key={`${folder}-${name}-${idx}`}
            src={`/slideLogos/${folder}/${name}.png`}
            alt={name}
            className="h-10 sm:h-14 md:h-16 lg:h-20 xl:h-24 px-2 sm:px-3 cursor-pointer transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoSlider;
