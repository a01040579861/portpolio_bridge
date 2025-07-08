"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { companyHistories, CompanyHistory } from "@/types/history";

const Profile = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]); // 내용 참조 배열
  // Work History 상세정보 안내 텍스트 ref
  const workHistoryDetailRef = useRef<HTMLSpanElement>(null);
  // 모달 상태 및 선택된 회사
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyHistory | null>(
    null
  );
  const workHistoryTitleRef = useRef<HTMLHeadingElement>(null);
  const [showWorkHistoryTip, setShowWorkHistoryTip] = useState(false);

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

    // Work History 상세정보 안내 텍스트 애니메이션
    if (workHistoryDetailRef.current) {
      tl.to(
        workHistoryDetailRef.current,
        {
          opacity: 1,
          y: -10,
          duration: 0.7,
          ease: "power2.out",
        },
        "+=0.2" // 기존 애니메이션 끝나고 약간의 딜레이
      ).to(
        workHistoryDetailRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 1.2,
          ease: "power2.in",
        },
        "+=1.0" // 1초 정도 보여주고 사라지게
      );
    }
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowWorkHistoryTip(true);
            setTimeout(() => setShowWorkHistoryTip(false), 2000);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (workHistoryTitleRef.current) {
      observer.observe(workHistoryTitleRef.current);
    }
    return () => {
      if (workHistoryTitleRef.current) {
        observer.unobserve(workHistoryTitleRef.current);
      }
    };
  }, []);

  // 모달이 열릴 때 외부 스크롤 방지
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  // 모달 오픈 함수
  const handleCompanyClick = (company: string) => {
    const found = companyHistories.find((c) => c.company === company);
    if (found) {
      setSelectedCompany(found);
      setModalOpen(true);
    }
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCompany(null);
  };

  return (
    <section className="w-full h-screen flex items-center justify-around text-[var(--light)] my-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-28 mx-auto flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-32 items-start">
        {/* 왼쪽: 이미지 (500px 이상에서만 표시) */}
        <div
          ref={imgRef}
          className="hidden sm:block w-[280px] sm:w-[300px] md:w-[330px] min-w-[280px] sm:min-w-[300px] md:min-w-[300px] h-auto rounded-xl shadow-lg overflow-hidden hover:shadow-custom transition-shadow duration-300 mx-auto"
        >
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-full h-full object-cover object-center bg-no-repeat"
          />
        </div>

        {/* 오른쪽 전체 */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 w-full">
          {/* 가운데: 소개글 */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-1/2">
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
                  // 회사명 부분만 span으로 감싸고 클릭 이벤트 연결
                  <span
                    key="ilogin"
                    className="text-[var(--light)] cursor-pointer hover:text-[var(--sub)] transition"
                    onClick={() => handleCompanyClick("아이로그인")}
                  >
                    2021.12 ~ 2022.05 아이로그인
                  </span>,
                  <span
                    key="banco"
                    className="text-[var(--light)] cursor-pointer hover:text-[var(--sub)] transition"
                    onClick={() => handleCompanyClick("주식회사 뱅코")}
                  >
                    2022.08 ~ 2023.08 주식회사 뱅코
                  </span>,
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
                ref={(el) => setContentRef(el, i)}
                className="section"
              >
                <h3
                  ref={
                    section.title === "Work History"
                      ? workHistoryTitleRef
                      : undefined
                  }
                  className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl select-none mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                >
                  {section.title}
                  {section.title === "Work History" && (
                    <span
                      className={`select-none ml-3 text-base text-[var(--sub2)] align-middle font-normal transition-opacity duration-500 text-shadow-custom ${
                        showWorkHistoryTip ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      경력 상세정보 보기 (기업명 클릭)
                    </span>
                  )}
                </h3>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed sm:leading-loose">
                  {section.lines.map((line, j) => (
                    <p key={j} className="mb-2 sm:mb-3 text-xl">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽: 스킬 목록 */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 w-full lg:w-1/2">
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
                <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl select-none mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                  {item.title}
                </h3>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed sm:leading-loose">
                  <p className="text-xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 회사 상세 모달 */}
      {modalOpen && selectedCompany && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center transition-opacity duration-300 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--main)] max-w-xl w-full max-h-[80%] overflow-y-auto relative animate-zoomIn rounded-lg flex flex-col p-8"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-3xl font-bold text-[var(--light)] hover:text-[var(--sub2)] duration-300"
            >
              ✕
            </button>
            <div className="text-3xl font-bold mb-2 text-[var(--sub2)]">
              {selectedCompany.company}
            </div>
            <div className="text-lg mb-2 text-gray-300">
              {selectedCompany.period} | {selectedCompany.position}
            </div>
            <div className="text-xl mb-4 text-[var(--light)]">
              {Array.isArray(selectedCompany.description)
                ? selectedCompany.description.map((desc, idx) => (
                    <div key={idx}>{desc}</div>
                  ))
                : selectedCompany.description}
            </div>
            {/* clientBasedProjects가 있을 때만 렌더링 */}
            {selectedCompany.clientBasedProjects &&
              selectedCompany.clientBasedProjects.length > 0 && (
                <div className="mb-4">
                  <div className="text-lg font-semibold text-[var(--sub2)] mb-2">
                    주요 클라이언트/프로젝트
                  </div>
                  <ul className="space-y-1">
                    {selectedCompany.clientBasedProjects.map((proj, idx) => (
                      <li key={idx} className="text-base text-gray-200">
                        {proj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            <ul className="list-disc space-y-2">
              {selectedCompany.details.map((d, idx) => (
                <li key={idx} className="text-base text-gray-200">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
