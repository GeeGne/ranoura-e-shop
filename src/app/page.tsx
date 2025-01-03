import Image from "next/image";
import Hero from '@/components/home/Hero';
import ImageSlider from '@/components/home/ImageSlider';
import MainLayout from '@/components/home/MainLayout';

export default function Home() {
  return (
    <div
      className="flex flex-col"
    >
      <Hero /> 
      <ImageSlider /> 
      <MainLayout />
    </div>
  );
}
