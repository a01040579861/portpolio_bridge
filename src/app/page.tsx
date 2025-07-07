"use client";
import Header from "@/components/common/Header";
import Main from "@/components/pages/Main";
import Intro from "@/components/pages/Intro";
import LogoSlider from "@/components/LogoSlider";
import Profile from "@/components/pages/Profile";
import Project from "@/components/pages/Project";
import Point from "@/components/pages/Point";
import ScrollToUp from "@/components/ScrollToUp";
import { useRef } from "react";
import { SectionName } from "@/types/click";

const logos1 = [
  "html",
  "css",
  "js",
  "react",
  "redux",
  "ajax",
  "jquery",
  "sass",
  "styled-component",
  "tailwind",
];
const logos2 = [
  "axios",
  "gsap",
  "next",
  "react_query",
  "supabase",
  "ts",
  "zustand",
  "git",
  "sqlite",
];
const logos3 = [
  "aws",
  "firebase",
  "firestore",
  "mariaDB",
  "mongoDB",
  "mysql",
  "netlify",
  "postman",
];
const logos4 = [
  "androidstudio",
  "api",
  "bs4",
  "express",
  "java",
  "jupyter",
  "kotlin",
  "node",
  "php",
  "python",
  "requests",
  "selenium",
];

const Home = () => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (section: SectionName) => {
    const refs = {
      intro: introRef,
      profile: profileRef,
      project: projectRef,
      contact: contactRef,
    };

    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full">
      <div ref={introRef}>
        <Intro />
      </div>
      {/* 헤더 & 첫화면 */}
      <Header onNavigate={scrollTo} />
      <Main />

      {/* 첫 번째 슬라이드 */}
      <div className="w-full h-full">
        <LogoSlider
          logos={logos1}
          folder="logo_1"
          direction="left"
          speed={100}
        />
      </div>
      {/* 프로필 */}
      <div ref={profileRef}>
        <Profile />
      </div>

      {/* 두 번째 슬라이드 */}
      <div className="w-full h-full">
        <LogoSlider
          logos={logos2}
          folder="logo_2"
          direction="right"
          speed={100}
        />
      </div>
      {/* 프로젝트 */}
      <div ref={projectRef}>
        <Project />
      </div>
      {/* 세 번째 슬라이드 */}
      <div className="w-full h-full">
        <LogoSlider
          logos={logos3}
          folder="logo_3"
          direction="left"
          speed={100}
        />
      </div>

      <div ref={contactRef}>
        <Point />
      </div>
      {/* 네 번째 슬라이드 */}
      <div className="w-full h-full">
        <LogoSlider
          logos={logos4}
          folder="logo_4"
          direction="right"
          speed={100}
        />
      </div>
      <ScrollToUp />
    </main>
  );
};

export default Home;
