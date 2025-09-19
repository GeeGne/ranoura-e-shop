"use client";

// HOOKS
import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// STORES
import { useTabNameStore, useLanguageStore } from "@/stores/index";

// COMPONENTS
import VideoDisplay from "@/app/[lang]/dashboard/edit-video/VideoDisplay";
import Preview from "@/app/[lang]/dashboard/edit-video/Preview";
import ErrorLayout from '@/components/ErrorLayout';
import Options from "@/app/[lang]/dashboard/edit-video/Options";
import Guidelines from "@/app/[lang]/dashboard/edit-video/Guidelines";
import IonDesktopOutline from "@/components/svgs/IonDesktopOutline";
import FamiconsTabletPortraitSharp from "@/components/svgs/FamiconsTabletPortraitSharp";
import FamiconsPhonePortraitOutline from "@/components/svgs/FamiconsPhonePortraitOutline";
import UilExpandAlt from "@/components/svgs/UilExpandAlt";
import HugeiconsArrowExpand01 from "@/components/svgs/HugeiconsArrowExpand01";

// API
import getHeroVideoData from '@/lib/api/hero-video/get';

export default function page() {
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const lang = useLanguageStore((state) => state.lang);
  const isEn = lang === "en";

  useEffect(() => {
    setTabName("edit-video");
  }, []);

  const { data: heroVideo, isLoading, isError } = useQuery({
    queryKey: ['hero-video'],
    queryFn: getHeroVideoData,
  });


  // DEBUG
  console.log('heroVideoDetails Data: ', heroVideo);

  if (isError) return ( 
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  );

  return (
    <div
      className="flex flex-col gap-4"
    >
      <Guidelines isEn={isEn} />
      <Preview 
        isEn={isEn} 
        isLoading={isLoading}
        data={heroVideo?.data} 
      />
      <Options 
        isEn={isEn} 
        isLoading={isLoading}
        data={heroVideo?.data} 
      />
    </div>
  );
}
