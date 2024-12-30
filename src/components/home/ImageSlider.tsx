"use client";
// HOOKS
import Image from "next/image";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const intervalId = setInterval(indexIncrement, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const indexIncrement = () => {
    setCurrentIndex((val: number) => {
      const totalIndex = array.length - 1;
      if (val >= totalIndex) return 0;
      return val + 1;
    });
  };

  const indexDecrement = () => {
    setCurrentIndex((val: number) => {
      const totalIndex = array.length - 1 || 0;
      if (val <= 0) return totalIndex;
      return val - 1;
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    const { type, length } = e.currentTarget.dataset;
    const totalIndex = Number(length) - 1;

    console.log("type: ", type);
    console.log("length: ", length);
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
          transition-all duration-300 ease-in-out
        `}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {array.map((itm, i) => (
          <li
            className="w-full aspect-[1/1] md:aspect-[4/3] lg:aspect[16/9] shrink-0"
            key={i}
          >
            <DisplayImg
              className="w-full h-full object-cover object-center"
              src={itm}
              alt="test"
            />
          </li>
        ))}
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
              w-[32px] h-[7px] rounded-full border-solid border-[1px] border-background
              transtion-all duration-300 ease-out
              ${currentIndex === i ? "bg-primary" : "bg-inbetween"}
            `}
            key={i}
          />
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
