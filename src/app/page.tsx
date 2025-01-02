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
      <div
        className="bg-background"
      >
        <div
          className="text-2xl"
        >
          text 2xl
        </div>
        <div
          className="text-xl"
        >
          text xl
        </div>
        <div
          className="text-lg"
        >
          text lg
        </div>
        <div
          className="text-md"
        >
          text md
        </div>
        <div
          className="text-sm"
        >
          text sm
        </div>
        <div
          className="text-xs"
        >
          text xs
        </div>
      </div>
    </div>
  );
}
