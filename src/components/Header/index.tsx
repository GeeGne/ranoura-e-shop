"use client";

// HOOKS
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

// COMPONENTS
import CategoryListLg from "@/components/header/CategoryListLg";
import SubCategoryListLg from "@/components/header/SubCategoryListLg";
import LineMdCloseToMenuAltTransition from "@/components/svgs/LineMdCloseToMenuAltTransition";
import SolarCart4Outline from "@/components/svgs/SolarCart4Outline";
import IconamoonSearchThin from "@/components/svgs/IconamoonSearchThin";
import BottomBorder from "@/components/svgs/BottomBorder";
import EpUser from "@/components/svgs/EpUser";
import FillOnScroll from "@/components/FillOnScroll";

// STORES
import { useCartStore, useNavbarStore, useTabNameStore } from '@/stores/index';

type Props = {
  onScroll?: any;
  layoutRef?: any;
}

export default function Header({ onScroll, layoutRef, ...props }: Props) {
  
  const [ isWindowScrolled, setIsWindowScrolled ] = useState(false);
  const headerRef = useRef<HTMLInputElement>(null);
  const setCartToggle = useCartStore((stats:any) => stats.setToggle);
  const navbarToggle = useNavbarStore((status:any) => status.toggle);
  const setNavbarToggle = useNavbarStore((status:any) => status.setToggle);

  const tabName = useTabNameStore((state: any) => state.tabName);

  useEffect(() => {
    const y = layoutRef?.scrollTop || 0;
    setIsWindowScrolled(y <= 10 ? false : true);

  },[ onScroll, layoutRef ]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cart_button_is_clicked':
        setCartToggle(true);
        break;
      case 'navbar_button_is_clicked':
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
        className="nav-hover-effect lg:hidden z-[30]"
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
      <CategoryListLg />
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
      <SubCategoryListLg />
    </header>
  );
}