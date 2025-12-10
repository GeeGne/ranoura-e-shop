// COMPONENTS
import Image from 'next/image';
import PriceTag from '@/components/PriceTag';

// STORES
import { useCartStore, useLanguageStore } from "@/stores/index";

// JSON
// import products from '@/json/products.json';
import colors from '@/json/colors.json';

// UTILS
import calculatePriceAfterDiscount from "@/utils/calculatePriceAfterDiscount";
import calculateTotalPrice from '@/utils/calculateTotalPrice';
import getProduct from '@/utils/getProduct';
import getImgUrl from '@/utils/getImgUrl';
import getColor from '@/utils/getColor';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.avif";
const outfit1 = "assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.avif"
const outfit3 = "assets/img/outfit-3.avif"

type Props = {
  className?: string;
  products?: any[];
  hideProductsSection?: boolean;
  hideTotalSection?: boolean;
} & React.ComponentPropsWithRef<"section">;

export default function LoadingLayout ({ 
  className,
  hideProductsSection = false, 
  hideTotalSection = false, 
  ...props 
}: Props) {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  // console.log('getProduct OrderSummary: ', getProduct(products, '3b3dccc8-75ac-4567-9a24-7d84dfae4970')?.name);

  return (
    <section
      className={`
        --opacity-blink flex flex-col gap-2
        ${className}
      `}
      { ...props }
    >
      {hideProductsSection ||
        <><div
          className="
            lg:relative lg:sticky lg:top-0 flex justify-between text-sm font-bold text-body lg:z-[5]
            lg:before:content-[''] lg:before:absolute lg:before:top-0 lg:before:left-0 
            lg:before:w-full lg:before:h-[calc(100%+0.5rem)] lg:before:bg-background lg:before:z-[5]
          "
        >
          <span
            className="text-transparent bg-background-light lg:z-[10]"
          >
            //////////
          </span>
          <span
            className="text-transparent bg-background-light lg:z-[10]"
          >
            ///////
          </span>
        </div>
        <hr className="lg:sticky lg:top-7 border-background-light border-[2px] lg:z-[10]" />
        <ul
          className={`
            flex flex-col gap-4
          `}
        >
          {[1, 2 ,3 , 4].map((itm, i) =>
            <li
              key={i}
              className="flex gap-4"
            >
              <section
                className="relative"
              >
                <div
                  className="
                    bg-background-light
                    rounded-lg shrink-0 w-[100px] min-w-[100px] h-auto md:w-[200px] 
                    ratio-[2/3] object-cover object-center drop-shadow-md
                  "
                />
                <div
                  className="
                    hidden absolute top-0 left-full 
                    translate-x-[-50%] translate-y-[-50%]
                    w-16 h-16 bg-background-light rounded-full bg-
                  "
                />                
              </section>
              <section
                className="flex flex-col flex-1 gap-2"
              >
                <div
                  className="flex justify-between"
                >
                  <h3 className="text-base md:text-lg text-transparent bg-background-light rounded-md">
                    ////////////////
                  </h3>
                  <h3
                    className="text-base md:text-lg text-transparent font-bold bg-background-light rounded-md"
                  >
                    //////////////
                  </h3>
                </div>
                <div className="flex gap-2 items-center text-sm md:text-base text-transparent font-bold">
                  <span className="text-transparent bg-background-light rounded-md">
                    //////////////////////
                  </span> {' | '}
                  <div 
                    className="w-3 md:w-4 h-3 md:h-4 bg-background-light rounded-full drop-shadow-md"
                  />
                </div>
                <div className="flex gap-2 items-center text-heading">
                  <span className="text-sm md:text-base text-transparent bg-background-light rounded-md">
                    ///////
                  </span>
                    <PriceTag 
                        className="md:hidden whitespace-nowrap" 
                        hidePercent={true}
                        textSize='sm'
                        isLoading={true}
                    />
                    <PriceTag 
                        className="hidden md:inline whitespace-nowrap" 
                        hidePercent={true}
                        textSize='base'
                        isLoading={true}
                    />
                  <span className="text-sm md:text-base font-bold text-transparent bg-background-light rounded-md">
                    //////
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-sm md:text-base text-transparent bg-background-light rounded-md">
                    //////////////
                  </span>
                  <span className="text-sm md:text-base font-bold text-transparent bg-background-light rounded-md">
                    ///
                  </span>
                </div>
              </section>
            </li>
          )}
        </ul>
        <hr className="lg:sticky lg:bottom-0 border-background-light border-[2px]" /></>
      }

      {hideTotalSection ||
        <><div
          className="flex justify-between text-base"
        >
          <span className="text-transparent bg-background-light rounded-md">
            {isEn ? 'Sub Total' : 'المجموع الفرعي'}
            //////////////////////////////
          </span>
          <span className="text-transparent bg-background-light rounded-md">
            //////
          </span>
        </div>

        <div
          className="flex justify-between text-base"
        >
          <span className="text-transparent bg-background-light rounded-md">
            {isEn ? 'Shipping fee' : 'رسوم الشحن'}
            /////////////
          </span>
          <span className="text-transparent bg-background-light rounded-md">
            ///////
          </span>
        </div>

        <div
          className="flex justify-between text-lg font-bold "
        >
          <span className="text-transparent bg-background-light rounded-md">
            ////////
          </span>
          <span className="text-transparent bg-background-light rounded-md">
            //////
          </span>
        </div></>
      }
    </section>    
  )
}