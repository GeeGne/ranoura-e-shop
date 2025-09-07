// HOOKS
import { ReactNode, useState, useRef } from "react";

// COMPONENTS
import FilmTape from "@/components/FilmTape";
import DisplayImg from "@/components/DisplayImg";
import BottomBorder from "@/components/svgs/BottomBorder";
import RanouraInstagramCurved from "@/components/svgs/RanouraInstagramCurved";
import RanouraInstagramCurvedV2 from "@/components/svgs/RanouraInstagramCurvedV2";
import LineMdPlayFilledToPauseTransition from "@/components/svgs/LineMdPlayFilledToPauseTransition";
import LineMdPauseToPlayFilledTransition from "@/components/svgs/LineMdPauseToPlayFilledTransition";
 
// ASSETS
const badgePng = "/assets/img/badge.png";
const badge2Png = "/assets/img/badge2.png";
const cloudPng = "/assets/img/cloud.png";
// const introVideo = "/assets/video/intro-video.mp4";
const introVideo = "/assets/video/intro-video(2).mp4";
const introVideoLowerRes = "/assets/video/Intro-Video(2)(24 frame)(720p).mp4";

type Props = {
  className?: string;
};

export default function Hero({ className = "", ...props }: Props) {

  const [ mainWrapperCoordinates, setMainWrapperCoordinates ] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [ isVideoPause, setIsVideoPause ] = useState<boolean>(false);
  const vidRef = useRef<HTMLVideoElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'main_wrapper':
        if (isVideoPause) {
          vidRef.current?.play()
        } else {
          vidRef.current?.pause()
        } 
        setIsVideoPause(val => !val);
        break;
      default:
        console.error("Unknown type:", type);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'main_wrapper':
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY- rect.top;

        setMainWrapperCoordinates({ x, y })
        break;
      default:
        console.error("Unknown type:", type);
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'main_wrapper':
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY- rect.top;

        setMainWrapperCoordinates({ x, y });
        break;
      default:
        console.error("Unknown type:", type);
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'main_wrapper':
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY- rect.top;

        setMainWrapperCoordinates({ x, y })
        break;
      default:
        console.error("Unknown type:", type);
    }
  }

  // DEBUG
  // console.log('x: ', x, 'y: ', y);

  return (
    <section
      className={`
        group relative z-[1] bg-primary cursor-default md:hover:cursor-none
        w-full h-svh
        ${className}
      `}
      data-type="main_wrapper"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    > 
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="
          absolute bottom-0 left-0 bg-primary
          w-full h-[calc(100%+100px)] object-cover 
        "
        ref={vidRef}
        preload="auto"
        onWaiting={() => console.log('waiting')}
        onCanPlay={() => console.log('canPlay')}
        onCanPlayThrough={() => console.log('canPlayThrought')}
      >
        <source
          media="(min-width: 768px)"
          src={introVideo} 
        />
        <source 
          media="(max-width: 768px)"
          src={introVideoLowerRes} 
        />
      </video>
      <div
        className="
          absolute bottom-0 left-0 w-full h-full 
          bg-gradient-to-t from-primary
        "
      />
      <div
        className="
          hidden absolute top-[80%] left-1/2 
          translate-y-[-50%] translate-x-[-50%] z-[10] 
          rotate-[80deg] origin-center
          scale-[100%] md:scale-[100%]
        "
      >
        <FilmTape
          className="
            test1
          "
        />
        <DisplayImg 
          className="hidden absolute bottom-[6rem] w-[30rem] h-auto scale-[150%] rotate-[-45deg] drop-shadow-2xl"
          src={cloudPng}
          alt="Cloud"
        />
      </div>
      <DisplayImg
        className="
          absolute hidden top-1/2 left-12 translate-y-[-50%]
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
          hidden absolute left-1/2 translate-x-[-50%] top-full w-[100vw]
          text-primary scale-x-[105%] scale-y-[50%] md:scale-y-[35%] lg:scale-y-[25%] origin-top
        `}        
      />
      <button
        className={`
          hidden md:inline absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] origin-center
          w-16 h-16 opacity-0 group-hover:opacity-100 cursor-none
          transition-opacity duration-300 ease-in 
        `}
        style={{top: mainWrapperCoordinates.y, left: mainWrapperCoordinates.x}}
      >
        <RanouraInstagramCurvedV2
          className="
            absolute top-1/2 left-1/2 origin-center text-heading-invert
            --rotate-translate-ani duration--5s w-full h-full z-[10]"
        />
        {isVideoPause 
          ? <LineMdPauseToPlayFilledTransition
              className=" 
                absolute top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] 
                text-heading-invert w-[2rem] h-[2rem] z-[10]
              "
            />
          : <LineMdPlayFilledToPauseTransition
              className=" 
                absolute top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] 
                text-heading-invert w-[2rem] h-[2rem] z-[10]
              "
            />
        }
        <div
          className=" 
            absolute top-1/2 left-1/2 
            translate-x-[-50%] translate-y-[-50%] 
            backdrop-invert-[100%] backdrop-contrast-[150%] backdrop-brightness-[130%]  w-full h-full rounded-full
            scale-[0%] group-active:scale-[120%]
            transition-all delay-100 duration-200 ease-in-out z-[15]
          "
        />
      </button>
      <button
        className={`
          inline md:hidden absolute top-[70%] left-4 translate-y-[-50%] origin-center
          w-16 h-16 
          transition-opacity duration-300 ease-in 
        `}
      >
        <RanouraInstagramCurvedV2
          className="
            absolute top-1/2 left-1/2 origin-center text-body-invert 
            --rotate-translate-ani duration--5s w-full h-full z-[10]"
        />
        {isVideoPause 
          ? <LineMdPauseToPlayFilledTransition
              className=" 
                absolute top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] 
                text-body-invert w-[2rem] h-[2rem] z-[10]
              "
            />

          : <LineMdPlayFilledToPauseTransition
              className=" 
                absolute top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] 
                text-body-invert w-[2rem] h-[2rem] z-[10]
              "
            />
        }
        <div
          className=" 
            absolute top-1/2 left-1/2 
            translate-x-[-50%] translate-y-[-50%] 
            backdrop-invert-[100%] backdrop-contrast-[150%] backdrop-brightness-[130%]  w-full h-full rounded-full
            scale-[0%] group-active:scale-[120%]
            transition-all delay-200 duration-200 ease-in-out z-[15]
          "
        />
      </button>
    </section>
  );
}
