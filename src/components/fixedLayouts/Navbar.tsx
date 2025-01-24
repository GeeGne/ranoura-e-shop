// HOOKS
import { useState } from "react";

// COMPONENTS
import SolarCart4Outline from "@/components/svgs/SolarCart4Outline";
import ArrowUp from "@/components/svgs/ArrowUp";
import DisplayImg from "@/components/DisplayImg";

// STORES
import { useNavbarStore } from '@/stores/index';

// SVG
import EpArrowLeft from "@/components/svgs/EpArrowLeft";
import IcOutlineClear from '@/components/svgs/IcOutlineClear';
import IcOutlineCreate from "@/components/svgs/IcOutlineCreate";
import MeteoconsStarFill from "@/components/svgs/MeteoconsStarFill";
import LineMdMenuToCloseAltTransition from "@/components/svgs/LineMdMenuToCloseAltTransition";
import FluentArrowRight12Filled from "@/components/svgs/FluentArrowRight12Filled";

// JSON
import categories from '@/json/categories.json';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.jpg"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"


export default function Navbar () {

  const toggle = useNavbarStore((status:any) => status.toggle);
  const setToggle = useNavbarStore((status:any) => status.setToggle);
  const [ inputToggle, setInputToggle ] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        break;
      default:
        console.error('Unknown type: :', type);
    }
  }

  const handleFocus = (e: any) => {
    const { name } = e.currentTarget;
    console.log('focus');
    switch (name) {
      case 'quantity':
        setInputToggle(true);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleBlur = (e: any) => {
    const { name } = e.currentTarget;
    console.log('blur');
    switch (name) {
      case 'quantity':
        setInputToggle(false);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0 
        flex flex-col w-full h-screen bg-[var(--shade-v2-color)] z-[2000]
        transition-all duration-300 ease-in-out
        backdrop-blur-[2px] overflow-scroll
        ${toggle ? 'translate-y-[0%]' : 'translate-y-[-100%]'}
      `}
    >
      <button
        className="
          relative sticky top-0 flex items-center justify-start 
          w-full max-w-[1400px] mx-auto p-4 
          opacity-100 cursor-pointer z-[5]
        "
        onClick={handleClick}
        data-type="close_button_is_clicked"
      >
        <div
          className="nav-active-effect z-10"
        >
          <LineMdMenuToCloseAltTransition
            className="
              text-heading-invert cursor-pointer
            "
            width={24}
            height={24}
          />
        </div>
        <div
          className="
            absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            w-screen h-full text-body text-3xl font-thin
            flex items-center justify-center gap-2 bg-[hsla(0,0%,80%,0.6)]\
            border-b border-inbetween backdrop-blur-md
          "
        >
          <ArrowUp 
            className="w-6 h-6 text-between rounded-full border-solid border-body-light border-[1px] p-1"
          />
          <h2>
            CLOSE
          </h2>
        </div>
        <hr className="border-inbetween"/>
      </button>
      <section
        className="flex flex-1 flex-col bg-transparent w-full max-w-[600px] mx-auto"
      >
        <ul
          className="flex flex-col p-4 gap-4"
        >
          {categories.map((itm, i) => 
            <li
              className="w-full aspect-square bg-foreground rounded-lg cursor-pointer"
              role="button"
              key={i}
            >
              <div
                className="flex flex-row p-4 items-center gap-4"
              >
                <MeteoconsStarFill 
                  className="w-12 h-12 text-heading bg-background rounded-full"
                />
                <span
                  className="relative text-heading-invert text-lg font-bold"
                >
                  {itm.title.toUpperCase()}
                  <div
                    className="
                      absolute top-[100%] left-0 translate-y-[-50%]
                      w-full h-1 bg-heading-invert
                    "
                  />
                  <FluentArrowRight12Filled
                    className="
                      absolute top-[100%] left-[calc(100%-6px)] translate-y-[-50%] text-heading-invert w-8 h-8
                    "
                  />
                </span>
              </div>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}