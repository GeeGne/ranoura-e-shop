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
  console.log("currentIndex", currentIndex);

  return (
    <section
      className={`relative flex w-full overflow-hidden ${className}`}
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
      <div className="custom-shape-divider-top-1735380155">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
}
