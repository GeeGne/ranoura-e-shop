"use client"

// HOOKS
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

// COMPONENT
import ProductDisplay from '@/components/productPage/ProductDisplay';
import ProductSize from '@/components/productPage/ProductSize';
import BreadCrumb from '@/components/BreadCrumb';
import PriceTag from '@/components/PriceTag';
import BtnA from '@/components/BtnA';
import EpArrowLeft from '@/components/svgs/EpArrowLeft';

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
      <hr className="border-inbetween" />
      <BtnA
        className="
          font-bold text-md text-heading-invert 
          bg-gradient-to-r from-primary to-inbetween py-2 rounded-lg
        "
      >
        ADD TO BAG
      </BtnA>
    </section>
  )
}