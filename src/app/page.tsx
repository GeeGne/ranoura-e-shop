"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import Image from "next/image";
import Hero from '@/components/home/Hero';
import ImageSlider from '@/components/home/ImageSlider';
import MainSlider from '@/components/home/MainSlider';
import CategoryPicker from '@/components/home/CategoryPicker';
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
      <CategoryPicker />
      <MainLayout />
      <AdvertTile title="WHATS NEW?" />
      <AdvertTile title="HOT DEALS" />
      <AdvertTile title="COLLECTION" />
    </div>
  );
}
