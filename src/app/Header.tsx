"use client";

// HOOKS
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import LineMdCloseToMenuAltTransition from "@/components/svgs/LineMdCloseToMenuAltTransition";
import LineMdMenuToCloseAltTransition from "@/components/svgs/LineMdMenuToCloseAltTransition";
import SolarCart4Outline from "@/components/svgs/SolarCart4Outline";
import IconamoonSearchThin from "@/components/svgs/IconamoonSearchThin";
import EpUser from "@/components/svgs/EpUser";

export default function Header({ ...props }) {
  const [isWindowScrolled, setIsWindowScrolled] = useState(false);
  const headerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const y = window.scrollY;

    if (y <= 100) return setIsWindowScrolled(false);
    setIsWindowScrolled(true);
  };

  return (
    <header
      className={`
        sticky top-0 flex flex-row items-center mx-auto gap-4 px-4 py-4 z-[1000]
        before:content-[''] before:absolute before:top-0 before:left-1/2 before:translate-x-[-50%] 
        before:w-[100vw] before:h-full before:z-[-1] 
        transition-all ease-out duration-300
        before:transition-all before:ease-out before:duration-300
        ${
          isWindowScrolled
            ? "bg-primary before:bg-primary"
            : "bg-transparent before:bg-transparent"
        }
      `}
      ref={headerRef}
      {...props}
    >
      <LineMdCloseToMenuAltTransition
        className="text-heading-invert"
        width={24}
        height={24}
      />
      <div className="relative mx-auto">
        <span
          className={`
            absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]
            text-heading-invert text-2xl text-bold z-10
            transition-all ease-in-out duration-500
            ${
              isWindowScrolled
                ? "top-1/2 scale-[100%]"
                : "top-[calc(100%+120px)] scale-[200%]"
            }
          `}
        >
          RANOURA
        </span>
      </div>
      <IconamoonSearchThin
        className="text-heading-invert"
        width={24}
        height={24}
      />
      <EpUser className="text-heading-invert" width={24} height={24} />
      <SolarCart4Outline
        className="text-heading-invert"
        width={24}
        height={24}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        fill="currentColor"
        className={`
          absolute left-1/2 translate-x-[-50%] top-full w-[100vw] text-primary
          transition-all ease-out duration-300
          ${
            isWindowScrolled
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >
        <path
          d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
          opacity=".5"
        ></path>
        <path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path>
      </svg>
    </header>
  );
}
