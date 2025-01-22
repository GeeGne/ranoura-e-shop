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
import LineMdMenuToCloseAltTransition from "@/components/svgs/LineMdMenuToCloseAltTransition";

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
        flex flex-col w-full h-full bg-[var(--shade-v2-color)] z-[2000]
        transition-all duration-300 ease-in-out
        backdrop-blur-[2px]
        ${toggle ? 'translate-y-[0%]' : 'translate-y-[-100%]'}
      `}
    >
      <button
        className="
          relative flex items-center justify-start 
          w-full max-w-[1400px] mx-auto p-4 opacity-100 cursor-pointer"
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
            flex items-center justify-center gap-2 bg-[hsla(0,0%,80%,0.6)]  
          "
        >
          <ArrowUp 
            className="w-6 h-6 text-between rounded-full border-solid border-body-light border-[1px] p-1"
          />
          <h2>
            CLOSE
          </h2>
        </div>
      </button>
      <hr className="border-inbetween"/>
      <section
        className="flex flex-1 flex-col bg-transparent w-full max-w-[600px] mx-auto overflow-hidden"
      >
        <div
          className="flex items-center justify-between p-4"
        >
          <span
            className="text-2xl text-heading"
          >
            Cart
          </span>
          <span
            className="text-2xl text-heading border-heading border-solid border-[1px] rounded-full px-2"
          >
            3
          </span>
        </div>
        <hr className="border-inbetween"/>
        <ul className="flex flex-col flex-1 py-4 px-2 gap-8 overflow-y-scroll">
          <li className="flex">
            <DisplayImg
              className="w-[100px] md:w-[200px] aspect-[2/3] object-cover rounded-lg"
              src={outfit2}
            />
            <div className="flex flex-col flex-1 px-4">
              <div className="flex text-heading text-lg font-bold justify-between">
                <h3>
                  Dark Sweater
                </h3>             
                <h3>
                  4000 SYP
                </h3>
              </div>
              <div className="flex items-center gap-2 font-bold py-4">
                <span>
                  M
                </span>
                <span>|</span>
                <span className="h-4 w-4 rounded-full bg-black"></span>
                <span>
                  BLACK
                </span>
              </div>
                <div className="flex justify-between w-[150px]">
                  <span className="text-body">
                    Price: 
                  </span>
                  <span className="text-heading font-bold">
                    200 SYP
                  </span>
                </div>       
                <label 
                  className="flex justify-between w-[150px]"
                  htmlFor="quantity"
                >
                  <span className="text-body">
                    Quanitity:
                  </span>
                  <div
                    className="relative"
                  >
                    <input 
                      className="w-12 bg-transparent text-center outline-none border-none"
                      id="quantity"
                      name="quantity"
                      value="1"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      readOnly
                    />
                    <div 
                      className="
                        absolute top-0 left-0 w-full h-full
                        flex items-center justify-end
                        border-solid border-b-[2px] border-body

                    ">
                      <EpArrowLeft className="w-4 h-4 rotate-[265deg]" />
                    </div>
                    <ul
                      className={`
                        absolute top-full left-0 w-full h-auto py-2
                        flex-col bg-[var(--background-light-color)] rounded-lg cursor-pointer
                        ${inputToggle ? 'flex' : 'hidden'}
                      `}
                    >
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">1</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">2</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">3</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">4</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">5</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">6</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">7</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">8</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">9</li>
                    </ul>
                  </div>
                </label>
                <div 
                  className="
                    flex flex-col gap-2 text-sm md:text-md mt-auto pt-8
                    translate-all duration-300 ease-in-out
                  "
                >
                <button
                  className="
                    flex items-center justify-center gap-1 
                    border-solid border-body border-[2px] rounded-md
                    translate-all duration-300 ease-in-out
                    hover:bg-body hover:text-heading-invert
                  "
                >
                  <IcOutlineCreate
                    className="w-4 h-4"
                  />
                  <span>EDIT</span>
                </button>
                <button
                  className="
                    flex items-center justify-center gap-1 
                    border-solid border-body border-[2px] rounded-md
                    translate-all duration-300 ease-in-out
                    hover:bg-body hover:text-heading-invert
                  "
                >
                  <IcOutlineClear
                    className="w-4 h-4"
                  />
                  <span>DELETE</span>
                </button>
              </div>
            </div>
          </li>
          <li className="flex">
            <DisplayImg
              className="w-[100px] md:w-[200px] aspect-[2/3] object-cover rounded-lg"
              src={outfit2}
            />
            <div className="flex flex-col flex-1 px-4">
              <div className="flex text-heading text-lg font-bold justify-between">
                <h3>
                  Dark Sweater
                </h3>             
                <h3>
                  4000 SYP
                </h3>
              </div>
              <div className="flex items-center gap-2 font-bold py-4">
                <span>
                  M
                </span>
                <span>|</span>
                <span className="h-4 w-4 rounded-full bg-black"></span>
                <span>
                  BLACK
                </span>
              </div>
                <div className="flex justify-between w-[150px]">
                  <span className="text-body">
                    Price: 
                  </span>
                  <span className="text-heading font-bold">
                    200 SYP
                  </span>
                </div>       
                <label 
                  className="flex justify-between w-[150px]"
                  htmlFor="quantity"
                >
                  <span className="text-body">
                    Quanitity:
                  </span>
                  <div
                    className="relative"
                  >
                    <input 
                      className="w-12 bg-transparent text-center outline-none border-none"
                      id="quantity"
                      name="quantity"
                      value="1"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      readOnly
                    />
                    <div 
                      className="
                        absolute top-0 left-0 w-full h-full
                        flex items-center justify-end
                        border-solid border-b-[2px] border-body

                    ">
                      <EpArrowLeft className="w-4 h-4 rotate-[265deg]" />
                    </div>
                    <ul
                      className={`
                        absolute top-full left-0 w-full h-auto py-2
                        flex-col bg-[var(--background-light-color)] rounded-lg cursor-pointer
                        ${inputToggle ? 'flex' : 'hidden'}
                      `}
                    >
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">1</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">2</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">3</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">4</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">5</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">6</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">7</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">8</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">9</li>
                    </ul>
                  </div>
                </label>
                <div 
                  className="
                    flex flex-col gap-2 text-sm md:text-md mt-auto pt-8
                    translate-all duration-300 ease-in-out
                  "
                >
                <button
                  className="
                    flex items-center justify-center gap-1 
                    border-solid border-body border-[2px] rounded-md
                    translate-all duration-300 ease-in-out
                    hover:bg-body hover:text-heading-invert
                  "
                >
                  <IcOutlineCreate
                    className="w-4 h-4"
                  />
                  <span>EDIT</span>
                </button>
                <button
                  className="
                    flex items-center justify-center gap-1 
                    border-solid border-body border-[2px] rounded-md
                    translate-all duration-300 ease-in-out
                    hover:bg-body hover:text-heading-invert
                  "
                >
                  <IcOutlineClear
                    className="w-4 h-4"
                  />
                  <span>DELETE</span>
                </button>
              </div>
            </div>
          </li>
          <li className="flex">
            <DisplayImg
              className="w-[100px] md:w-[200px] aspect-[2/3] object-cover rounded-lg"
              src={outfit1}
            />
            <div className="flex flex-col flex-1 px-4">
              <div className="flex text-heading text-lg font-bold justify-between">
                <h3>
                  Dark Sweater
                </h3>             
                <h3>
                  4000 SYP
                </h3>
              </div>
              <div className="flex items-center gap-2 font-bold py-4">
                <span>
                  M
                </span>
                <span>|</span>
                <span className="h-4 w-4 rounded-full bg-black"></span>
                <span>
                  BLACK
                </span>
              </div>
                <div className="flex justify-between w-[150px]">
                  <span className="text-body">
                    Price: 
                  </span>
                  <span className="text-heading font-bold">
                    200 SYP
                  </span>
                </div>       
                <label 
                  className="flex justify-between w-[150px]"
                  htmlFor="quantity"
                >
                  <span className="text-body">
                    Quanitity:
                  </span>
                  <div
                    className="relative"
                  >
                    <input 
                      className="w-12 bg-transparent text-center outline-none border-none"
                      id="quantity"
                      name="quantity"
                      value="1"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      readOnly
                    />
                    <div 
                      className="
                        absolute top-0 left-0 w-full h-full
                        flex items-center justify-end
                        border-solid border-b-[2px] border-body

                    ">
                      <EpArrowLeft className="w-4 h-4 rotate-[265deg]" />
                    </div>
                    <ul
                      className={`
                        absolute top-full left-0 w-full h-auto py-2
                        flex-col bg-[var(--background-light-color)] rounded-lg cursor-pointer
                        ${inputToggle ? 'flex' : 'hidden'}
                      `}
                    >
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">1</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">2</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">3</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">4</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">5</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">6</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">7</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">8</li>
                      <li className="hover:bg-[var(--background-deep-light-color)] w-full text-center">9</li>
                    </ul>
                  </div>
                </label>
                <div 
                  className="
                    flex flex-col gap-2 text-sm md:text-md mt-auto pt-8
                    translate-all duration-300 ease-in-out
                  "
                >
                <button
                  className="
                    flex items-center justify-center gap-1 
                    border-solid border-body border-[2px] rounded-md
                    translate-all duration-300 ease-in-out
                    hover:bg-body hover:text-heading-invert
                  "
                >
                  <IcOutlineCreate
                    className="w-4 h-4"
                  />
                  <span>EDIT</span>
                </button>
                <button
                  className="
                    flex items-center justify-center gap-1 
                    border-solid border-body border-[2px] rounded-md
                    translate-all duration-300 ease-in-out
                    hover:bg-body hover:text-heading-invert
                  "
                >
                  <IcOutlineClear
                    className="w-4 h-4"
                  />
                  <span>DELETE</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
        <hr className="border-inbetween"/>
        <div className="flex flex-row justify-between font-bold text-lg p-4">
          <h3 className="">Total Price: </h3>
          <h3 className="">16000 SYP</h3>
        </div>
      </section>
    </div>
  )
}