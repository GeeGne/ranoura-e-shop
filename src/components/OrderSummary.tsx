// COMPONENTS
import Image from 'next/image';
import PriceTag from '@/components/PriceTag'

// STORES
import { useCartStore, useLanguageStore } from "@/stores/index"

// JSON
import products from '@/json/products.json';
import colors from '@/json/colors.json';

// UTILS
import calculatePriceAfterDiscount from "@/utils/calculatePriceAfterDiscount";
import calculateTotalPrice from '@/utils/calculateTotalPrice';
import getProduct from '@/utils/getProduct';
import getImgUrl from '@/utils/getImgUrl';
import getColor from '@/utils/getColor';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.jpg"
const outfit3 = "assets/img/outfit-3.jpg"

type Props = {
  className?: string;
  hideProductsSection?: boolean;
  hideTotalSection?: boolean;
} & React.ComponentPropsWithRef<"section">;

export default function OrderSummary ({ hideProductsSection = false, hideTotalSection = false, className, ...props }: Props) {
  
  // const cart = [1, 2, 3, 4, 5, 6];

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const cart = useCartStore(state => state.cart)

  const pricesArray = () => 
    cart.map(product => 
      calculatePriceAfterDiscount({
        price: getProduct(products, product.id).price, 
        discount: getProduct(products, product.id).discount_percent
      }) * product.quantity
    )
  ;

  return (
    <section
      className={`
        flex flex-col gap-2
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
            className="lg:z-[10]"
          >
            {isEn ? 'PRODUCT' : 'الغرض'}
          </span>
          <span
            className="lg:z-[10]"
          >
            {isEn ? 'PRICE' : 'السعر'}
          </span>
        </div>
        
        <hr className="lg:sticky lg:top-7 border-inbetween border-[2px] lg:z-[10]" />

        <ul
          className={`
            flex flex-col gap-4
          `}
        >
          {cart.map((product, i) =>
            <li
              key={i}
              className="flex gap-4"
            >
              <section
                className="relative"
              >
                <img
                  alt={getProduct(products, product.id).name}
                  src={getImgUrl(getProduct(products, product.id).images, product.color)?.main}
  
                  className="rounded-lg shrink-0 w-[100px] min-w-[100px] h-auto md:w-[200px] ratio-[2/3] object-cover object-center drop-shadow-md"
                />
                <span
                  className="
                    hidden absolute top-0 right-0 
                    text-heading-invert font-bold
                    px-2 py-1 z-[5]
                  "
                >
                  4
                </span>
                <div
                  className="
                    hidden absolute top-0 left-full 
                    translate-x-[-50%] translate-y-[-50%]
                    w-16 h-16 bg-primary rounded-full bg-
                  "
                />                
              </section>
              <section
                className="flex flex-col flex-1 gap-2"
              >
                <div
                  className="flex justify-between"
                >
                  <h3 className="text-base md:text-lg text-heading">
                    {getProduct(products, product.id)?.name[lang]}
                  </h3>
                  <h3
                    className="text-base md:text-lg text-content font-bold"
                  >
                    {calculatePriceAfterDiscount({ 
                        price: getProduct(products, product.id).price, 
                        discount: getProduct(products, product.id).discount_percent
                      }) * product.quantity} SYP
                  </h3>
                </div>
                <div className="flex gap-2 items-center text-sm md:text-base text-heading font-bold">
                  <span>
                    {product.size}
                  </span> {' | '}
                  <div 
                    className="w-3 md:w-4 h-3 md:h-4 bg-primary rounded-full drop-shadow-md"
                    style={{backgroundColor: getColor(colors, product.color).hex}}
                  />
                </div>
                <div className="flex gap-2 items-center text-heading">
                  <span className="text-sm md:text-base text-body">
                    {isEn ? 'Price:' : 'السعر:'}
                  </span>
                    <PriceTag 
                        className="md:hidden whitespace-nowrap" 
                        hidePercent={true}
                        textSize='sm'
                        price={getProduct(products, product.id).price} 
                        discount={getProduct(products, product.id).discount_percent}
                    />
                    <PriceTag 
                        className="hidden md:inline whitespace-nowrap" 
                        hidePercent={true}
                        textSize='base'
                        price={getProduct(products, product.id).price} 
                        discount={getProduct(products, product.id).discount_percent}
                    />
                  <span className="text-sm md:text-base font-bold">
                  </span>
                </div>
                <div className="flex gap-2 items-center text-heading">
                  <span className="text-sm md:text-base text-body">
                    {isEn ? 'Quantity:' : 'الكميه'}
                  </span>
                  <span className="text-sm md:text-base font-bold">
                    {product.quantity}
                  </span>
                </div>
              </section>
            </li>
          )}
        </ul>

        <hr className="lg:sticky lg:bottom-0 border-inbetween border-[2px]" /></>
      }

      {hideTotalSection ||
        <><div
          className="flex justify-between text-base"
        >
          <span className="text-body">
            {isEn ? 'Sub Total' : 'المجموع الفرعي'}
          </span>
          <span className="text-heading">
            {calculateTotalPrice(pricesArray())} SYP
          </span>
        </div>

        <div
          className="flex justify-between text-base"
        >
          <span className="text-body">
            {isEn ? 'Shipping fee' : 'رسوم الشحن'}
          </span>
          <span className="text-heading">
            200 SYP
          </span>
        </div>

        <div
          className="flex justify-between text-lg font-bold "
        >
          <span className="text-body">
            {isEn ? 'TOTAL' : 'المجموع'}
          </span>
          <span className="text-heading">
            500 SYP
          </span>
        </div></>
      }
    </section>    

  )
}