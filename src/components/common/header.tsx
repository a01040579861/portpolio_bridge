"use client";
import { useEffect, useState } from "react";
import type { HeaderProps } from "@/types/click";

const Header = ({ onNavigate }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-20 py-6 transition-all duration-500 ease-out ${
        isScrolled ? "header-glass shadow-header" : "bg-transparent"
      }`}
    >
      <div
        className={`text-5xl font-bold cursor-pointer transition-all duration-300 ${
          isScrolled ? "text-white drop-shadow-lg" : "text-[var(--light)]"
        }`}
      >
        Bridge
      </div>
      <div
        className={`flex space-x-6 text-3xl cursor-pointer transition-all duration-300 ${
          isScrolled ? "text-white/90" : "text-[var(--light)]"
        }`}
      >
        <div
          className={`hover:text-sub2 transition-all duration-300 ${
            isScrolled ? "hover:text-blue-400 hover:scale-105" : ""
          }`}
          onClick={() => onNavigate("profile")}
        >
          PROFILE
        </div>
        <div
          className={`hover:text-sub2 transition-all duration-300 ${
            isScrolled ? "hover:text-blue-400 hover:scale-105" : ""
          }`}
          onClick={() => onNavigate("project")}
        >
          PROJECT
        </div>

        <div
          className={`hover:text-sub2 transition-all duration-300 ${
            isScrolled ? "hover:text-blue-400 hover:scale-105" : ""
          }`}
          onClick={() => onNavigate("point")}
        >
          POINT
        </div>
      </div>
    </div>
  );
};

export default Header;
