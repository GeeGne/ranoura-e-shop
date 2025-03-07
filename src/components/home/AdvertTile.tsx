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
import LineMdHeartFilled from '@/components/svgs/LineMdHeartFilled';
import SquareLines from '@/components/svgs/SquareLines';
import CircleLines from '@/components/svgs/CircleLines';
import FlowerLines from '@/components/svgs/FlowerLines';
import FoundationBurstSale from '@/components/svgs/FoundationBurstSale';
import PepiconsPencilOpenCircleFilled from '@/components/svgs/PepiconsPencilOpenCircleFilled';
import LineMdArrowsDiagonalRotated from '@/components/svgs/LineMdArrowsDiagonalRotated';
import LineMdImageTwotone from '@/components/svgs/LineMdImageTwotone';
import New from '@/components/svgs/New';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

// JSON
import products from "@/json/products.json";

// UTILS
import strSpaceToHyphen from '@/utils/strSpaceToHyphen';

// STORES
import { 
  useLayoutRefStore, useFavouritesStore, 
  useFavouriteConfettiToggle, useAlertMessageStore
} from '@/stores/index';

// CONFETTI 
import Confetti from "react-canvas-confetti/dist/presets/explosion";

type Props = {
  title?: string;
  category?: string;
  type?: string;
  slug?: string;
}

