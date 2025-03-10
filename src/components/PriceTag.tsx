import calculatePriceAfterDiscount from "@/utils/calculatePriceAfterDiscount";

type Props = {
  price?: number;  
  discount?: number;
} & React.ComponentPropsWithRef<"div">;

export default function PriceTag ({ price = 0, discount = 0, ...props }: Props) {
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
                className="text-red-600 text-lg font-bold"
              >
                {calculatePriceAfterDiscount({ price, discount })} SYP
              </span>
              <s
                className="text-body-light text-base font-bold"
              >
                {price}
              </s>
            </div> 
            <span
              className="text-body text-sm font-bold"
            >
              {discount}% Off
            </span>
          </div>
        : <div
            className="text-heading text-lg font-bold"
          >
            {price} SYP
          </div>
      }
    </div>
  )
}