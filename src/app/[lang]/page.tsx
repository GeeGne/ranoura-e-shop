"use client"

// HOOKS
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

// COMPONENTS
import Image from "next/image";
import Hero from '@/components/home/Hero';
import ImageSlider from '@/components/home/ImageSlider';
import MainSlider from '@/components/home/MainSlider';
import CategoryPicker from '@/components/home/CategoryPicker';
import CategoryPickerV2 from '@/components/home/CategoryPickerV2';
import MainLayout from '@/components/home/MainLayout';
import AdvertTile from '@/components/home/AdvertTile';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

export default function Home() {

  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const setLang = useLanguageStore((state: any) => state.setLang);
  const { lang } = useParams();
  const isEn = lang === 'en';
  
  useEffect(() => {
    setTabName('home');
  }, []);

  useEffect(() => {
    setLang(lang);
  }, [ lang ]);

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
      />
      <CategoryPickerV2 />
      <MainLayout />
      <AdvertTile 
        title={isEn ? "WHAT'S NEW?" : "احدث الكوليكشات"}
        category="what's-new"
        type="new"
        slug="what's-new"
      />
      <AdvertTile 
        title={isEn ? "LATEST ARRIVALS" : "اخر الدروب"}
        category="latest-arriavls"
        type="sale"
        slug="latest-arrivals"
      />
    </div>
  );
}

