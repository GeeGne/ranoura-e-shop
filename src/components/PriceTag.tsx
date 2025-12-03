import calculatePriceAfterDiscount from "@/utils/calculatePriceAfterDiscount";

type Props = {
  price?: number;  
  discount?: number;
  hidePercent?: boolean;
  textSize?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"div">;

export default function PriceTag ({
  price = 0, 
  discount = 0, 
  hidePercent = false, 
  textSize = "lg", 
  isLoading = false,
  ...props 
}: Props) {

  if (isLoading) return (
    <div>
      <div
         className="flex flex-col gap-2"
       >
        <div
          className="flex items-center gap-2"
        >
          <span
            className={`
              --opacity-blink text-transparent bg-background-light rounded-md font-bold
              ${textSize === 'lg' 
                ? 'text-lg' 
                : textSize === 'base' 
                ? 'text-base' : 'text-sm'
              }
            `}
          >
            /////////
          </span>
          <s
            className={`
              --opacity-blink text-transparent bg-background-light font-bold rounded-md
              ${textSize === 'lg' 
                ? 'text-base' 
                : textSize === 'base' 
                ? 'text-sm' : 'text-xs'
              }
            `}
          >
            ////////
          </s>
        </div> 
          {hidePercent ||
              <span
              className={`
                --opacity-blink text-transparent bg-background-light rounded-md w-fit font-bold
                ${textSize === 'lg' 
                  ? 'text-sm' 
                  : textSize === 'base' 
                  ? 'text-xs': 'text-xs'
                }
              `}
            >
              ///////////
            </span>
          }
      </div>
    </div>
  )
  
  return (
    <div
      { ...props }
    >
      {discount > 0
        ? <div
            className="flex flex-col"
          >
            <div
              className="flex items-center gap-2"
            >
              <span
                className={`
                  text-red-600 font-bold
                  ${textSize === 'lg' 
                    ? 'text-lg' 
                    : textSize === 'base' 
                    ? 'text-base' : 'text-sm'
                  }
                `}
              >
                {calculatePriceAfterDiscount({ price, discount })} SYP
              </span>
              <s
                className={`
                  text-body-light font-bold
                  ${textSize === 'lg' 
                    ? 'text-base' 
                    : textSize === 'base' 
                    ? 'text-sm' : 'text-xs'
                  }
                `}
              >
                {price}
              </s>
            </div> 
              {hidePercent ||
                  <span
                  className={`
                    text-body font-bold
                    ${textSize === 'lg' 
                      ? 'text-sm' 
                      : textSize === 'base' 
                      ? 'text-xs': 'text-xs'
                    }
                  `}
                >
                  {discount}% Off
                </span>
              }
          </div>
        : <div
            className={`
              text-heading font-bold
              ${textSize === 'lg' 
                ? 'text-lg' 
                : textSize === 'base' 
                ? 'text-base' : 'text-sm'
              }
            `}
          >
            {price} SYP
          </div>
      }
    </div>
  )
}