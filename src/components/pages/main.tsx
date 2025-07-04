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
    <section className="w-full h-screen flex items-center justify-around text-[var(--light)] my-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full h-screen flex flex-col sm:flex-row justify-center sm:justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-32">
        {/* 500px 미만에서만 원형 애니메이션을 텍스트 위쪽에 배치 */}
        <div className="sm:hidden flex justify-center items-center mt-4 mb-3">
          <img
            src="/intro-ring.png"
            alt="Full Stack Developer Seong-il"
            className="w-[150px] h-[150px] object-contain animate-spin-slow"
          />
        </div>

        <div className="text-[var(--light)] space-y-2 sm:space-y-3 md:space-y-4 text-center sm:text-left">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl leading-normal font-light select-none">
            <span ref={(el) => setLineRef(el, 0)}>
              사람을 이해하려 투자한 8년이라는 시간
            </span>
            <br />
            <span
              ref={(el) => setLineRef(el, 1)}
              className="text-base sm:text-xl md:text-2xl"
            >
              그렇게 사람을 이해했고 이제는 사람과 기술을 연결하고 싶은
            </span>
            <br />
            <span
              ref={(el) => setLineRef(el, 2)}
              className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl block"
            >
              Frontend Developer 이성일
            </span>
            <span className="block mt-4 sm:mt-6 md:mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl font-medium inline-flex items-center justify-center sm:justify-start">
              <span ref={projectTextRef} className="text-[var(--light)]">
                Project Completed
              </span>
              <span
                ref={numberRef}
                className="ml-2 sm:ml-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl font-extrabold text-[var(--sub2)]"
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

        {/* 500px 이상에서 원형 애니메이션을 오른쪽에 배치 */}
        <div className="hidden sm:flex self-stretch mt-10">
          <img
            src="/intro-ring.png"
            alt="Full Stack Developer Seong-il"
            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 object-contain animate-spin-slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
