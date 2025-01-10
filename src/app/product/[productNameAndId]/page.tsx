"use client"

// HOOKS
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

// COMPONENT
import BreadCrumb from '@/components/BreadCrumb';

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
  }, [])

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
      <div
        className="flex flex-col gap-4"
      >
        <img 
          className="w-full ratio[2/3] rounded-lg"
          src={outfit1}
          alt="Image"
        />
        <ul
          className="flex flex-row w-full items-center justify-center gap-2"
        >
          <li className="w-4 h-4 bg-inbetween rounded-full cursor-pointer" />
          <li className="w-4 h-4 bg-primary rounded-full cursor-pointer" />
          <li className="w-4 h-4 bg-inbetween rounded-full cursor-pointer" />
        </ul>
      </div>

    </section>
  )
}