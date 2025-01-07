"use client"

// HOOKS
import { ReactNode, useState, useRef } from 'react';

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

// JSON
import products from "@/json/products.json";

export default function AdvertTile () {
  
  const array = [1, 2, 3, 4];
  const selectedColor = "green";
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [leftArrowInactive, setLeftArrowInactive] = useState<boolean>(true);
  const [rightArrowInactive, setRightArrowInactive] = useState<boolean>(false);
  const ulRef = useRef<any>(null);
  const liRefs = useRef<(HTMLElement | null)[]>([]);
  const mainImgRefs = useRef<(HTMLElement | null)[]>([]);
  const secondImgRefs = useRef<(HTMLElement | null)[]>([]);

  const getImgUrls = (imgArray: any) => {
    return imgArray.find((itm: any) => itm.color === selectedColor);
  }

  const onColorChange = (color: string, productId: number) => {
    console.log('test');
    console.log('color:', color);
    console.log('productId:', productId);
    const getEL = (refs: any) => refs.find((el: any) => Number(el.dataset.productId) === productId);
    const getProduct = () => products.find(product => product.id === productId);
    console.log('main url: ', getProduct()?.img.find(itm => itm.color === color)?.main);
    console.log('main ref: ', getEL(mainImgRefs.current));

    if (getEL(mainImgRefs.current)) getEL(mainImgRefs.current).src = getProduct()?.img.find(itm => itm.color === color)?.main;
    if (getEL(secondImgRefs.current)) getEL(secondImgRefs.current).src = getProduct()?.img.find(itm => itm.color === color)?.second;
  }

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

  // DEBUG
  console.log('products: ', products);
  console.log('liRefs: ', liRefs.current);

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
          {products.map((product, i) => 
            <li
              className="flex flex-col shrink-0 gap-2 w-[250px] md:w-[300px]"
              key={i}
              data-product-id={product.id}
              ref={ (el: any) => {if (liRefs.current) {liRefs.current[i] = el}} }
            >
              <div
                className="relative"
              >
                <DisplayImg 
                  className="w-full peer aspect-[2/3] object-cover object-center rounded-lg"
                  src={getImgUrls(product.img).main}
                  alt="Image"
                  data-product-id={product.id}
                  ref={ (el: any) => {if (mainImgRefs.current) {mainImgRefs.current[i] = el}} }
              />
                <img 
                  className="
                    absolute top-0 left-0 w-full h-full 
                    object-cover object-center rounded-lg z-[5]
                    opacity-0 hover:opacity-100
                    blur-[20px] hover:blur-[0px]
                    transition-all ease-out duration-200
                  "
                  src={getImgUrls(product.img).second}
                  alt="Image"
                  data-product-id={product.id}
                  ref={ (el: any) => {if (secondImgRefs.current) {secondImgRefs.current[i] = el}} }
                />
                <span 
                  className="absolute bottom-2 left-2 text-xs text-body-invert bg-primary px-2 py-1 rounded-lg z-[10]"
                >
                  NEW
                </span>
                <LineMdHeart 
                  className="absolute top-2 right-2 w-6 h-6 text-pink-500 cursor-pointer z-[10]"
                />
              </div>
              <h3
                className="text-heading text-md mb-auto"
              >
                {product.name}
              </h3>
              <PriceTag 
                price={product.price} 
                discount={product.discount}
              />
              <ColorPallete 
                colorsArray={product.color}
                productId={product.id}
                currentColor={onColorChange}
              />
            </li>    
          )}
        </ul>
      </div>
    </section>
  )
}