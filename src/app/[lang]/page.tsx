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
import AdvertTile from '@/components/home/AdvertTile';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// API
import getThemeVars from '@/lib/api/themes/get';

export default function Home() {

  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const setLang = useLanguageStore((state: any) => state.setLang);
  const { lang } = useParams();
  const isEn = lang === 'en';
  const setDefaultLanguage = () => {
    setLang(lang);
    document.cookie = `preferredLang=${lang}; path=/; max-age=31536000`
  }
  
  const { data: themesData, error, isLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: getThemeVars,
  })

  useEffect(() => {
    setTabName('home');
  }, []);

  useEffect(() => {
    setDefaultLanguage();
  }, [ lang ]);

  useEffect(() => {
    if (error || isLoading) return;
    function updateThemeVariables () {
      document.documentElement.style.setProperty('--primary-color', themesData.primary_color);
      document.documentElement.style.setProperty('--primary-invert-color', themesData.primary_invert_color);
      document.documentElement.style.setProperty('--secondary-color', themesData.secondary_color);
      document.documentElement.style.setProperty('--secondary-invert-color', themesData.secondary_invert_color);
      document.documentElement.style.setProperty('--inbetween-color', themesData.inbetween_color);
      document.documentElement.style.setProperty('--content-color', themesData.content_color);
      document.documentElement.style.setProperty('--content-inbetween-color', themesData.content_inbetween_color);
      document.documentElement.style.setProperty('--content-invert-color', themesData.content_invert_color);
      window.location.reload();
    }
    updateThemeVariables();
  }, [themesData, error, isLoading]);

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

