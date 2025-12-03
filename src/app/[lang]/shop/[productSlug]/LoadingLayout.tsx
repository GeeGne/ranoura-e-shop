// COMPONENTS
import BreadCrumb from '@/components/BreadCrumb';
import ProductDisplay from '@/components/productPage/ProductDisplay';
import ProductSize from '@/components/productPage/ProductSize';
import ProductLists from '@/components/productPage/ProductLists';
import PriceTag from '@/components/PriceTag';
import ColorPallete from '@/components/ColorPallete';
import BtnA from '@/components/BtnA';

type Props = {
  lang?: 'en' | 'ar';
  isEn?: boolean;
};

export default function LoadingLayout ({ lang = 'en', isEn = true }: Props) {
  return (
    <div
      className="
        flex flex-col gap-8 md:gap-8 p-4 
        md:grid md:grid-cols-2 md:max-w-[1400px] md:mx-auto
      "
    >
      <BreadCrumb
        isLoading={false}
      />
      <ProductDisplay 
        className="md:row-span-2 md:max-w-[600px] md:mx-auto"
        isLoading={true}
      />
      <section
        className="flex flex-col gap-4 md:row-span-2 md:py-8 lg:row-span-1"
      >
        <h2
          className="--opacity-blink bg-background-light rounded-md text-lg font-bold text-transparent"
        >
          /////////////////
        </h2>
        <h3
          className="--opacity-blink bg-background-light text-md text-transparent rounded-md"
        >
          /////////////////////////////////////////////
        </h3>
        <PriceTag isLoading={true} />
        <ProductSize isLoading={true} />
        <ColorPallete 
          className="mb-4"
          width="w-6"
          height="h-6"
          isLoading={true}
        />
        <section
          className="hidden lg:inline md:col-span-2 lg:col-span-2"
        >
          {[1, 2, 3, 4].map(num => 
            <ProductLists
              key={num}
              isLoading={true}
            />
          )}
        </section>
        <div
          className="
            --opacity-blink bg-background-light relative flex w-full mt-auto rounded-lg
          "
        >
          <BtnA
            className={`
              text-transparent order-2 flex-1 flex justify-center items-center 
              gap-2 font-bold text-base py-2
            `}
          >
            <div 
              className="w-4 h-4" 
            />
            {isEn ? 'ADD TO BAG' : 'اضف الى السله'}
          </BtnA>
          <label
            className="
              relative order-1 relative flex z-[10]
            "
          >
            <div 
              className={`
                w-16 bg-transparent text-left
                text-heading text-md font-bold px-4 focus:outline-none
              `}
            />
          </label>
        </div>
      </section>
      <section
        className="lg:hidden md:col-span-2 lg:col-span-1"
      >
        {[1, 2, 3, 4, 5].map(num => 
          <ProductLists
            isLoading={true}
          />
        )}
      </section>
    </div>
  )
}