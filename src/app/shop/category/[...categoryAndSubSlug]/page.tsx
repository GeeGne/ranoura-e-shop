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
import categories from "@/json/categories.json";
import subCategories from "@/json/subCategories.json";
import products from "@/json/products.json";

export default function page () {

  const { categoryAndSubSlug } = useParams();
  const isCategory = categoryAndSubSlug?.length === 1;

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const getName = (array: any[], slug?: string) => array?.find((itm: any) => itm.slug === slug)?.name;

  const slugNameAndLinkArray = () => {
    
    if (isCategory) return [
      {
        name: "All Clothes",
        href: "/shop"
      },{
        name: `${getName(categories, categoryAndSubSlug[0])}`,
        href: `/shop/category/${categoryAndSubSlug[0]}`
      } 
    ]

    if (categoryAndSubSlug?.length === 2) return [
      {
        name: "All Clothes",
        href: "/shop"
      },{
        name: `${getName(categories, categoryAndSubSlug[0])}`,
        href: `/shop/category/${categoryAndSubSlug[0]}`
      },{
        name: `${getName(subCategories, categoryAndSubSlug[1])}`,
        href: `/shop/category/${categoryAndSubSlug[0]}/${categoryAndSubSlug[1]}`
      } 
    ]
  };

  const getTitle = () =>{ 
    if (isCategory) return getName(categories, categoryAndSubSlug[0]);
    if (categoryAndSubSlug?.length === 2) return getName(subCategories, categoryAndSubSlug[1])
  }
  useEffect(() => {
    setTabName('product');
  }, []);

  // console.log('params: ', categoryAndSubSlug)
  // console.log('isCategory: ', isCategory)

  return (
    <div
      className="
        flex flex-col gap-4 py-4
      "
    >
      <BreadCrumb
        className="px-4 w-full max-w-[1400px] mx-auto"
        slugNameAndLinkArray={slugNameAndLinkArray()} 
      />
      <CategoryTitle 
        className="px-4 py-8 w-auto max-w-[auto] mx-auto"
        title={getTitle()}
      />
      <FilterTile 
        className="px-4 w-auto max-w-[auto] mx-auto"
      />
      <AdvertList />
    </div>
  )
}