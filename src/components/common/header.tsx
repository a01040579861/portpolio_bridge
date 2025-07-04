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
      className={`fixed top-0 left-0 w-full z-50 flex justify-end items-center transition-all duration-500 ease-out ${
        isScrolled ? "header-glass shadow-header" : "bg-transparent"
      } px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-5 lg:px-16 lg:py-6 xl:px-20 xl:py-6`}
    >
      <div
        className={`flex space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 xl:space-x-6 cursor-pointer transition-all duration-300 ${
          isScrolled ? "text-white/90" : "text-[var(--light)]"
        } text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl`}
      >
        <div
          className={`hover:text-sub2 transition-all duration-300 ${
            isScrolled ? "hover:text-blue-400 hover:scale-105" : ""
          }`}
          onClick={() => onNavigate("profile")}
        >
          <span className="hidden sm:inline">PROFILE</span>
          <span className="sm:hidden">PROFILE</span>
        </div>
        <div
          className={`hover:text-sub2 transition-all duration-300 ${
            isScrolled ? "hover:text-blue-400 hover:scale-105" : ""
          }`}
          onClick={() => onNavigate("project")}
        >
          <span className="hidden sm:inline">PROJECT</span>
          <span className="sm:hidden">PROJECT</span>
        </div>
        <div
          className={`hover:text-sub2 transition-all duration-300 ${
            isScrolled ? "hover:text-blue-400 hover:scale-105" : ""
          }`}
          onClick={() => onNavigate("point")}
        >
          <span className="hidden sm:inline">POINT</span>
          <span className="sm:hidden">POINT</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
