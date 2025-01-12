"use client"

// HOOKS
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

// COMPONENT
import ProductDisplay from '@/components/productPage/ProductDisplay';
import ProductSize from '@/components/productPage/ProductSize';
import ProductLists from '@/components/productPage/ProductLists';
import BreadCrumb from '@/components/BreadCrumb';
import ColorPallete from '@/components/ColorPallete';
import PriceTag from '@/components/PriceTag';
import BtnA from '@/components/BtnA';
import FamiconsBagAddOutlineBold from '@/components/svgs/FamiconsBagAddOutlineBold';

// STORES
import { useTabNameStore } from '@/stores/index';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.jpg";
const outfit1 = "/assets/img/outfit.jpg";
const outfit2 = "/assets/img/outfit-2.jpg";
const outfit3 = "/assets/img/outfit-3.jpg";

export default function ProductPage () {
  const slugArray = useParams().productNameAndId || [];
  // const productName = slugArray[0];
  // const productId = slugArray[1];

  const slugNameAndLinkArray = [
    {
      name: "Product",
      href: "/product"
    },{
      name: "Jeans",
      href: "/product/jeans"
    }
  ]

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('product');
  }, []);

  const onColorChange = () => {

  }

  // DEBUG
  // console.log('slug:', slugArray);
  // console.log('productName:', productName);
  // console.log('productId:', productId);

  return (
    <div
      className="flex flex-col gap-4 pt-[4rem] px-4"
    
    >
      <section
        className="flex flex-col gap-4"
      >
        <BreadCrumb
          slugNameAndLinkArray={slugNameAndLinkArray} 
        />
        <ProductDisplay />
      </section>
      <section
        className="flex flex-col gap-4"
      >
        <h2
          className="text-lg font-bold text-heading"
        >
          Long Jeans With a Skirt
        </h2>
        <PriceTag price={2000} discount={10}/>
        <ProductSize />
        <ColorPallete 
          width="w-6"
          height="h-6"
          colorsArray={['black', 'red']}
          productId={2}
          currentColor={onColorChange}
        />

        <BtnA
          className="
            flex justify-center items-center gap-2 font-bold text-md text-heading-invert 
            bg-gradient-to-r from-primary to-inbetween py-2 rounded-lg
          "
        >
          <FamiconsBagAddOutlineBold 
            width={16} 
            height={16}
          />
          ADD TO BAG
        </BtnA>
      </section>
      <section
        className=""
      >
        <ProductLists 
          title="PRODUCT DETAILS"
          descArray={[
            'Brand: Ranoura.',
            'Material: Fabric.',
            'Fit: Tight to body.',
            'NeckLine: None.',
            'Sleeves: Yes.',
            'Design: Italic'
          ]}
        />
        <ProductLists 
          title="SIZE INFO"
          descArray={[
            'True to size.',
            'XXS: 0.',
            'XS: 0-2',
            'MD: 2-4',
            'LG: 4-6',
            'XL: 6-9'
          ]}
        />
        <ProductLists 
          title="ABOUT RANOURA"
          descArray={[
            'I am not arrogant. I know my limitations, but I also believe in my abilities. When we are united and work sincerely, we can overcome difficulties. Cooperation and mutual understanding bring light to our path. Life is a continuous journey of learning and improvement. Together, we can achieve great things and leave a meaningful impact.'
          ]}
        />
        <ProductLists 
          title="DELIVERY"
          descArray={[
            'Get your favorite Ranura pieces delivered straight to your doorstep! Enjoy fast and reliable shipping with options for standard delivery (three to five business days) or express delivery (one to two business days) for those last-minute style needs. We carefully package every item to ensure it arrives in perfect condition, ready to shine in your wardrobe.'
          ]}
        />
        <ProductLists 
          title="RETURNS"
          descArray={[
            `At Ranura, your satisfaction is our priority. If something isn't quite right, you can easily return it within fourteen days of receiving your order. Items must be unworn, unwashed, and with original tags attached. Simply follow our hassle-free returns process, and we'll ensure you get a refund or exchange as quickly as possible.`
          ]}
        />
      </section>
    </div>
  )
}