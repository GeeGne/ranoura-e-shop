"use client"

// HOOKS
import { useEffect } from 'react';

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
import { useTabNameStore } from '@/stores/index';

export default function Home() {

  const setTabName = useTabNameStore((state: any) => state.setTabName);
  
  useEffect(() => {
    setTabName('home');
  }, []);

  return (
    <div
      className="flex flex-col"
    >
      <Hero /> 
      <MainSlider /> 
      <ImageSlider />
      <AdvertTile 
        title="HOT DEALS" 
        category="hot-deals"
        type="sale"
        slug="hot-deals"
      />
      <CategoryPickerV2 />
      <MainLayout />
      <AdvertTile 
        title="WHAT'S NEW?" 
        category="what's-new"
        type="new"
        slug="what's-new"
      />
      <AdvertTile 
        title="LATEST ARRIVALS" 
        category="latest-arriavls"
        type="sale"
        slug="latest-arrivals"
      />
    </div>
  );
}

