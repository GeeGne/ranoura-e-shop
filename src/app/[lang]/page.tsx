"use client"

// HOOKS
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import Image from "next/image";
import Hero from '@/components/home/Hero';
import ImageSlider from '@/components/home/ImageSlider';
import MainSlider from '@/components/home/MainSlider';
import CategoryPicker from '@/components/home/CategoryPicker';
import CategoryPickerV2 from '@/components/home/CategoryPickerV2';
import MainLayout from '@/components/home/MainLayout';
import AdvertTile from '@/components/home/advertTile/index';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// API
import getAllProducts from '@/lib/api/products/get';

export default function Home() {

  const { lang } = useParams();
  const isEn = lang === 'en';
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const setLang = useLanguageStore((state: any) => state.setLang);
  const setDefaultLanguage = () => {
    setLang(lang);
    document.cookie = `preferredLang=${lang}; path=/; max-age=31536000`
  }

  useEffect(() => {
    setTabName('home');
  }, []);

  useEffect(() => {
    setDefaultLanguage();
  }, [ lang ]);

  const { 
    data: productsData, 
    isLoading: 
    areProductsLoadings, 
    isError: isProductsDataError,
  } = useQuery({
    queryKey: [ 'products' ],
    queryFn: getAllProducts
  });
  let areProductsLoading = true;
  return (
    <div
      className="flex flex-col"
    >
      <Hero /> 
      <MainSlider /> 
      <ImageSlider />
      <AdvertTile 
        title={isEn ? "HOT DEALS" : "عروض الحارقه"}
        category="hot-deals"
        type="sale"
        slug="hot-deals"
        products={productsData?.data}
        isLoading={areProductsLoading}
        isError={isProductsDataError}
      />
      <CategoryPickerV2 />
      <MainLayout />
      <AdvertTile 
        title={isEn ? "HOT DEALS" : "عروض الحارقه"}
        category="hot-deals"
        type="sale"
        slug="hot-deals"
        products={productsData?.data}
        isLoading={areProductsLoading}
        isError={isProductsDataError}
      />
      <AdvertTile 
        title={isEn ? "HOT DEALS" : "عروض الحارقه"}
        category="hot-deals"
        type="sale"
        slug="hot-deals"
        products={productsData?.data}
        isLoading={areProductsLoading}
        isError={isProductsDataError}
      />
    </div>
  );
}

