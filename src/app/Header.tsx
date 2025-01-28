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
import { useCartStore, useNavbarStore, useTabNameStore } from '@/stores/index';

// JSON
import categories from '@/json/categories.json';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.jpg"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"


type Props = {
  onScroll?: any;
  layoutRef?: any;
}

export default function Header({ onScroll, layoutRef, ...props }: Props) {
  
  const [ isWindowScrolled, setIsWindowScrolled ] = useState(false);
  const headerRef = useRef<HTMLInputElement>(null);
  const setCartToggle = useCartStore((stats:any) => stats.setToggle);
  const navbarToggle = useNavbarStore((status:any) => status.toggle);
  // const navbarToggle = true;
  const setNavbarToggle = useNavbarStore((status:any) => status.setToggle);

  const tabName = useTabNameStore((state: any) => state.tabName);

  useEffect(() => {
    const y = layoutRef?.scrollTop || 0;
    setIsWindowScrolled(y <= 10 ? false : true);

  },[ onScroll, layoutRef ]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'category_button_is_clicked':
        setNavbarToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'category_button_is_clicked':
        setNavbarToggle(true);
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
        className="nav-hover-effect lg:hidden"
        data-type="navbar_button_is_clicked"
        onClick={handleClick}
      >
        <LineMdCloseToMenuAltTransition
          className={`
            cursor-pointer
            ${navbarToggle ? 'lg:text-heading text-heading-invert' : 'text-heading-invert'}
          `}
          width={24}
          height={24}
        />
      </button>
      <ul
        className="hidden lg:flex gap-4"
        data-type="ar_button_is_clicked"
        onClick={handleClick}
      >
        {categories.map((category, i) => 
          <span
            className={`
              text-lg cursor-pointer z-[25] hover:underline hover:font-bold
              transition-all ease-in-out duration-200
              ${navbarToggle ? 'text-heading' : 'text-heading-invert nav-button-hover-effect'}
            `}
            data-type="category_button_is_clicked"
            onClick={handleClick}
            onMouseEnter={() => setNavbarToggle(true)}
            onMouseLeave={() => setNavbarToggle(false)}
            key={i}
          >
            {category.title}
          </span>  
        )}
      </ul>
        <Link 
          href="/"
          className="relative mx-auto"
        >
          <span
            className={`
              absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]
              text-heading-invert text-2xl text-bold z-[30]
              transition-all ease-in-out duration-500
              ${
                isWindowScrolled || (tabName !== 'home')
                  ? "top-1/2 scale-[100%]"
                  : "top-[calc(100%+120px)] scale-[200%]"
              }
              ${
                navbarToggle &&
                  "lg:top-1/2 lg:scale-[100%] lg:text-heading"
              }
            `}
          >
            RANOURA
          </span>      
        </Link>
      <button
        className={`
          z-[25]
          ${navbarToggle || "nav-hover-effect"}
        `}
      >
        <IconamoonSearchThin
          className={`
            cursor-pointer
            ${navbarToggle ? 'lg:text-heading text-heading-invert' : 'text-heading-invert'}
          `}
          width={24}
          height={24}
        />
      </button>
      <button
        className={`
          cursor-pointer z-[25]
          ${navbarToggle || "nav-hover-effect"}
        `}
      >
        <EpUser 
          className={`
            ${navbarToggle ? 'lg:text-heading text-heading-invert' : 'text-heading-invert'}
          `}
          width={24} 
          height={24} 
        />      
      </button>
      <button
        className={`
          z-[25]
          ${navbarToggle || "nav-hover-effect"}
        `}
        onClick={handleClick}
        data-type="cart_button_is_clicked"
      >
        <SolarCart4Outline
          className={`
            cursor-pointer
            ${navbarToggle ? 'lg:text-heading text-heading-invert' : 'text-heading-invert'}

          `}
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
      <div
        className={`
          absolute top-0 left-1/2 translate-x-[-50%] 
          w-[100vw] h-full bg-background z-[20] 
          transition-all ease-in-out duration-300
          ${navbarToggle ? 'lg:visible opacity-100' : 'lg:invisible opacity-0'}
        `}        
      />
      <div
        className={`
          hidden lg:flex absolute top-full left-1/2 translate-x-[-50%] 
          w-[100vw] bg-background z-[20] p-8 shadow-md rounded-b-[3rem]
          transition-all ease-in-out duration-300
          ${navbarToggle ? 'lg:visible opacity-100' : 'lg:invisible opacity-0'}
        `}
        onMouseEnter={() => setNavbarToggle(true)}
        onMouseLeave={() => setNavbarToggle(false)}
      >
        <div
          className="flex flex-col flex-1 text-heading text-3xl font-bold gap-2"
        >
          <span
            className="text-body-extra-light text-xs"
          >
            CLOTHING
          </span>
          <ul
            className=""
          >
            <li>
              test
            </li>
            <li>
              test1
            </li>
            <li>
              test2
            </li>
            <li>
              test3
            </li>
          </ul>
        </div>
        <img
          className="flex-[2] rounded-lg" 
          src={ramdanBanner}
          alt="Image"
        />
      </div>
    </header>
  );
}