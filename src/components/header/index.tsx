"use client";

// HOOKS
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// COMPONENTS
import CategoryListLg from "@/components/header/CategoryListLg";
import SubCategoryListLg from "@/components/header/SubCategoryListLg";
import FillOnScroll from "@/components/header/FillOnScroll";
import LineMdCloseToMenuAltTransition from "@/components/svgs/LineMdCloseToMenuAltTransition";
import SolarCart4Outline from "@/components/svgs/SolarCart4Outline";
import IconamoonSearchThin from "@/components/svgs/IconamoonSearchThin";
import BottomBorder from "@/components/svgs/BottomBorder";
import EpUser from "@/components/svgs/EpUser";

// STORES
import { useCartStore, useNavbarStore, useTabNameStore, useAlertMessageStore } from '@/stores/index';

// ASSETS
const logo = "/assets/img/ranoura-logo.png";

type Props = {
  onScroll?: any;
  layoutRef?: any;
}

export default function Header({ onScroll, layoutRef, ...props }: Props) {
  
  const router = useRouter();

  const [ isWindowScrolled, setIsWindowScrolled ] = useState(false);
  const headerRef = useRef<HTMLInputElement>(null);
  const setCartToggle = useCartStore((stats:any) => stats.setToggle);
  const navbarToggle = useNavbarStore((status:any) => status.toggle);
  const setNavbarToggle = useNavbarStore((status:any) => status.setToggle);
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);
  const tabName = useTabNameStore((state: any) => state.tabName);

  useEffect(() => {
    const y = layoutRef?.scrollTop || 0;
    setIsWindowScrolled(y <= 10 ? false : true);

  },[ onScroll, layoutRef ]);

  const handleClick = (e: any) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'ranoura_logo_is_clicked':
        if (tabName === 'home') return layoutRef.scrollTo({top: 0, behavior: "smooth"});
        router.push("/");
        layoutRef.scrollTo({top: 0, behavior: "instant"});
        break;
      case 'cart_button_is_clicked':
        setCartToggle(true);
        break;
      case 'navbar_button_is_clicked':
      case 'category_button_is_clicked':
        setNavbarToggle(true);
        break;
      case 'search_button_is_clicked':
        setAlertToggle(Date.now());
        setAlertType("warning");
        setAlertMessage("Sorry! We're currently working on this feature.");
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
        sticky top-0 flex flex-row items-center mx-auto gap-4 px-4 py-8 z-[1000] bg-transparent
        before:content-[''] before:absolute before:top-0 before:left-1/2 before:translate-x-[-50%]
        before:w-[100vw] before:h-full before:z-[-1]
        transition-all ease-in-out duration-300
        before:transition-all before:ease-in-out before:duration-300
        ${
          isWindowScrolled 
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
        className={`
          lg:hidden z-[30]
          ${navbarToggle 
            || tabName !== "home" 
            || "nav-hover-effect"
          }
        `}
        data-type="navbar_button_is_clicked"
        onClick={handleClick}
      >
        <LineMdCloseToMenuAltTransition
          className={`
            cursor-pointer 
            ${navbarToggle 
              ? 'lg:text-heading text-heading-invert' 
              : isWindowScrolled
                ? "text-heading-invert"
                : (tabName === 'home')
                  ? "text-heading-invert"
                  : "text-heading"
            }
          `}
          width={24}
          height={24}
        />
      </button>
      <CategoryListLg 
        isWindowScrolled={isWindowScrolled} 
        tabName={tabName}
      />
      <button 
        className="relative w-[280px] mx-auto"
        data-type="ranoura_logo_is_clicked"
        onClick={handleClick}
      >
        <img
          src={logo}
          alt="Ranoura Logo Brand for Women Clothing"
          loading="eager"
          className={`
            absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]
            z-[30] w-full
            transition-all ease-in-out duration-500
            ${navbarToggle 
              ? "lg:top-1/2 lg:min-w-full lg:invert-[100%]" 
              : isWindowScrolled
                ? "top-1/2 min-w-full"
                : (tabName === 'home')
                  ? "top-[calc(100%+120px)] md:top-[calc(100%+150px)] min-w-[150%] md:min-w-[200%]"
                  : "top-1/2 min-w-full top-1/2 min-w-full invert-[100%]"
            }
          `}
        />
      </button>
      <button
        className={`
          z-[25] cursor-pointer 
          ${navbarToggle 
            || tabName !== "home" 
            || "nav-hover-effect"
          }
        `}
      >
        <IconamoonSearchThin
          className={`
            cursor-pointer
            ${navbarToggle 
              ? 'lg:text-heading text-heading-invert' 
              : isWindowScrolled
                ? "text-heading-invert"
                : (tabName === 'home')
                  ? "text-heading-invert"
                  : "text-heading"
            }
          `}
          width={24}
          height={24}
          data-type="search_button_is_clicked"
          onClick={handleClick}
        />
      </button>
      <button
        className={`
          cursor-pointer z-[25]
          ${navbarToggle 
            || tabName !== "home" 
            || "nav-hover-effect"
          }
        `}
      >
        <Link
          href="/signin" 
        >
          <EpUser 
            className={`
              ${navbarToggle 
                ? 'lg:text-heading text-heading-invert' 
                : isWindowScrolled
                  ? "text-heading-invert"
                  : (tabName === 'home')
                    ? "text-heading-invert"
                    : "text-heading"
              }
            `}
            width={24} 
            height={24}
          />            
        </Link>
      </button>
      <button
        className={`
          z-[25]
          ${navbarToggle 
            || tabName !== "home" 
            || "nav-hover-effect"
          }
        `}
        onClick={handleClick}
        data-type="cart_button_is_clicked"
      >
        <SolarCart4Outline
          className={`
            cursor-pointer
            ${navbarToggle 
              ? 'lg:text-heading text-heading-invert' 
              : isWindowScrolled
                ? "text-heading-invert"
                : (tabName === 'home')
                  ? "text-heading-invert"
                  : "text-heading"
            }
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