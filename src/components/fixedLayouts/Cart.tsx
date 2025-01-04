// COMPONENTS
import SolarCart4Outline from "@/components/svgs/SolarCart4Outline";
import ArrowUp from "@/components/svgs/ArrowUp";
import DisplayImg from "@/components/DisplayImg";

// STORES
import { useCartStore } from '@/stores/index';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.jpg"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"


export default function Cart () {

  const toggle = useCartStore((status:any) => status.toggle);
  const setToggle = useCartStore((status:any) => status.setToggle);
 
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset
    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        break;
      default:
        console.error('Unknown type: :', type);
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0 
        flex flex-col w-full h-full bg-[var(--shade-v2-color)] z-[2000]
        transition-all duration-300 ease-in-out
        ${toggle ? 'translate-y-[0%]' : 'translate-y-[-100%]'}
      `}
    >
      <button
        className="relative flex items-center justify-end w-full p-4 opacity-100 cursor-pointer"
        onClick={handleClick}
        data-type="close_button_is_clicked"
      >
        <div
          className="nav-active-effect z-10"
        >
          <SolarCart4Outline
            className="
              text-heading-invert cursor-pointer
            "
            width={24}
            height={24}
          />
        </div>
        <div
          className="
            absolute top-0 left-0 w-full h-full text-body text-3xl font-thin
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
      <div
        className="flex flex-1 flex-col bg-transparent w-[500px] mx-auto"
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
        <ul className="flex flex-col py-4 gap-4">
          <li className="flex">
            <DisplayImg
              className="w-[200px] aspect-[2/3] object-cover rounded-lg"
              src={outfit2}
            />
            <div className="flex-1"></div>
          </li>
          <li className="flex">
            <DisplayImg
              className="w-[200px] aspect-[2/3] object-cover rounded-lg"
              src={outfit1}
            />
            <div className="flex-1"></div>
          </li>
        </ul>
      </div>
    </div>
  )
}