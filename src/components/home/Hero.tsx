// HOOKS
import { ReactNode, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

// COMPONENTS
import FilmTape from "@/components/FilmTape";
import DisplayImg from "@/components/DisplayImg";
import BottomBorder from "@/components/svgs/BottomBorder";
import RanouraInstagramCurved from "@/components/svgs/RanouraInstagramCurved";
import RanouraInstagramCurvedV2 from "@/components/svgs/RanouraInstagramCurvedV2";
import LineMdPlayFilledToPauseTransition from "@/components/svgs/LineMdPlayFilledToPauseTransition";
import LineMdPauseToPlayFilledTransition from "@/components/svgs/LineMdPauseToPlayFilledTransition";
 
// API
import getHeroVideoData from '@/lib/api/hero-video/get';

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

  const { data: heroVideoData, isLoading, isError } = useQuery({
    queryKey: ['hero-video'],
    queryFn: getHeroVideoData,
  });

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

  if (isLoading) return (
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
      <div 
        className="
          absolute bottom-0 left-0 bg-primary
          w-full h-[calc(100%+100px)] object-cover 
        "
      />
      <div
        className="
          absolute bottom-0 left-0 w-full h-full 
          bg-gradient-to-t from-primary
        "
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

  const { poster_url, webm_url, mp4_url, mute } = heroVideoData?.data || {};
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
        muted={mute}
        loop 
        playsInline
        preload="auto"
        poster={poster_url}
        className="
          absolute bottom-0 left-0 bg-primary
          w-full h-[calc(100%+100px)] object-cover 
        "
        ref={vidRef}
        onWaiting={() => console.log('waiting')}
        onCanPlay={() => console.log('canPlay')}
        onCanPlayThrough={() => console.log('canPlayThrought')}
      >
        <source
          src={webm_url} 
          type="video/webm"
        />
        <source 
          src={mp4_url} 
          type="video/mp4"
        />
      </video>
      <div
        className="
          absolute bottom-0 left-0 w-full h-full 
          bg-gradient-to-t from-primary
        "
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
