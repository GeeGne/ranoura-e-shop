// UTILS
import calculatePrice from '@/utils/calculatePrice';

// JSON
import colors from '@/json/colors.json';

type Props = {
  items?: Record<string, any>;
  lang?: 'en' | 'ar';
  isLoading?: boolean;
}

export default function ItemsList ({
  items = [],
  lang = 'en',
  isLoading = false
}: Props) {

  if (isLoading) return (
    <ul
      className="flex flex-col gap-4 py-4"
    >
      {[1, 2, 3].map((num: number, i: number) => 
        <li className="flex gap-4 " key={i}>
          <div
            className="--opacity-blink bg-background-deep-light flex w-[150px] aspect-[2/3] object-center object-cover grow-0 rounded-lg"
          />
          <div className="flex flex-col flex-1 gap-2">
            <span className="--opacity-blink rounded-md bg-background-deep-light text-transparent">//////////</span>
            <span className="--opacity-blink rounded-md bg-background-deep-light text-transparent">//////////////</span>
            <div className="flex items-center mt-auto gap-2">
              <div 
                className="
                  flex gap-2 py-1 px-2
                  rounded-full bg-background-light w-fit
                "
              >
                <div 
                  className="--opacity-blink w-5 h-5 rounded-full bg-background-deep-light" 
                />
                <span 
                  className="
                    --opacity-blink rounded-md bg-background-deep-light text-sm text-transparent font-bold
                  "
                >
                  ///////
                </span>
              </div>
              <div 
                className="
                  --opacity-blink bg-background-deep-light h-fit text-sm text-transparent rounded-md font-bold px-1 py-0
                "
              >
                //
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-end">
            <span 
              className="
                --opacity-blink text-transparent rounded-md bg-background-deep-light font-bold border border-px border-background-deep-light 
                px-3 py-1 rounded-full my-auto
              "
              >
                /////////////
            </span>
            <span
              className="
                --opacity-blink rounded-md bg-background-deep-light text-transparent font-semibold mt-auto
              "
            >
              ////////
            </span>
          </div>
        </li>
      )}
    </ul>
  )

  return (
    <ul
      className="flex flex-col gap-4 py-4"
    >
      {items.map((product: Record<string, any>, i: number) => 
        <li className="flex gap-4 " key={i}>
          <img
            className="flex w-[150px] aspect-[2/3] object-center object-cover grow-0 rounded-lg"
            src={product.image_url}
          />
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-body">{product.type}</span>
            <span className="text-heading">{product.name[lang]}</span>
            <div className="flex items-center mt-auto gap-2">
              <div 
                className="
                  flex gap-2 py-1 px-2
                  rounded-full bg-background-light w-fit
                "
              >
                <div 
                  className="w-5 h-5 rounded-full" 
                  style={{ backgroundColor: colors.find((color: Record<string, any>) => color.name === product.color)?.hex}}
                />
                <span className="text-sm text-body-light font-bold">
                  {colors.find(color => color.name === product.color)?.title[lang] || product.color}\
                </span>
              </div>
              <div className="h-fit text-sm text-heading-invert bg-heading rounded-md font-bold px-1 py-0">{product.size}</div>
              {!product.discount_percent ||
                <span className="text-sm text-body border font-bold border-[2px] border-body-light px-1  rounded-md">
                {product.discount_percent} %
                </span>
              }
            </div>
          </div>
          <div className="flex flex-col flex-1 items-end">
            <span 
              className="
                text-body font-bold border border-px border-background-deep-light 
                px-3 py-1 rounded-full my-auto
              "
              >
                {product.quantity + ' x ' + product.price} SYP
            </span>
            {product.discount_percent 
              ? <div
                  className="
                    text-heading font-semibold mt-auto
                  "
                > 
                  <s className="text-sm text-body">
                    {calculatePrice(product.price, 0, product.quantity)}
                  </s>&ensp;
                  <span>
                    {calculatePrice(product.price, product.discount_percent, product.quantity)} SYP
                  </span>
                </div> 
              : <span
                  className="
                    text-heading font-semibold mt-auto
                  "
                >
                  {calculatePrice(product.price, product.discount_percent, product.quantity)} SYP 
                </span>
            }
          </div>
        </li>
      )}
    </ul>
  )
}