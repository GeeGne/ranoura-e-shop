"use client"

// HOOKS
import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

// COMPONENTS
import AdvertList from '@/components/categoryPage/AdvertList';
import CategoryTitle from '@/components/categoryPage/CategoryTitle';
import FilterTile from '@/components/categoryPage/FilterTile';
import BreadCrumb from '@/components/BreadCrumb';

// STORES
import { useTabNameStore } from '@/stores/index';

// JSON
import products from "@/json/products.json";

// UTILS
import strHyphenToSpace from '@/utils/strHyphenToSpace';

export default function page () {

  const { categoryName } = useParams();
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const slugNameAndLinkArray = [
    {
      name: "All Clothes",
      href: "/shop"
    },{
      name: strHyphenToSpace(categoryName).toUpperCase(),
      href: `/shop/collection/${categoryName}`
    } 
  ];

  useEffect(() => {
    setTabName('product');
  }, []);

  // DEBUG & UI
  console.log('categoryName: ', categoryName);

  return (
    <div
      className="
        flex flex-col gap-4 py-4
      "
    >
      <BreadCrumb
        className="px-4 w-full max-w-[1400px] mx-auto"
        slugNameAndLinkArray={slugNameAndLinkArray} 
      />
      <CategoryTitle 
        className="px-4 py-8 w-auto max-w-[auto] mx-auto"
        title={strHyphenToSpace(categoryName).toUpperCase()}
      />
      <FilterTile 
        className="px-4 w-auto max-w-[auto] mx-auto"
      />
      <AdvertList />
    </div>
  )
}