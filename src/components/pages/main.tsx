import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { projectData } from "@/data/projectData";

const Main = () => {
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const projectTextRef = useRef<HTMLSpanElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const [projectCount, setProjectCount] = useState(0);

  // ref 설정 함수
  const setLineRef = useCallback(
    (el: HTMLSpanElement | null, index: number) => {
      linesRef.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "power3.out" },
    });

    linesRef.current.forEach((line, index) => {
      if (line) {
        tl.from(
          line,
          {
            x: -500,
            opacity: 0,
            delay: index === 0 ? 0 : 0.7,
          },
          "<"
        );
      }
    });

    // Project Completed 텍스트 등장 (한 줄)
    if (projectTextRef.current) {
      tl.from(
        projectTextRef.current,
        {
          x: -300,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "+=0.2"
      );
    }

    // 숫자 opacity 0 → 1, 카운팅 애니메이션
    if (numberRef.current) {
      gsap.set(numberRef.current, { opacity: 0 });
      tl.to(
        numberRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
          onStart: () => {
            let obj = { val: 0 };
            gsap.to(obj, {
              val: projectData.length,
              duration: 1.2,
              ease: "power1.out",
              onUpdate: () => {
                setProjectCount(Math.floor(obj.val));
              },
              onComplete: () => {
                setProjectCount(projectData.length);
              },
            });
          },
        },
        ">-0.1"
      );
    }
  }, []);

  return (
    <section className="w-full h-screen flex items-center justify-around text-[var(--light)] my-10 px-6">
      <div className="w-full h-screen flex justify-between items-center px-32">
        <div className="text-[var(--light)] space-y-4">
          <p className="text-5xl leading-normal font-light select-none">
            <span ref={(el) => setLineRef(el, 0)}>
              사람을 이해하려 투자한 8년이라는 시간
            </span>
            <br />
            <span ref={(el) => setLineRef(el, 1)}>
              그렇게 사람을 이해했고 이제는 사람과 기술을 연결하고 싶은
            </span>
            <br />
            <span
              ref={(el) => setLineRef(el, 2)}
              className="font-semibold text-8xl block"
            >
              Full Stack Developer 이성일
            </span>
            <span className="block mt-8 text-4xl font-medium inline-flex items-center">
              <span ref={projectTextRef} className="text-[var(--light)]">
                Project Completed
              </span>
              <span
                ref={numberRef}
                className="ml-3 text-4xl font-extrabold text-[var(--sub2)]"
                style={{
                  textShadow: "0 0 12px #a259ff, 0 0 24px #fff, 0 0 2px #fff",
                  filter: "brightness(1.3)",
                }}
              >
                {projectCount}+
              </span>
            </span>
          </p>
        </div>
        <div className="md:flex self-stretch mt-10">
          <img
            src="/intro-ring.png"
            alt="Full Stack Developer Seong-il"
            className="w-[400px] h-[400px] mt-24 object-contain animate-spin-slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
