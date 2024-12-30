// HOOKS
import { ReactNode } from "react";

// COMPONENTS
import FilmTape from "@/components/FilmTape";
import DisplayImg from "@/components/DisplayImg";

// ASSETS
const badgePng = "/assets/img/badge.png";
const badge2Png = "/assets/img/badge2.png";
const cloud = "/assets/img/cloud.png";

type Props = {
  className?: string;
};

export default function Hero({ className = "", ...props }: Props) {
  return (
    <div
      className={`
        relative z-[1] bg-primary h-[300px]
        ${className}
      `}
    >
      <FilmTape
        className="
          absolute top-1/2 right-0 translate-y-[-50%]   
          origin-center-right rotate-[45deg]
          test1

        "
      />

      <DisplayImg
        className="
          absolute top-1/2 left-12 translate-y-[-50%]
          w-[150px] aspect-auto
          object-contain origin-top
          --rotate-ani duration--10s
        "
        src={badge2Png}
        alt="Badge"
      />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="currentColor"
          className={`
            absolute left-1/2 translate-x-[-50%] top-full w-[100vw] text-primary
          `}
        >
          <path
            d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
            opacity=".5"
          ></path>
          <path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path>
        </svg>
    </div>
  );
}
