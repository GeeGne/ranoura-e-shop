"use client"

// HOOKS
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

// COMPONENT
import ProductDisplay from '@/components/productPage/ProductDisplay';
import ProductSize from '@/components/productPage/ProductSize';
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
    <section
      className="flex flex-col gap-4 pt-[4rem] px-4"
    >
      <BreadCrumb
        slugNameAndLinkArray={slugNameAndLinkArray} 
      />
      <ProductDisplay />
      <section>
        <h2
          className="text-lg font-bold text-heading"
        >
          Long Jeans With a Skirt
        </h2>
        <PriceTag price={2000} discount={10}/>
      </section>
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
      <hr className="border-inbetween" />

    </section>
  )
}