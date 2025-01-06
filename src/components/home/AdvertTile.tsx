"use client"

// HOOKS
import { useState, useRef } from 'react';

// COMPONENTS
import DisplayImg from '@/components/DisplayImg';
import PriceTag from '@/components/PriceTag';
import ColorPallete from '@/components/ColorPallete';
import BtnA from '@/components/BtnA';
import EpArrowLeft from '@/components/svgs/EpArrowLeft';
import LineMdHeart from '@/components/svgs/LineMdHeart';
import LineMdHeartFilled from '@/components/svgs/LineMdHeartFilled';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.jpg"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

export default function AdvertTile () {
  
  const array = [1, 2, 3, 4];
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [leftArrowInactive, setLeftArrowInactive] = useState<boolean>(true);
  const [rightArrowInactive, setRightArrowInactive] = useState<boolean>(false);
  const ulRef = useRef<any>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;
    const ulRefWidth = ulRef.current.offsetWidth
    const ulRefScrollWidth = ulRef.current.scrollWidth
    const gap = parseFloat(getComputedStyle(ulRef.current).gap);
    const totalTiles = array.length - 1
    const scrollTotalWidth = ulRefWidth / (totalTiles) + gap;

    switch (type) {
      case 'scroll_left_button_is_clicked':
        setScrollWidth((val: number) => {
          if (val <= scrollTotalWidth) { 
            setLeftArrowInactive(true);
            setRightArrowInactive(false);

            return 0;
          };

          setLeftArrowInactive(false);
          setRightArrowInactive(true);
          return val + scrollTotalWidth
          // return -1 * (ulRefScrollWidth - ulRefWidth)
        });
        break;
      case 'scroll_right_button_is_clicked':
        setScrollWidth((val: number) => {
          if (val - scrollTotalWidth <= ulRefWidth) { 
            setLeftArrowInactive(false);
            setRightArrowInactive(true);

            return -1 * (ulRefScrollWidth - ulRefWidth)
          };

          setLeftArrowInactive(true);
          setRightArrowInactive(false);
          return val - scrollTotalWidth
        });
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <section
      className="flex flex-col gap-4 px-4"
    >
      <div
        className="flex justify-between"
      >
        <span
          className="relative text-3xl text-heading font-bold transform"
        >
          WHATS NEW?
          <div
            className="absolute bottom-0 left-0 w-[calc(100%+1rem)] h-[40%] backdrop-invert origin-left translate-x-4"
          />
        </span>
        <div className="flex gap-4">
          <BtnA
            className={`
              w-8 h-8 rounded-full
              ${leftArrowInactive ? 'bg-inbetween cursor-not-allowed' : 'bg-primary cursor-pointer'}
            `}
            effect={!leftArrowInactive}
            onClick={handleClick}
            data-type="scroll_left_button_is_clicked"
          >
            <EpArrowLeft
              className="
                text-heading-invert p-1
              "
              width={32}
              height={32}
              role="button"
              data-type="left_arrow_button_is_clicked"
            />
          </BtnA>
          <BtnA
            className={`
              w-8 h-8 rounded-full
              ${rightArrowInactive ? 'bg-inbetween cursor-not-allowed' : 'bg-primary cursor-pointer'}
            `}
            onClick={handleClick}
            effect={!rightArrowInactive}
            data-type="scroll_right_button_is_clicked"
          >
            <EpArrowLeft
              className="
                text-heading-invert p-1 rotate-180
              "
              width={32}
              height={32}
              role="button"
              data-type="left_arrow_button_is_clicked"
            />
          </BtnA>
        </div>
      </div>
      <div
        className="w-full"
      >
        <ul
          className="flex flex-row gap-4 transition-all duration-200 ease-in-out"
          style={{transform: `translateX(${scrollWidth}px)`}}
          ref={ulRef}
        >
          {array.map((itm, i) => 
            <li
              className="flex flex-col shrink-0 gap-2 w-[250px] md:w-[300px]"
              key={i}
            >
              <div
                className="relative"
              >
                <DisplayImg 
                  className="w-full aspect-[2/3] object-cover object-center rounded-lg"
                  src={outfit1}
                  alt="Image"
                />
                <span 
                  className="absolute bottom-2 left-2 text-xs text-body-invert bg-primary px-2 py-1 rounded-lg"
                >
                  NEW
                </span>
                <LineMdHeart 
                  className="absolute top-2 right-2 w-6 h-6 text-pink-500 cursor-pointer"
                />
              </div>
              <h3
                className="text-heading text-md"
              >
                Cozy Jacket
              </h3>
              <PriceTag />
              <ColorPallete colorsArray={['green', 'blue', 'yellow']} />
            </li>    
          )}
        </ul>
      </div>
    </section>
  )
}