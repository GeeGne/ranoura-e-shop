"use client"

// HOOKS
import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import ErrorLayout from '@/components/ErrorLayout';
import NotFound from '@/components/NotFound';
import AdvertList from '@/components/categoryPage/advertList/AdvertList';
import CategoryTitle from '@/components/categoryPage/CategoryTitle';
import FilterTile from '@/components/categoryPage/FilterTile';
import BreadCrumb from '@/components/BreadCrumb';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// JSON
import categories from "@/json/categories.json";
import subCategories from "@/json/subCategories.json";
// import products from "@/json/products.json";

// API
import getAllProducts from '@/lib/api/products/get';

export default function page () {

  const { categoryAndSubSlug } = useParams();
  const isCategory = categoryAndSubSlug?.length === 1;
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const { data: productsData, isLoading: tss, isError } = useQuery({
    queryKey: [ 'products' ],
    queryFn: getAllProducts
  });
  const products = productsData?.data;
  const isLoading = true;

  const mainSlug = () => {
    if (isCategory) return categoryAndSubSlug[0];
    if (categoryAndSubSlug?.length === 2) return categoryAndSubSlug[1];
    return '';
  };

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const getName = (array: any[], slug?: string) => array?.find((itm: any) => itm.slug === slug)?.name[lang];

  const slugNameAndLinkArray = () => {
    
    if (isCategory) return [
      {
        name: isEn ? "All Clothes" : "كل الملابس",
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
    products?.filter((product: Record<string, any>) => 
      product.categories.some((prodCat: string) => prodCat.includes(mainSlug()))
    )
  ;

  const isProductsExist = () => 
    products?.filter((product: Record<string, any>) => 
      product.categories.some((prodCat: string) => prodCat.includes(mainSlug()))
    ).length !== 0
  ;

  useEffect(() => {
    setTabName('product');
  }, []);


  // DEBUG & UI
  console.log('Category Products: ', filterProductsBasedOnSlug());
  // console.log('params: ', categoryAndSubSlug)
  // console.log('isCategory: ', isCategory)


  if (isError) return (
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  )

  if (isLoading) return (
    <div
      className="
        flex flex-col gap-4 py-4 px-4
      "
    >
      <BreadCrumb
        className={`w-fit ${isEn ? 'mr-auto' : 'ml-auto'}`}
        isLoading={true}
      />
      <CategoryTitle 
        className="px-4 py-8 w-auto max-w-[auto] mx-auto"
        isLoading={true}
      />
      <FilterTile 
        className="px-4 w-auto max-w-[auto] mx-auto"
        isLoading={true}
      />
      <AdvertList 
        isLoading={true}
      />
    </div>
  )

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