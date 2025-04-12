"use client";
// HOOKS
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import DisplayImg from "@/components/DisplayImg";
import EpArrowLeft from "@/components/svgs/EpArrowLeft";

// ASSETS
const small1 = "/assets/img/background(4).webp";
const small2 = "/assets/img/background(3).jpg";
const small3 = "/assets/img/background(6).jpg";
const medium1 = "/assets/img/background(4).webp";
const medium2 = "/assets/img/background(8).webp";
const medium3 = "/assets/img/background(6).jpg";
const large1 = "/assets/img/background(7).webp";
const large2 = "/assets/img/background(9).webp";
const large3 = "/assets/img/background(10).webp";
const img1 = "/assets/img/background(7).webp";
const cover1 = "/assets/img/cover-1.jpg";
const cover2 = "/assets/img/cover-2.webp";

export default function ImageSlider({
  className = "",
  ...props
}: {
  className?: string;
}) {
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

  const totalIndex = () => array.length - 1 || 0;

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
          <picture
            className="w-full h-full object-cover object-center"
          >
            <source 
              media="(min-width: 1200px)"
              srcSet={array[totalIndex()].lg}
            />
            <source 
              media="(min-width: 768px)"
              srcSet={array[totalIndex()].md}
            />
            <img
              className="w-full h-full object-cover object-center"
              src={array[totalIndex()].sm}
              alt="test"
            />
          </picture>
        </li>
        {array.map((itm, i) => (
          <li
            className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0 cursor-pointer"
            key={i}
          >
            <picture
              className="w-full h-full object-cover object-center"
            >
              <source 
                media="(min-width: 1200px)"
                srcSet={itm.lg}
              />
              <source 
                media="(min-width: 768px)"
                srcSet={itm.md}
              />
              <img
                className="w-full h-full object-cover object-center"
                src={itm.sm}
                alt="test"
                loading="lazy"
              />
            </picture>
          </li>
        ))}
        <li
          className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0 cursor-pointer"
        >
          <picture
            className="w-full h-full object-cover object-center"
          >
            <source 
              media="(min-width: 1200px)"
              srcSet={array[0].lg}
            />
            <source 
              media="(min-width: 768px)"
              srcSet={array[0].md}
            />
            <img
              className="w-full h-full object-cover object-center"
              src={array[0].sm}
              alt="test"
            />
          </picture>
        </li>
      </ul>
      <ul
        className="
          absolute bottom-4 left-1/2 translate-x-[-50%]
          flex flex-row gap-2
        "
      >
        {array.map((itm, i) => (
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
        data-length={array.length}
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
        data-length={array.length}
        data-type="right_arrow_button_is_clicked"
        onClick={handleClick}
      />
    </section>
  );
}
