"use client";
// HOOKS
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// COMPONENTS
import DisplayImg from "@/components/DisplayImg";
import EpArrowLeft from "@/components/svgs/EpArrowLeft";

// API
import getSlideShows from "@/lib/api/slide-show/get";

// ASSETS
const small1 = "/assets/img/background(4).webp";
const small2 = "/assets/img/background(3).avif";
const small3 = "/assets/img/background(6).avif";
const medium1 = "/assets/img/background(4).webp";
const medium2 = "/assets/img/background(8).webp";
const medium3 = "/assets/img/background(6).avif";
const large1 = "/assets/img/background(7).webp";
const large2 = "/assets/img/background(9).webp";
const large3 = "/assets/img/background(10).webp";
const img1 = "/assets/img/background(7).webp";
const cover1 = "/assets/img/cover-1.avif";
const cover2 = "/assets/img/cover-2.webp";

export default function ImageSlider({
  className = "",
  ...props
}: {
  className?: string;
}) {
  const { data: slideShowData, isLoading, isError} = useQuery({
    queryKey: ['slide-show'],
    queryFn: getSlideShows
  })
  const data = slideShowData?.data;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const array = [
    {
      sm: small1,
      md: medium1,
      lg: large1 
    },{
      sm: small2,
      md: medium2,
      lg: large2 
    },{
      sm: small3,
      md: medium3,
      lg: large3 
    }
  ];
  const contentUlRef = useRef<any>(null);
  const slideDuration = 8000;

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
      case currentIndex === totalIndex() + 1:
        setTransitionToNone();  
        setTimeout(() => setCurrentIndex(0), 300);
        break;
      case currentIndex === -1:
        setTransitionToNone();  
        setTimeout(() => setCurrentIndex(totalIndex()), 300);
        break;
      default:
        setTransitionToAll();
    }
  }, [currentIndex]);

  const indexIncrement = () => {
    setCurrentIndex((val: number) => {
      if (val >= totalIndex() + 1) return totalIndex() + 1;
      return val + 1;
    });
  };

  const indexDecrement = () => {
    setCurrentIndex((val: number) => {
      if (val <= -1) return -1;
      return val - 1;
    });
  };

  const totalIndex = () => data?.length - 1 || 0;

  const handleClick = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    const { type, length } = e.currentTarget.dataset;
    const totalIndex = Number(length) - 1;

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
  console.log("slide show data: ", data);

  if (isLoading || isError ) return (<div></div>)


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
        style={{ transform: `translateX(-${(currentIndex + 1) * 100}%)` }}
        ref={contentUlRef}
      >
        <li
          className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0 cursor-pointer"
        >
          <Link href={data[totalIndex()]?.url} target="_blank">
            <picture
              className="w-full h-full object-cover object-center"
            >
              <source 
                media="(min-width: 1200px)"
                srcSet={data[totalIndex()]?.img_lg}
              />
              <source 
                media="(min-width: 768px)"
                srcSet={data[totalIndex()]?.img_md}
              />
              <img
                className="w-full h-full object-cover object-center"
                src={data[totalIndex()]?.img_sm}
                alt="test"
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
            <Link href={itm?.url} target="_blank">
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
          <Link href={data[0]?.url} target="_blank">
            <picture
              className="w-full h-full object-cover object-center"
            >
              <source 
                media="(min-width: 1200px)"
                srcSet={data[0]?.img_lg}
              />
              <source 
                media="(min-width: 768px)"
                srcSet={data[0]?.img_md}
              />
              <img
                className="w-full h-full object-cover object-center"
                src={data[0]?.img_sm}
                alt="test"
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
              style={{ animationDuration: slideDuration + 'ms' }}
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
}