export default function AdvertTile ({ title = 'COLLECTION', category = 'collection', type = "collection", slug = 'collection' }: Props) {
  
  const router = useRouter();
  const array = [1, 2, 3, 4];
  const selectedColor = "green";
  const filterProductsBasedOnSlug = () => products.filter(product => 
    product.categories.some(prodCat => prodCat === slug)
  );
  const favourites = useFavouritesStore(state => state.favourites);
  const setFavourites = useFavouritesStore(state => state.setFavourites);
  
  const setConfettiToggle = useFavouriteConfettiToggle(state => state.setToggle);
  const confettiToggle = useFavouriteConfettiToggle(state => state.toggle);
  const confettiTimerId = useRef<any>(0);

  const layoutRef = useLayoutRefStore((state: any) => state.layoutRef);
  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ scrollWidth, setScrollWidth ] = useState<number>(0);
  const [ leftArrowInactive, setLeftArrowInactive ] = useState<boolean>(true);
  const [ rightArrowInactive, setRightArrowInactive ] = useState<boolean>(false);
  const [ imgScaleToggle, setImgScaleToggle ] = useState<boolean | number>(false);
  const [ heartActiveId, setHeartActiveId ] = useState<number | null>(null);

  const ulRef = useRef<any>(null);
  const liRefs = useRef<(HTMLElement | null)[]>([]);
  const mainImgRefs = useRef<(HTMLElement | null)[]>([]);
  const secondImgRefs = useRef<(HTMLElement | null)[]>([]);
  const imgAorBRefs = useRef<(HTMLElement | null)[]>([]);
  const aBtnRefs = useRef<(HTMLElement | null)[]>([]);
  const bBtnRefs = useRef<(HTMLElement | null)[]>([]);

  const getImgUrl = (imgArray: any) => imgArray.find((itm: any) => itm.color === selectedColor);

  const displayPrideConfetti = () => {
    setTimeout(() => {
      setConfettiToggle(true);
    }, 400)

    clearTimeout(confettiTimerId?.current);
    // confettiTimerId?.current = setTimeout(() => {
    setTimeout(() => {
      setConfettiToggle(false);
    }, 1000)
  };

  const onColorChange = (color: string, productId: number) => {
    const getProduct = () => products.find(product => product.id === productId);
    const getEL = (refs: ReactNode[] | any[]) => refs.find((el) => Number(el.dataset.productId) === productId);
    
    if (getEL(mainImgRefs.current))
      getEL(mainImgRefs.current).src = getProduct()?.images.find(itm => itm.color === color)?.main;

    if (getEL(secondImgRefs.current)) {
      const isSecondImgExist = !!getProduct()?.images.find(itm => itm.color === color)?.second;
      if (!isSecondImgExist) { 
        getEL(secondImgRefs.current).style.display = 'none'
        getEL(imgAorBRefs.current).style.display = 'none'
        return;
      };

      // Reset the A & B Button back to A along with main image
      getEL(aBtnRefs.current).classList.add('advert-picked-image');
      getEL(bBtnRefs.current).classList.remove('advert-picked-image');
      if (getEL(secondImgRefs.current)) getEL(secondImgRefs.current).style.opacity = '0'
      if (getEL(secondImgRefs.current)) getEL(secondImgRefs.current).style.filter = 'blur(20px)'

      // Add the Second Image if exists
      getEL(secondImgRefs.current).style.display = 'inline';
      getEL(secondImgRefs.current).src = getProduct()?.images.find(itm => itm.color === color)?.second
      getEL(imgAorBRefs.current).style.display = 'flex'
    };
  }
  const handleClick = (e: React.MouseEvent<HTMLElement | any>) => {
    e.stopPropagation();
  
    const { type, index, productUri, productId, productName } = e.currentTarget.dataset;
    const ulRefWidth = ulRef.current.offsetWidth
    const ulRefScrollWidth = ulRef.current.scrollWidth
    const liRefWidth = liRefs?.current[0]?.scrollWidth || 0;
    const gap = parseFloat(getComputedStyle(ulRef.current).gap);
    const totalTiles = array.length - 1
    const scrollTotalWidth = ulRefWidth / (totalTiles) + gap;
    const getEL = (refs: ReactNode[] | any[]) => refs.find((el) => Number(el.dataset.productId) === Number(productId));

    switch (type) {
      case 'navigate_to_category':
      case 'navigate_to_product':
        setTimeout(() => 
          layoutRef.scrollTo({top: 0, behavior: "instant"})
        , 200);
        break;
      case 'product_img_wrapper_is_clicked':
        // setImgScaleToggle(val => val === Number(index) ? false : Number(index));
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
      case 'heart_button_is_clicked':
        const isProductInFavourites = favourites.some(productID => productID === Number(productId));
          
        
        if (!isProductInFavourites) {
          displayPrideConfetti();
          setHeartActiveId(Number(index));

          setAlertToggle(Date.now());
          setAlertType("wishlist");
          setAlertMessage(`Following item "${productName}" is added.`);
        } else {
          setAlertToggle(Date.now());
          setAlertType("wishlist");
          setAlertMessage(`Following item "${productName}" is removed.`);
        }

        setFavourites(
          isProductInFavourites
            ? favourites.filter(productID => productID !== Number(productId))
            : [...favourites, Number(productId)] 
        )
        break;
        case'a_button_is_clicked':
          if (getEL(aBtnRefs.current)) getEL(aBtnRefs.current).classList.add('advert-picked-image');
          if (getEL(bBtnRefs.current)) getEL(bBtnRefs.current).classList.remove('advert-picked-image');

          if (getEL(secondImgRefs.current)) getEL(secondImgRefs.current).style.opacity = '0'
          if (getEL(secondImgRefs.current)) getEL(secondImgRefs.current).style.filter = 'blur(20px)'
          break;
        case'b_button_is_clicked':
          // if (getEL(secondImgRefs.current)) getEL(secondImgRefs.current).style.display = 'initial'
          if (getEL(aBtnRefs.current)) getEL(aBtnRefs.current).classList.remove('advert-picked-image');
          if (getEL(bBtnRefs.current)) getEL(bBtnRefs.current).classList.add('advert-picked-image');

          if (getEL(secondImgRefs.current)) getEL(secondImgRefs.current).style.opacity = '1'
          if (getEL(secondImgRefs.current)) getEL(secondImgRefs.current).style.filter = 'blur(0px)'
          break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG
  // console.log('products: ', products);
  // console.log('liRefs: ', liRefs.current);
  // console.log('liRefWidth: ', liRefWidth);
  // console.log('ulRefWidth', ulRefWidth)
  // console.log('ulRefScrollWidth', ulRefScrollWidth)
  // console.log('favourites: ', favourites);
  // console.log('layoutRef: ', layoutRef);
  // console.log('getImgUrls(product.images)?.second: ', getImgUrls(products[1].images)?.second);
  
  return (
    <section
      className="flex flex-col gap-4 px-4 py-8"
    >
      <div
        className="flex items-center justify-between"
      >
        <Link
          className="relative flex items-center text-3xl text-heading font-bold transform"
          href={`/shop/category/${type}/${slug}`}
          data-type="navigate_to_category"
          onClick={handleClick}
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
            href={`/shop/category/${type}/${slug}`}
            data-type="navigate_to_category"
            onClick={handleClick}
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
          {filterProductsBasedOnSlug().map((product, i) => 
            <li
              className="flex flex-col shrink-0 gap-2 w-[250px] md:w-[350px] lg:w-[400px]"
              key={i}
              data-product-id={product.id}
              ref={ (el: any) => {if (liRefs.current) {liRefs.current[i] = el}} }
            >
              <div
                className={`
                  relative cursor-pointer rounded-lg
                  transition-all duraiton-200 ease-in-out
                `}
                data-type="product_img_wrapper_is_clicked"
                data-index={i}
                onClick={handleClick}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <img 
                    className={`
                      w-full peer aspect-[2/3] object-cover object-center
                      transition-all ease-in-out duration-200
                      ${imgScaleToggle === i? 'scale-[130%]' : 'scale-[100%]'}  
                    `}
                    src={getImgUrl(product.images)?.main}
                    alt={product.name}
                    loading="lazy"
                    data-product-id={product.id}
                    ref={ (el: any) => {if (mainImgRefs.current) {mainImgRefs.current[i] = el}} }
   rounded-lg                />
                  <img 
                    className={`
                      absolute top-0 left-0 w-full h-full
                      object-cover object-center z-[5] overflow-hidden
                      opacity-0 peer-hover:opacity-100 group-hover:opacity-100
                      blur-[20px] peer-hover:blur-[0px] group-hover:blur-[0px]
                      transition-all ease-in-out duration-200
                      ${imgScaleToggle === i? 'scale-[130%]' : 'scale-[100%]'}  
                    `}
                    src={getImgUrl(product.images)?.second}
                    alt="Image"
                    loading="lazy"
                    data-product-id={product.id}
                    ref={ (el: any) => { if (secondImgRefs.current) {secondImgRefs.current[i] = el}} }
                  />            
                </div>
                <div
                  className="absolute top-0 left-0 flex flex-col gap-4 p-2 z-[10] drop-shadow-md"
                >
                  {product.forced_new &&
                    <div
                      className="
                        relative drop-shadow-md 
                      "
                    >
                      <SquareLines 
                        className="
                          --brightness-filter w-10 md:w-12 h-10 md:h-12 drop-shadow-md contrast-[150%]  
                        "
                      />
                      <span 
                        className="
                          absolute top-1/2 left-[50%]
                          translate-x-[-50%] translate-y-[-50%]
                          text-xs md:text-sm font-bold text-heading-invert bg-primary bg-clip-text outlined-text drop-shadow-mg
                        "
                      >
                        NEW
                      </span>
                    </div>
                  }
                  {!!product.discount_percent &&
                    <div
                      className="
                        relative drop-shadow-md 
                      "
                    >
                      <FlowerLines 
                        className="
                          --rotate-ani duration--10s w-10 md:w-12 h-10 md:h-12 drop-shadow-md contrast-[150%] brightness-[120%]  
                        "
                      />
                      <span 
                        className="
                          absolute top-1/2 left-[50%]
                          translate-x-[-50%] translate-y-[-50%]
                          text-xs md:text-sm font-bold text-heading-invert bg-primary bg-clip-text outlined-text 
                          drop-shadow-mg
                        "
                      >
                        SALE
                      </span>
                    </div>
                  }
                </div>
                <div
                  className={`
                    absolute top-2 right-2 w-6 h-6 text-pink-500 cursor-pointer z-[10]
                    ${favourites.some(productId => productId === product.id)
                      && heartActiveId === i 
                      && '--heart-ani'
                    }
                  `}
                  data-index={i}
                  data-type="heart_button_is_clicked"
                  data-product-id={product.id}
                  data-product-name={product.name}
                  onClick={handleClick}
                >
                  <LineMdHeart
                    className="z-[5]"
                  />
                  <LineMdHeartFilled
                      className={`
                        absolute top-1/2 left-1/2 
                        translate-x-[-50%] translate-y-[-50%] z-[10]
                        transition-all ease-in-out duration-200
                        ${favourites.some(productId => productId === product.id)
                          ? 'opacity-100'
                          : 'opacity-0'
                        }
                      `}
                  />
                  {favourites.some(productId => productId === product.id) 
                    && confettiToggle 
                    && heartActiveId === i 
                    && <Confetti
                      className={`
                        absolute top-1/2 left-1/2 
                        translate-x-[-50%] translate-y-[-50%] 
                        w-[1000px] h-[1000px] scale-[100%]
                      `}
                      autorun={{ speed: 1 }}
                      decorateOptions={(options) => (
                        { ...options, colors: ['#ed4a9b'] }
                      )}
                    />
                  }
                </div>
                <nav
                  className={`
                    absolute bottom-0 right-0 p-2 z-[10]
                    flex flex-row w-full justify-between items-end
                  `}
                >
                  <LineMdArrowsDiagonalRotated 
                    className={`
                      order-2 w-8 h-8 transform-style-3d transform group-hover:transform-style-3d 
                      cursor-pointer rounded-full p-1 ml-auto
                      transition-all ease-in-out duration-200
                      ${imgScaleToggle === i ? 'text-heading-invert bg-heading' : 'text-body hover:text-heading'}
                    `}
                    role="button"
                    data-type="scale_button_is_clicked"
                    data-index={i}
                    onClick={handleClick}
                  />
                  <div
                    className="
                      order-1 flex flex-row items-center gap-2 
                      rounded-lg border-solid border-heading-invert border-[2px] p-1 backdrop-brightness-[70%]
                    "
                    data-product-id={product.id}
                    ref={ (el: any) => {if (imgAorBRefs.current) {imgAorBRefs.current[i] = el} }}
                  >
                    <LineMdImageTwotone className="w-5 h-5 text-heading-invert" />
                    <button
                      className="
                        advert-picked-image text-xs font-bold px-[4px] rounded-full 
                        text-heading-invert hover:bg-heading 
                        border-solid border-heading-invert border-[2px]
                        transition-all ease-in-out duration-200
                      "
                      data-type="a_button_is_clicked"
                      data-product-id={product.id}
                      onClick={handleClick}
                      ref={ (el: any) => {if (aBtnRefs.current) {aBtnRefs.current[i] = el} }}
                    >
                      A                     
                    </button>
                    <button
                      className="
                        text-xs font-bold px-[4px] rounded-full 
                        text-heading-invert hover:bg-heading 
                        border-solid border-heading-invert border-[2px]
                        transition-all ease-in-out duration-200
                      "
                      data-type="b_button_is_clicked"
                      data-product-id={product.id}
                      onClick={handleClick}
                      ref={ (el: any) => {if (bBtnRefs.current) {bBtnRefs.current[i] = el} }}
                    >
                      B                     
                    </button>
                  </div>
                </nav>
              </div>
              <Link
                className="text-heading text-base mb-auto"
                href={`/shop/${product.id}/${strSpaceToHyphen(product.name)}`}
                data-type="navigate_to_product"
                data-product-id={product.id}
                onClick={handleClick}
              >
                {product.name}
              </Link>
              <PriceTag 
                price={product.price} 
                discount={product.discount_percent}
              />
              <ColorPallete 
                colorsArray={product.colors}
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