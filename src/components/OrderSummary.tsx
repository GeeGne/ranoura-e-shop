// COMPONENTS
import Image from 'next/image';

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
  
  const cart = [1, 2, 3, 4, 5, 6];

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
            PRODUCT
          </span>
          <span
            className="lg:z-[10]"
          >
            PRICE
          </span>
        </div>
        
        <hr className="lg:sticky lg:top-7 border-inbetween border-[2px] lg:z-[10]" />

        <ul
          className={`
            flex flex-col gap-4
          `}
        >
          {cart.map(itm =>
            <li
              key={itm}
              className="flex gap-4"
            >
              <section
                className="relative rounded-lg overflow-hidden"
              >
                <img
                  alt="product Image"
                  src={outfit1}
                  className="w-[100px] md:w-[200px] ratio-[2/3] object-cover object-center drop-shadow-md"
                />
                <span
                  className="
                    absolute top-0 right-0 
                    text-heading-invert font-bold
                    px-2 py-1 z-[5]
                  "
                >
                  4
                </span>
                <div
                  className="
                    absolute top-0 left-full 
                    translate-x-[-50%] translate-y-[-50%]
                    w-16 h-16 bg-primary rounded-full bg-
                  "
                />                
              </section>
              <section
                className="flex flex-col flex-1 gap-2"
              >
                <h3 className="text-sm md:text-base text-heading">
                  Warm Jacket for casual days
                </h3>
                <div className="flex gap-2 items-center text-sm md:text-base text-heading font-bold">
                  <span>
                    BLACK
                  </span> {' | '}
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-primary rounded-full" />
                </div>
                <div className="flex gap-2 items-center text-heading">
                  <span className="text-sm md:text-base text-body">
                    size:
                  </span>
                  <span className="text-sm md:text-base font-bold">
                    M
                  </span>
                </div>
                <div className="flex gap-2 items-center text-heading">
                  <span className="text-sm md:text-base text-body">
                    quantity:
                  </span>
                  <span className="text-sm md:text-base font-bold">
                    2
                  </span>
                </div>
              </section>
              <section
                className="flex"
              >
                <span
                  className="text-sm md:text-base"
                >
                  300 SYP
                </span>
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
            Sub Total
          </span>
          <span className="text-heading">
            300 SYP
          </span>
        </div>

        <div
          className="flex justify-between text-base"
        >
          <span className="text-body">
            Shipping fee
          </span>
          <span className="text-heading">
            200 SYP
          </span>
        </div>

        <div
          className="flex justify-between text-lg font-bold "
        >
          <span className="text-body">
            TOTAL
          </span>
          <span className="text-heading">
            500 SYP
          </span>
        </div></>
      }
    </section>    

  )
}