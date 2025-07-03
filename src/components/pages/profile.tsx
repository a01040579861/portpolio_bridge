"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const Profile = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]); // 내용 참조 배열

  // ref 콜백 함수로 값 설정
  const setContentRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      contentRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.out" },
    });

    // 이미지 애니메이션 (위에서 아래로 내려오는 애니메이션)
    if (imgRef.current) {
      tl.from(imgRef.current, {
        y: -400,
        opacity: 0,
      });
    }

    // 텍스트 애니메이션 (오른쪽에서 왼쪽으로 슬라이드)
    contentRefs.current.forEach((el, idx) => {
      if (el) {
        tl.from(
          el,
          {
            x: 400,
            opacity: 0,
          },
          `-=${idx === 0 ? 0.5 : 0.3}` // 인덱스에 따른 애니메이션 딜레이
        );
      }
    });
  }, []);

  return (
    <section className="w-full h-screen flex items-center justify-around text-[var(--light)] my-10 px-6">
      <div className="px-28 mx-auto flex flex-col md:flex-row gap-10 md:gap-32 items-start">
        {/* 왼쪽: 이미지 */}
        <div
          ref={imgRef}
          className="w-[330px] min-w-[300px] h-auto rounded-xl shadow-lg overflow-hidden hover:shadow-custom transition-shadow duration-300"
        >
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-full h-full object-cover object-center bg-no-repeat "
          />
        </div>

        {/* 오른쪽 전체 */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* 가운데: 소개글 */}
          <div className="space-y-6">
            {[
              {
                title: "Education",
                lines: [
                  "2009.03 ~ 2012.03 서울성동고등학교",
                  "2025.08 ~ 학점은행제 / 방송통신대학교",
                ],
              },
              {
                title: "Work History",
                lines: [
                  "2021.12 ~ 2022.05 아이로그인",
                  "2022.08 ~ 2023.08 주식회사 뱅코",
                ],
              },
              {
                title: "My Hobby",
                lines: [
                  "헬스는 단순한 운동을 넘어서 저에게는 집중력과 루틴을 지키는 힘을 줍니다.",
                  "무게를 통해 스트레스를 내려놓는, 나만의 리셋 시간입니다.",
                ],
              },
            ].map((section, i) => (
              <div
                key={i}
                ref={(el) => setContentRef(el, i)} // useCallback을 통한 ref 설정
                className="section"
              >
                <h3 className="font-semibold text-5xl select-none mb-6">
                  {section.title}
                </h3>
                <div className="text-2xl leading-loose">
                  {section.lines.map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽: 스킬 목록 */}
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                title: "Languages",
                desc: "Javascript, Typescript, Java, Kotlin, Python, PHP, HTML5, CSS, Node.js",
              },
              {
                title: "Libraries",
                desc: "React.js, Redux, Redux Toolkit, Zustand, jQuery, Recoil, React Query, BeautifulSoup4, Selenium",
              },
              {
                title: "Frameworks",
                desc: "Next.js, Android, Express",
              },
              {
                title: "Cloud Platforms",
                desc: "AWS(EC2, S3), Netlify, Firebase, Vercel",
              },
              {
                title: "Databases",
                desc: "MySQL, MongoDB, MariaDB, Firebase, SQLite, Supabase, PHPMyAdmin",
              },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => setContentRef(el, i + 3)} // 기존 섹션 3개 후부터 시작
                className="skill-item"
              >
                <h3 className="font-semibold text-5xl select-none mb-6">
                  {item.title}
                </h3>
                <div className="text-2xl leading-loose">
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
