"use client";
// HOOKS
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import DisplayImg from "@/components/DisplayImg";
import EpArrowLeft from "@/components/svgs/EpArrowLeft";

// ASSETS
const img1 = "/assets/img/ex-1.jpg";
const cover1 = "/assets/img/cover-1.jpg";
const cover2 = "/assets/img/cover-2.webp";

export default function ImageSlider({
  className = "",
  ...props
}: {
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const array = [cover2, cover1, img1, cover2, cover1];
  const contentUlRef = useRef<any>(null);
  const slideDuration = 5000;

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
          className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0"
        >
          <DisplayImg
            className="w-full h-full object-cover object-center"
            src={array[totalIndex()]}
            alt="test"
          />
        </li>
        {array.map((itm, i) => (
          <li
            className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0"
            key={i}
          >
            <DisplayImg
              className="w-full h-full object-cover object-center"
              src={itm}
              alt="test"
            />
          </li>
        ))}
        <li
          className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[2/1] shrink-0"
        >
          <DisplayImg
            className="w-full h-full object-cover object-center"
            src={array[0]}
            alt="test"
          />
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
