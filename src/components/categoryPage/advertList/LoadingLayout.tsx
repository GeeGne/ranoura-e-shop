"use client"

// HOOKS
import { ReactNode, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

// COMPONENTS
import PriceTag from '@/components/PriceTag';
import ColorPallete from '@/components/ColorPallete';
import LineMdHeart from '@/components/svgs/LineMdHeart';
import LineMdHeartFilled from '@/components/svgs/LineMdHeartFilled';
import FlowbiteExpandOutline from '@/components/svgs/FlowbiteExpandOutline';
import LineMdArrowsDiagonalRotated from '@/components/svgs/LineMdArrowsDiagonalRotated';
import SquareLines from '@/components/svgs/SquareLines';
import FlowerLines from '@/components/svgs/FlowerLines';
import LineMdImageTwotone from '@/components/svgs/LineMdImageTwotone';

// JSON
// import products from "@/json/products.json";

// UTILS
import strSpaceToHyphen from '@/utils/strSpaceToHyphen';

// STORES
import { 
  useFavouritesStore, useFavouriteConfettiToggle,
  useAlertMessageStore, useLanguageStore,
  useImageDisplayerWindow
} from '@/stores/index';

// CONFETTI 
import Confetti from "react-canvas-confetti/dist/presets/explosion";

type Props = {
  products?: any[];
  isLoading?: boolean;
}

export default function LoadingLayout ({
  products = [],
  isLoading = false
}: Props) {
  
  const selectedColor = "green";
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  return (
    <section
      className="--opacity-blink flex flex-col gap-4 px-4 z-[5]"
    >
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-200 ease-in-out"
        // style={{transform: `translateX(${scrollWidth}px)`}}
      >
        {[1, 2, 3, 4, 5, 6].map((product, i) => 
          <li
            className="flex flex-col shrink-0 gap-2 w-full"
            key={i}
          >
            <div
              className={`
                relative group cursor-pointer 
                transition-all duraiton-200 ease-in-out
              `}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <div 
                  className={`
                    bg-background-deep-light w-full peer aspect-[2/3] object-cover object-center
                    transition-all ease-in-out duration-200
                  `}
                />
              </div>
              <div
                className="absolute top-0 left-0 flex flex-col gap-4 p-2 z-[10] drop-shadow-md"
              >
              
                <div
                  className="
                    bg-background-light rounded-full relative drop-shadow-md 
                  "
                >
                  <div 
                    className="
                      --brightness-filter w-10 md:w-12 h-10 md:h-12 drop-shadow-md contrast-[150%]  
                    "
                  />
                </div>  
                <div
                  className="
                    bg-background-light rounded-full relative drop-shadow-md 
                  "
                >
                  <div 
                    className="
                      --rotate-ani duration--10s w-10 md:w-12 h-10 md:h-12 drop-shadow-md contrast-[150%] brightness-[120%]  
                    "
                  />
                </div>
              </div>
              <div
                className={`
                  bg-background-light rounded-full absolute top-2 right-2 w-6 h-6 text-pink-500 cursor-pointer z-[10]
                  }
                `}
              />
              <nav
                className={`
                  absolute bottom-0 right-0 p-2 z-[10]
                  flex flex-row w-full justify-between items-end
                `}
              >
                <div
                  className="flex order-2 gap-2"
                >
                  <div 
                    className={`
                      text-transparent bg-background-light w-8 h-8 transform-style-3d transform group-hover:transform-style-3d 
                      cursor-pointer rounded-full p-1 
                      transition-all ease-in-out duration-200
                      ${isEn ? 'ml-auto' : 'mr-auto'}
                    `}
                    role="button"
                    data-index={i}
                    data-type="scale_window_button_is_clicked"
                  />
                  <div 
                    className={`
                      text-transparent bg-background-light w-8 h-8 transform-style-3d transform group-hover:transform-style-3d 
                      cursor-pointer rounded-full p-1 
                      transition-all ease-in-out duration-200
                      ${isEn ? 'ml-auto' : 'mr-auto'}
                    `}
                    role="button"
                    data-type="scale_button_is_clicked"
                  />
                </div>
                <div
                  className="
                    bg-background-light order-1 flex flex-row items-center gap-2 
                    rounded-lg border-solid border-heading-invert border-[2px] p-1 backdrop-brightness-[70%]
                  "
                >
                  <div 
                    className="
                      w-5 h-5
                    "
                  />
                  <div
                    className="
                      text-xs font-bold px-[4px] rounded-full 
                      text-transparent
                      border-solid border-heading-invert border-[2px]
                      transition-all ease-in-out duration-200
                    "
                  >
                    A                    
                  </div>
                  <button
                    className="
                      text-xs font-bold px-[4px] rounded-full 
                      text-transparent hover:bg-heading 
                      border-solid border-heading-invert border-[2px]
                      transition-all ease-in-out duration-200
                    "
                    data-type="b_button_is_clicked"
                  >
                    B                     
                  </button>
                </div>
              </nav>
            </div>
            <span
              className="w-fit bg-background-light text-transparent rounded-md text-base mb-auto"
            >
              ///////////////
            </span>
            <PriceTag 
              isLoading={true}
            />
            <ColorPallete 
              isLoading={true}
            />
          </li>
        )}
      </ul>
    </section>
  )
}