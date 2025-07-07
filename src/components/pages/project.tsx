"use client";

import { useState, useEffect } from "react";
import { projectData } from "@/data/projectData";
import {
  ProjectCategory,
  ProjectItem,
  PROJECT_CATEGORIES,
} from "@/types/project";

const categories: ProjectCategory[] = [
  PROJECT_CATEGORIES.ALL,
  PROJECT_CATEGORIES.TEAM_PROJECT,
  PROJECT_CATEGORIES.FRONTEND,
  PROJECT_CATEGORIES.BACKEND,
  PROJECT_CATEGORIES.UI_UX,
];

const Project = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(
    PROJECT_CATEGORIES.ALL
  );
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  // Google Drive URL을 embed URL로 변환하는 함수
  const convertToEmbedUrl = (url: string) => {
    if (url.includes("drive.google.com")) {
      // 파일 ID 추출
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return url;
  };

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
    setIsDetailOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // 컴포넌트 언마운트 시 복원
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  const filteredProjects: ProjectItem[] =
    selectedCategory === PROJECT_CATEGORIES.ALL
      ? projectData
      : projectData.filter((project) => project.category === selectedCategory);

  return (
    <section className="h-full grid place-items-center text-[var(--light)] my-10">
      <div className="text-center">
        <div className="text-6xl h-20 my-10 font-bold select-none">PROJECT</div>
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-5 my-6 text-base md:text-lg lg:text-xl xl:text-2xl text-center cursor-pointer">
          {categories.map((label, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCategory(label)}
              className={`w-auto px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 transition-all duration-300 
            ${
              selectedCategory === label
                ? "bg-[var(--main)] text-[var(--sub2)] shadow-md scale-105"
                : "bg-transparent text-[var(--light)]"
            }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-4">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => handleImageClick(index)}
            className="relative group w-[300px] h-[300px] overflow-hidden cursor-pointer hover:shadow-custom transition-shadow duration-300 bg-[var(--main)] flex items-center justify-center text-2xl font-bold"
          >
            <img
              src={project.media.thumbnail}
              alt={`${project.title} 썸네일`}
              className="object-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
            />

            {/* 테두리 애니메이션 */}
            <span className="absolute top-0 left-0 w-full h-[3px] bg-purple-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
            <span className="absolute top-0 left-0 h-full w-[3px] bg-purple-400 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out delay-100"></span>
            <span className="absolute bottom-0 right-0 w-full h-[3px] bg-purple-400 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-100"></span>
            <span className="absolute bottom-0 right-0 h-full w-[3px] bg-purple-400 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out delay-100"></span>
          </div>
        ))}
      </div>

      {/* 모달창 */}
      {modalOpen && selectedIndex !== null && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center transition-opacity duration-300 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black/60 max-w-[90%] w-full max-h-[80%] overflow-y-auto relative animate-zoomIn rounded-lg flex flex-col"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-4 text-3xl font-bold text-[var(--light)] hover:text-[var(--sub2)] duration-300"
            >
              ✕
            </button>
            <div className="text-2xl text-gray-400 mt-10 h-[auto] bg-[var(--main)] bg-opacity-10">
              {/* 드롭다운 헤더 */}
              <div
                onClick={() => setIsDetailOpen((prev) => !prev)}
                className="p-8 mb-4 text-3xl font-semibold cursor-default flex justify-between items-center text-[var(--light)]"
              >
                프로젝트 상세 정보
                <span className="text-2xl hover:text-[var(--sub2)] cursor-pointer transition">
                  {isDetailOpen ? "닫기" : "열기"}
                </span>
              </div>

              {/* 드롭다운 내용 - 항상 렌더링 + 상태에 따라 트랜지션 */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden bg-[var(--main)] bg-opacity-10 px-8 space-y-6 ${
                  isDetailOpen
                    ? "max-h-[2000px] opacity-100 py-8"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                <p className="text-5xl mb-10 font-bold text-[var(--light)]">
                  {filteredProjects[selectedIndex].description}
                </p>

                {/* 팀 프로젝트에서만 내 리더십/기여도/맡은 작업 표시 */}
                {filteredProjects[selectedIndex].isTeamProject && (
                  <>
                    {filteredProjects[selectedIndex].leadership && (
                      <div className="mb-4">
                        <div className="text-2xl font-semibold text-[var(--sub2)] mb-2">
                          리더십
                        </div>
                        <div className="text-lg text-gray-200">
                          {filteredProjects[selectedIndex].leadership}
                        </div>
                      </div>
                    )}
                    {filteredProjects[selectedIndex].contribution && (
                      <div className="mb-4">
                        <div className="text-2xl font-semibold text-[var(--sub2)] mb-2">
                          기여도
                        </div>
                        <div className="text-lg text-gray-200">
                          {filteredProjects[selectedIndex].contribution}
                        </div>
                      </div>
                    )}
                    {filteredProjects[selectedIndex].myTasks &&
                      filteredProjects[selectedIndex].myTasks.length > 0 && (
                        <div className="mb-4">
                          <div className="text-2xl font-semibold text-[var(--sub2)] mb-2">
                            맡은 작업
                          </div>
                          <ul className="list-disc space-y-1">
                            {filteredProjects[selectedIndex].myTasks.map(
                              (task, idx) => (
                                <li
                                  key={idx}
                                  className="text-base text-gray-200"
                                >
                                  {task}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </>
                )}

                {/* 프로젝트 기간 */}
                <p className="text-3xl mb-10 text-[var(--light)]">
                  <strong>프로젝트 기간:</strong>{" "}
                  {filteredProjects[selectedIndex].period.start} ~{" "}
                  {filteredProjects[selectedIndex].period.end || "진행 중"}
                  {filteredProjects[selectedIndex].period.duration && (
                    <span className="text-2xl text-gray-300 ml-4">
                      ({filteredProjects[selectedIndex].period.duration})
                    </span>
                  )}
                </p>

                {/* 프로젝트 참여인원 */}
                <div className="mb-10">
                  <p className="text-3xl mb-4 text-[var(--light)]">
                    <strong>프로젝트 참여인원:</strong>{" "}
                    {filteredProjects[selectedIndex].members.length}명
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProjects[selectedIndex].members.map(
                      (member, idx) => (
                        <div key={idx}>
                          <p className="text-2xl font-semibold text-[var(--light)]">
                            {member.name}
                          </p>
                          <p className="text-xl text-gray-300">{member.role}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* 기술 스택 */}
                <div className="mb-10">
                  <div className="text-2xl mb-4 font-semibold text-[var(--light)]">
                    기술 스택
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {filteredProjects[selectedIndex].techStack.map(
                      (tech, idx) => (
                        <span
                          key={idx}
                          className="bg-[var(--sub2)] text-[var(--light)] px-3 py-2 rounded-md text-lg hover:bg-[var(--sub)] duration-300 cursor-default"
                        >
                          {tech.name}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* 프로젝트 기능 */}
                <div className="mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProjects[selectedIndex].features.map(
                      (feature, idx) => (
                        <div key={idx}>
                          <h4 className="text-2xl font-semibold text-[var(--light)] mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-lg text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* 프로젝트 링크 */}
                {(filteredProjects[selectedIndex].links.github ||
                  filteredProjects[selectedIndex].links.live ||
                  filteredProjects[selectedIndex].links.figma) && (
                  <div className="mb-10">
                    <div className="text-2xl mb-4 font-semibold text-[var(--light)]">
                      프로젝트 링크
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {filteredProjects[selectedIndex].links.github && (
                        <a
                          href={filteredProjects[selectedIndex].links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[var(--sub2)] text-[var(--light)] px-4 py-2 rounded-md text-lg hover:bg-[var(--sub)] duration-300"
                        >
                          GitHub
                        </a>
                      )}
                      {filteredProjects[selectedIndex].links.live && (
                        <a
                          href={filteredProjects[selectedIndex].links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[var(--sub2)] text-[var(--light)] px-4 py-2 rounded-md text-lg hover:bg-[var(--sub)] duration-300"
                        >
                          Live Demo
                        </a>
                      )}
                      {filteredProjects[selectedIndex].links.figma && (
                        <a
                          href={filteredProjects[selectedIndex].links.figma}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[var(--sub2)] text-[var(--light)] px-4 py-2 rounded-md text-lg hover:bg-[var(--sub)] duration-300"
                        >
                          Figma
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* 프로젝트 태그 */}
                {filteredProjects[selectedIndex].tags &&
                  filteredProjects[selectedIndex].tags.length > 0 && (
                    <div className="mb-10">
                      <div className="text-2xl mb-4 font-semibold text-[var(--light)]">
                        태그
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {filteredProjects[selectedIndex].tags.map(
                          (tag, idx) => (
                            <span
                              key={idx}
                              className="bg-[var(--sub)] text-[var(--light)] cursor-default px-3 py-1 rounded-full text-lg hover:bg-[var(--sub2)] duration-300"
                            >
                              #{tag}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* 아키텍처 이미지 */}
                {filteredProjects[selectedIndex].architecture ? (
                  <div className="mb-10">
                    <div className="text-2xl mb-4 font-semibold text-[var(--light)]">
                      아키텍처
                    </div>
                    <img
                      src={filteredProjects[selectedIndex].architecture}
                      alt={`${filteredProjects[selectedIndex].title} 아키텍처`}
                      className="w-full max-w-2xl object-contain bg-no-repeat bg-center rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-2xl mb-10 font-semibold text-[var(--light)] cursor-default">
                    피그마 프로젝트
                  </div>
                )}
              </div>
            </div>

            {filteredProjects[selectedIndex] && (
              <div className="mt-6">
                {/* 비디오 or 이미지 조건 렌더링 */}
                {filteredProjects[selectedIndex].media.video ? (
                  filteredProjects[selectedIndex].media.video.includes(
                    "drive.google.com"
                  ) ? (
                    <iframe
                      src={convertToEmbedUrl(
                        filteredProjects[selectedIndex].media.video
                      )}
                      className="w-full h-[500px] rounded-lg mb-4"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={filteredProjects[selectedIndex].media.video}
                      controls
                      className="w-full rounded-lg mb-4"
                    />
                  )
                ) : (
                  <img
                    src={
                      filteredProjects[selectedIndex].media.images?.[0] ||
                      filteredProjects[selectedIndex].media.thumbnail
                    }
                    alt={filteredProjects[selectedIndex].title}
                    className="w-full object-contain rounded-lg mb-4"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Project;
