"use client"

// HOOKS
import { ReactNode, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

// COMPONENTS
import DisplayImg from '@/components/DisplayImg';
import PriceTag from '@/components/PriceTag';
import ColorPallete from '@/components/ColorPallete';
import BtnA from '@/components/BtnA';
import EpArrowLeft from '@/components/svgs/EpArrowLeft';
import LineMdHeart from '@/components/svgs/LineMdHeart';
import PepiconsPencilOpenCircleFilled from '@/components/svgs/PepiconsPencilOpenCircleFilled';
import LineMdArrowsDiagonalRotated from '@/components/svgs/LineMdArrowsDiagonalRotated';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.jpg"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

// JSON
import products from "@/json/products.json";

// UTILS
import strSlugForProducts from '@/utils/strSlugForProducts';

type Props = {
  title?: string;
}

export default function AdvertTile ({ title = 'COLLECTION' }: Props) {
  
  const router = useRouter();
  const array = [1, 2, 3, 4];
  const selectedColor = "green";
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [leftArrowInactive, setLeftArrowInactive] = useState<boolean>(true);
  const [rightArrowInactive, setRightArrowInactive] = useState<boolean>(false);
  const [imgScaleToggle, setImgScaleToggle] = useState<boolean | number>(false);
  const ulRef = useRef<any>(null);
  const liRefs = useRef<(HTMLElement | null)[]>([]);
  const mainImgRefs = useRef<(HTMLElement | null)[]>([]);
  const secondImgRefs = useRef<(HTMLElement | null)[]>([]);

  const getImgUrls = (imgArray: any) => {
    return imgArray.find((itm: any) => itm.color === selectedColor);
  }

  const onColorChange = (color: string, productId: number) => {
    const getProduct = () => products.find(product => product.id === productId);
    const getEL = (refs: ReactNode[] | any[]) => refs.find((el) => Number(el.dataset.productId) === productId);
    
    if (getEL(mainImgRefs.current))
      getEL(mainImgRefs.current).src = getProduct()?.img.find(itm => itm.color === color)?.main;
    if (getEL(secondImgRefs.current))
      getEL(secondImgRefs.current).src = getProduct()?.img.find(itm => itm.color === color)?.second;
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { type, index, productUri } = e.currentTarget.dataset;
    const ulRefWidth = ulRef.current.offsetWidth
    const ulRefScrollWidth = ulRef.current.scrollWidth
    const liRefWidth = liRefs?.current[0]?.scrollWidth || 0;
    console.log('liRefWidth: ', liRefWidth);
    console.log('ulRefWidth', ulRefWidth)
    console.log('ulRefScrollWidth', ulRefScrollWidth)
    const gap = parseFloat(getComputedStyle(ulRef.current).gap);
    const totalTiles = array.length - 1
    const scrollTotalWidth = ulRefWidth / (totalTiles) + gap;
    switch (type) {
      case 'navigate_to_product':
        setImgScaleToggle(val => val === Number(index) ? false : Number(index))
        break;
      case 'scroll_left_button_is_clicked':
        setScrollWidth((val: number) => {
          if (-1 * (val + liRefWidth + gap) <= 0) { 
            setLeftArrowInactive(true);
            setRightArrowInactive(false);

            return 0;
          };

          setLeftArrowInactive(false);
          setRightArrowInactive(true);
          return val + liRefWidth + gap
        });
        break;
      case 'scroll_right_button_is_clicked':
        setScrollWidth((val: number) => {
          if (-1 * (val - liRefWidth - gap) >= ulRefScrollWidth - ulRefWidth) { 
            setLeftArrowInactive(false);
            setRightArrowInactive(true);

            return -1 * (ulRefScrollWidth - ulRefWidth)
          };

          setLeftArrowInactive(true);
          setRightArrowInactive(false);
          return val - liRefWidth - gap
        });
        break;
      case 'scale_button_is_clicked':
        setImgScaleToggle(val => val === Number(index) ? false : Number(index))
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG
  // console.log('products: ', products);
  // console.log('liRefs: ', liRefs.current);
  
  return (
    <section
      className="flex flex-col gap-4 px-4 py-8"
    >
      <div
        className="flex items-center justify-between"
      >
        <Link
          className="relative flex items-center text-3xl text-heading font-bold transform"
          href="/categories/test"
        >
          <span>
            {title}
          </span>
          <div
            className="absolute bottom-0 left-0 w-[calc(100%+1rem)] h-[40%] backdrop-invert origin-left translate-x-4"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/categories/test"
          >
            <PepiconsPencilOpenCircleFilled
              className="cursor-pointer my-auto text-heading"
              role="button"
              width={32}
              height={32}
            />        
          </Link>
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
                className={`
                  relative group cursor-pointer
                  transition-all duraiton-200 ease-in-out
                  ${imgScaleToggle === i? 'scale-[130%] z-[10]' : 'scale-[100%]'}  
                `}
                data-type="navigate_to_product"
                data-index={i}
                onClick={handleClick}
              >
                <DisplayImg 
                  className="w-full peer aspect-[2/3] object-cover object-center rounded-lg"
                  src={getImgUrls(product.img)?.main}
                  alt={product.name}
                  data-product-id={product.id}
                  ref={ (el: any) => {if (mainImgRefs.current) {mainImgRefs.current[i] = el}} }
                />
                <img 
                  className="
                    absolute top-0 left-0 w-full h-full 
                    object-cover object-center rounded-lg z-[5] overflow-hidden
                    opacity-0 peer-hover:opacity-100 group-hover:opacity-100
                    blur-[20px] peer-hover:blur-[0px] group-hover:blur-[0px]
                    transition-all ease-in duration-200
                  "
                  src={getImgUrls(product.img)?.second}
                  alt="Image"
                  data-product-id={product.id}
                  ref={ (el: any) => { if (secondImgRefs.current) {secondImgRefs.current[i] = el}} }
                />
                <span 
                  className="absolute bottom-2 left-2 text-xs text-body-invert font-bold bg-primary px-2 py-1 rounded-lg z-[10]"
                >
                  NEW
                </span>
                <LineMdHeart 
                  className="absolute top-2 right-2 w-6 h-6 text-pink-500 cursor-pointer z-[10]"
                />
                <nav
                className={`
                  absolute bottom-2 right-2 z-[10]
                  flex flex-col
                `}
                >
                  <LineMdArrowsDiagonalRotated 
                    className={`
                      w-8 h-8 transform-style-3d transform group-hover:transform-style-3d 
                      cursor-pointer rounded-full p-1
                      ${imgScaleToggle === i ? 'text-heading-invert bg-heading' : 'text-body hover:text-heading'}
                    `}
                    data-type="scale_button_is_clicked"
                    data-index={i}
                    onClick={(e: any) => { e.stopPropagation(); handleClick(e) }}
                  />
                </nav>
              </div>
              <Link
                className="text-heading text-md mb-auto"
                href={`/product/${strSlugForProducts(product.name, product.id)}`}
              >
                {product.name}
              </Link>
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