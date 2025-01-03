// HOOKS
import { ReactNode } from "react";

// COMPONENTS
import FilmTape from "@/components/FilmTape";
import DisplayImg from "@/components/DisplayImg";
import BottomBorder from "@/components/svgs/BottomBorder";

// ASSETS
const badgePng = "/assets/img/badge.png";
const badge2Png = "/assets/img/badge2.png";
const cloudPng = "/assets/img/cloud.png";
const introVideo = "/assets/video/intro-video.mp4";

type Props = {
  className?: string;
};

export default function Hero({ className = "", ...props }: Props) {
  return (
    <section
      className={`
        relative z-[1] bg-primary h-[300px]
        ${className}
      `}
    > 
      <video 
          autoPlay muted loop 
          className="
            absolute bottom-0 left-0 w-full h-[calc(100%+60px)] object-cover 
          "
        >
          <source src={introVideo} />
      </video>
      <div
        className="
          absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary
        "
      >

      </div>
      <div
        className="
          absolute top-1/2 right-0 translate-y-[-50%] z-[10] 
          origin-center-right rotate-[45deg]
          scale-[50%] md:scale-[100%]
        "
      >
        <FilmTape
          className="
            test1
          "
        />
        <DisplayImg 
          className="absolute bottom-[6rem] w-[30rem] h-auto scale-[150%] rotate-[-45deg] drop-shadow-2xl"
          src={cloudPng}
          alt="Cloud"
        />
      </div>

      <DisplayImg
        className="
          absolute top-1/2 left-12 translate-y-[-50%]
          w-[150px] aspect-auto
          object-contain origin-top
          --rotate-ani duration--10s
          opacity-0 lg:opacity-100
        "
        src={badge2Png}
        alt="Badge"
      />
      <BottomBorder 
        className={`
          absolute left-1/2 translate-x-[-50%] top-full w-[100vw]
          text-primary scale-y-[100%] md:scale-y-[50%] origin-top
        `}        
      />    
    </section>
  );
}
