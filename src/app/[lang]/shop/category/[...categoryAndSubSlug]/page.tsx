"use client"

// HOOKS
import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

// COMPONENTS
import NotFound from '@/components/NotFound';
import AdvertList from '@/components/categoryPage/AdvertList';
import CategoryTitle from '@/components/categoryPage/CategoryTitle';
import FilterTile from '@/components/categoryPage/FilterTile';
import BreadCrumb from '@/components/BreadCrumb';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// JSON
import categories from "@/json/categories.json";
import subCategories from "@/json/subCategories.json";
import products from "@/json/products.json";

export default function page () {

  const { categoryAndSubSlug } = useParams();
  const isCategory = categoryAndSubSlug?.length === 1;
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const mainSlug = () => {
    if (isCategory) return categoryAndSubSlug[0];
    if (categoryAndSubSlug?.length === 2) return categoryAndSubSlug[1];
  };

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const getName = (array: any[], slug?: string) => array?.find((itm: any) => itm.slug === slug)?.name.en;

  const slugNameAndLinkArray = () => {
    
    if (isCategory) return [
      {
        name: isEn ? "All Clothes" : "جميع الملابس",
        href: "/shop"
      },{
        name: `${getName(categories, categoryAndSubSlug[0])}`,
        href: `/shop/category/${categoryAndSubSlug[0]}`
      } 
    ]

    if (categoryAndSubSlug?.length === 2) return [
      {
        name: isEn ? "All Clothes" : "جميع الملابس",
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

  const filterProductsBasedOnSlug = () => 
    products.filter(product => 
      product.categories.some(prodCat => prodCat === mainSlug())
    )
  ;

  const isProductsExist = () => 
    products.filter(product => 
      product.categories.some(prodCat => prodCat === mainSlug())
    ).length !== 0
  ;

  useEffect(() => {
    setTabName('product');
  }, []);

  // console.log('params: ', categoryAndSubSlug)
  // console.log('isCategory: ', isCategory)

  if (!isProductsExist()) return (
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
        name={isCategory 
          ? getName(categories, mainSlug()) 
          : getName(subCategories, mainSlug())
        }
      />
      <NotFound type='category' />
    </div>
  )

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
        name={isCategory 
          ? getName(categories, mainSlug()) 
          : getName(subCategories, mainSlug())
        }
      />
      <FilterTile 
        className="px-4 w-auto max-w-[auto] mx-auto"
      />
      <AdvertList 
        products={filterProductsBasedOnSlug()}
      />
    </div>
  )
}