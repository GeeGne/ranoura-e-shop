"use client";
// HOOKS
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// COMPONENTS
import LoadingLayout from "@/components/home/imageSlider/LoadingLayout";
import ErrorLayout from "@/components/home/imageSlider/ErrorLayout";
import DisplayImg from "@/components/DisplayImg";
import EpArrowLeft from "@/components/svgs/EpArrowLeft";

// STORES
import { useLanguageStore } from '@/stores/index';

// API
import getSlideShows from "@/lib/api/slide-show/get";

export default function ImageSlider({
  className = "",
  ...props
}: {
  className?: string;
}) {
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const { data: slideShowData, isLoading, isError } = useQuery({
    queryKey: ['slide-show'],
    queryFn: getSlideShows
  })
  const data = slideShowData?.data;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const contentUlRef = useRef<any>(null);
  const slideDuration = 8000;
  const slideAnimationDuration = 300;
  
  const totalIndexRef = useRef<number>(0);
  useEffect(() => {
    totalIndexRef.current = data?.length - 1 || 0;
  }, [ data ])

  useEffect(() => {
    const intervalId = setInterval(indexIncrement, slideDuration);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const setTransitionToNone = () => {
      setTimeout(() => {
        contentUlRef.current?.classList.add('transition-none');
        contentUlRef.current?.classList.remove('transition-all');
      }, 300);  
    };

    const setTransitionToAll = () => {
      setTimeout(() => {
        contentUlRef.current?.classList.add('transition-all');
        contentUlRef.current?.classList.remove('transition-none');
      }, 30);  
    };

    switch (true) {
      case currentIndex === totalIndexRef.current + 1:
        setTransitionToNone();  
        setTimeout(() => setCurrentIndex(0), slideAnimationDuration);
        break;
      case currentIndex === -1:
        setTransitionToNone();  
        setTimeout(() => setCurrentIndex(totalIndexRef.current), slideAnimationDuration);
        break;
      default:
        setTransitionToAll();
    }
  }, [currentIndex]);

  const indexIncrement = () => {
    setCurrentIndex((val: number) => {
      if (val >= totalIndexRef.current + 1) return totalIndexRef.current + 1;
      return val + 1;
    });
  };

  const indexDecrement = () => {
    setCurrentIndex((val: number) => {
      if (val <= -1) return -1;
      return val - 1;
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    const { type, length } = e.currentTarget.dataset;

    switch (type) {
      case "left_arrow_button_is_clicked":
        indexDecrement();
        break;
      case "right_arrow_button_is_clicked":
        indexIncrement();
        break;
      default:
        console.error("Unknown type: ", type);
    }
  };

  // DEBUG
  // console.log("currentIndex", currentIndex);
  // console.log("slide show data: ", data);
  // console.log("slide show data length: ", data?.length);

  if (isLoading) return ( <LoadingLayout /> )
  if (isError) return ( <ErrorLayout isEn={isEn} /> )

  return (
    <section
      className={`
        relative flex w-full overflow-hidden ${className}
      `}
      {...props}
      style={{direction: 'ltr'}}
    >
      <ul
        className={`
          flex w-full
          duration-300 ease-in-out
        `}
        style={{ transform: `translateX(-${ (currentIndex + 1) * 100}%)` }}
        ref={contentUlRef}
      >
        <li
          className="w-full bg-red-500 aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0 cursor-pointer"
        >
          <Link href={data[totalIndexRef.current]?.url || '/'} target="_blank" rel="noopener noreferrer">
            <picture
              className="w-full h-full object-cover object-center"
            >
              <source 
                media="(min-width: 1200px)"
                srcSet={data[totalIndexRef.current]?.img_lg || null}
              />
              <source 
                media="(min-width: 768px)"
                srcSet={data[totalIndexRef.current]?.img_md || null}
              />
              <img
                className="w-full h-full object-cover object-center"
                src={data[totalIndexRef.current]?.img_sm || null}
                alt={data?.alt}
                fetchPriority="low"
              />
            </picture>
          </Link>
        </li>
        {data?.map((itm: Record<string, string>, i: number) => (
          <li
            className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0 cursor-pointer"
            key={i}
          >
            <Link href={itm?.url || '/'} target="_blank" rel="noopener noreferrer">
              <picture
                className="w-full h-full object-cover object-center"
              >
                <source 
                  media="(min-width: 1200px)"
                  srcSet={itm?.img_lg}
                />
                <source 
                  media="(min-width: 768px)"
                  srcSet={itm?.img_md}
                />
                <img
                  className="w-full h-full object-cover object-center"
                  src={itm?.img_sm}
                  alt={itm?.alt}
                  loading="eager"
                  fetchPriority={i === 0 ? "high" : "low"}
                />
              </picture>
            </Link>
          </li>
        ))}
        <li
          className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0 cursor-pointer"
        >
          <Link href={data[0]?.url || '/'} target="_blank" rel="noopener noreferrer">
            <picture
              className="w-full h-full object-cover object-center"
            >
              <source 
                media="(min-width: 1200px)"
                srcSet={data[0]?.img_lg || null}
              />
              <source 
                media="(min-width: 768px)"
                srcSet={data[0]?.img_md || null}
              />
              <img
                className="w-full h-full object-cover object-center"
                src={data[0]?.img_sm || null}
                alt={data?.alt}
                fetchPriority="low"
              />
            </picture>
          </Link>
        </li>
      </ul>
      <ul
        className="
          absolute bottom-4 left-1/2 translate-x-[-50%]
          flex flex-row gap-2
        "
      >
        {data?.map((itm: Record<string, string>, i: number) => (
          <li
            className={`
              relative w-[40px] h-[4px] bg-inbetween 
              rounded-full border-solid border-[1px] border-background overflow-hidden
            `}
            key={i}
          >
            <div 
              className={`
                absolute top-0 left-0 h-full bg-primary
                ${currentIndex === i && "--fill-slider-bar"}
              `}
              style={{ animationDuration: (currentIndex === 0 ? slideDuration - slideAnimationDuration : slideDuration) + 'ms' }}
            />
          </li>
        ))}
      </ul>
      <EpArrowLeft
        className="
          absolute top-1/2 left-4 translate-y-[-50%]
          bg-body-invert text-heading rounded-md border-solid border-[2px] p-1 opacity-70 hover:opacity-100
          backdrop-blur-[5px] cursor-pointer
          ease-out duration-200 transition-all 
        "
        width={32}
        height={32}
        role="button"
        data-length={data.length}
        data-type="left_arrow_button_is_clicked"
        onClick={handleClick}
      />
      <EpArrowLeft
        className="
          absolute top-1/2 right-4 translate-y-[-50%]
          bg-body-invert text-heading rounded-md border-solid border-[2px] p-1 opacity-70 hover:opacity-100
          backdrop-blur-[5px] cursor-pointer rotate-180
          ease-out duration-200 transition-all 
        "
        width={32}
        height={32}
        role="button"
        data-length={data.length}
        data-type="right_arrow_button_is_clicked"
        onClick={handleClick}
      />
    </section>
  );
};
