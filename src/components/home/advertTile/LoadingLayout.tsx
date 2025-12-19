// HOOKS
import { ReactNode, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// COMPONENTS
import PriceTag from '@/components/PriceTag';
import ColorPallete from '@/components/ColorPallete';
import FlowbiteExpandOutline from '@/components/svgs/FlowbiteExpandOutline';
import MdiReload from '@/components/svgs/MdiReload';

// STORES
import { useLanguageStore } from '@/stores/index';

// API
import getAllProducts from '@/lib/api/products/get';

type Props = {
  isError?: boolean;
};

export default function LoadingLayout ({
  isError = false
}: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const { 
    data: productsData, 
    isLoading: areProductsLoading, 
    isError: isProductsDataError,
    refetch: refetchProducts
  } = useQuery({
    queryKey: [ 'products' ],
    queryFn: getAllProducts
  });

  const handleClick = (e: React.MouseEvent<HTMLElement | any>) => {
    e.stopPropagation();
  
    const { type, index, productUri, productId, productName, imgUrl } = e.currentTarget.dataset;

    switch (type) {
      case 'reload_products_button_is_clicked':
        if (refetchProducts) refetchProducts();
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <section className="relative flex flex-col gap-4 px-4 py-8">
      {isError &&
        <div
          className="
            absolute top-0 left-0 w-full h-full 
            bg-[rgba(0%,0%,0%,0.5)] z-10 backdrop-blur-[5px] opacity-50
            flex flex-col items-center justify-center gap-4
          "
        >
          <h2 className="text-heading-invert font-semibold text-xl">
            {isEn ? 'FAILED TO LOAD PRODUCTS' : 'فشل في تحميل المنتجات'}
          </h2>
          <button
            className="
              group flex gap-2 border-solid border-px border-heading-invert 
              p-2 rounded-md hover:bg-heading-invert
              transition-all duraiton-200 ease-in-out
            "
            data-type="reload_products_button_is_clicked"
            onClick={handleClick}
          >
            <span 
              className="
                text-heading-invert group-hover:text-heading font-semibold
                transition-all duraiton-200 ease-in-out
              ">
                {isEn ? 'RELOAD' : 'اعاده المحاوله'}
              </span>
            <MdiReload 
              className="
                text-heading-invert group-hover:text-heading
                transition-all duraiton-200 ease-in-out
              " 
            />
          </button>
        </div>
      }
      <div className="flex items-center justify-between">
        <div className="--opacity-blink bg-background-light rounded-lg relative flex items-center text-3xl font-bold transform">
          <span className="text-transparent">//////////////////</span>
        </div>
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((itm, i) => 
            <div
              className="--opacity-blink w-8 h-8 bg-background-light rounded-full my-auto text-transparent"
              key={i}
            />        
          )}
        </div>
      </div>
      <div className="w-full">
        <ul
          className="flex flex-row gap-4 transition-all duration-200 ease-in-out"
        >
          {[1, 2, 3, 4, 5].map((product, i) => 
            <li
              className="flex flex-col shrink-0 gap-2 w-[250px] md:w-[350px] lg:w-[400px]"
              key={i}
            >
              <div
                className="relative transition-all duration-200 ease-in-out"
              >
                <div 
                  className="--opacity-blink bg-background-light relative w-full h-full aspect-[2/3] rounded-lg overflow-hidden"
                />
                <div
                  className={`
                    absolute top-0 flex flex-col gap-4 p-2 z-[10] drop-shadow-md
                    ${isEn ? 'left-0' : 'right-0'}
                  `}
                />
                <nav
                  className="absolute bottom-0 right-0 p-2 z-[10] flex flex-row w-full justify-between items-end"
                >
                  <div className="flex order-2 gap-2">
                    {[1, 2].map((itm, i) => 
                      <FlowbiteExpandOutline 
                        className={`
                          text-transparent bg-background-deep-light w-8 h-8 transform-style-3d transform group-hover:transform-style-3d 
                          rounded-full p-1 
                          transition-all ease-in-out duration-200
                          ${isEn ? 'ml-auto' : 'mr-auto'}
                        `}
                        key={i}
                      />
                    )}
                  </div>
                  <div
                    className="--opacity-blink bg-background-deep-light order-1 flex flex-row items-center gap-2 rounded-lg border-solid border-heading-invert border-[2px] p-1 backdrop-brightness-[70%]"
                  >
                    {[1, 2, 3].map((itm, i) => 
                      <div
                        className="w-5 h-5 font-bold px-[4px] rounded-full text-transparent transition-all ease-in-out duration-200"
                        key={i}
                      >
                        A                     
                      </div>  
                    )}
                  </div>
                </nav>
              </div>
              <span className="--opacity-blink text-transparent bg-background-light w-fit rounded-lg text-base mb-auto">
                ////////////////////////////////
              </span>
              <PriceTag 
                price={1000} 
                discount={10}
                isLoading={true}
              />
              <ColorPallete 
                isLoading={true}
              />
            </li>
          )}         
        </ul>
      </div>
    </section>
  )

}
