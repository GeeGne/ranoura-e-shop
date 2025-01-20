"use client";

// HOOKS
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

// COMPONENTS
import LineMdCloseToMenuAltTransition from "@/components/svgs/LineMdCloseToMenuAltTransition";
import LineMdMenuToCloseAltTransition from "@/components/svgs/LineMdMenuToCloseAltTransition";
import SolarCart4Outline from "@/components/svgs/SolarCart4Outline";
import IconamoonSearchThin from "@/components/svgs/IconamoonSearchThin";
import BottomBorder from "@/components/svgs/BottomBorder";
import EpUser from "@/components/svgs/EpUser";
import FillOnScroll from "@/components/FillOnScroll";

// STORES
import { useCartStore, useTabNameStore } from '@/stores/index';

type Props = {
  onScroll?: any;
  layoutRef?: any;
}

export default function Header({ onScroll, layoutRef, ...props }: Props) {
  
  const [ isWindowScrolled, setIsWindowScrolled ] = useState(false);
  const headerRef = useRef<HTMLInputElement>(null);
  const setToggle = useCartStore((stats:any) => stats.setToggle);
  const tabName = useTabNameStore((state: any) => state.tabName);

  useEffect(() => {
    const y = layoutRef?.scrollTop || 0;
    setIsWindowScrolled(y <= 10 ? false : true);

  },[ onScroll, layoutRef ]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cart_button_is_clicked':
        setToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG

  return (
    <header
      className={`
        sticky top-0 flex flex-row items-center mx-auto gap-4 px-4 py-4 z-[1000] bg-transparent
        before:content-[''] before:absolute before:top-0 before:left-1/2 before:translate-x-[-50%]
        before:w-[100vw] before:h-full before:z-[-1]
        transition-all ease-in-out duration-300
        before:transition-all before:ease-in-out before:duration-300
        ${
          isWindowScrolled || (tabName !== 'home')
            ? "bg-primary before:bg-primary"
            : "bg-transparent before:bg-transparent"
        }
      `}
      ref={headerRef}
      {...props}
    >
      <FillOnScroll 
        onScroll={onScroll}
        layoutRef={layoutRef}
      />
      <button
        className="nav-hover-effect"
      >
        <LineMdCloseToMenuAltTransition
          className="text-heading-invert cursor-pointer"
          width={24}
          height={24}
        />
      </button>
        <Link 
          href="/"
          className="relative mx-auto"
        >
          <span
            className={`
              absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]
              text-heading-invert text-2xl text-bold z-10
              transition-all ease-in-out duration-500
              ${
                isWindowScrolled || (tabName !== 'home')
                  ? "top-1/2 scale-[100%]"
                  : "top-[calc(100%+120px)] scale-[200%]"
              }
            `}
          >
            RANOURA
          </span>      
        </Link>
      <button
        className="nav-hover-effect"
      >
        <IconamoonSearchThin
          className="text-heading-invert cursor-pointer"
          width={24}
          height={24}
        />
      </button>
      <button
        className="nav-hover-effect"
      >
        <EpUser 
          className="text-heading-invert cursor-pointer" 
          width={24} 
          height={24} 
        />      
      </button>
      <button
        className="nav-hover-effect"
        onClick={handleClick}
        data-type="cart_button_is_clicked"
      >
        <SolarCart4Outline
          className="
            text-heading-invert cursor-pointer
          "
          width={24}
          height={24}
        />
      </button>
      <BottomBorder 
        className={`
          hidden absolute left-1/2 translate-x-[-50%] top-full w-[100vw] text-primary 
          scale-x-[105%] scale-y-[50%] md:scale-y-[35%] lg:scale-y-[25%] origin-top
          transition-all ease-in-out duration-300
          ${
            isWindowScrolled || (tabName !== 'home')
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      />
    </header>
  );
}
