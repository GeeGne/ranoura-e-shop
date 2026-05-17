"use client"

// HOOKS
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import Instructions from '@/app/[lang]/dashboard/edit-slide-show/instructions/index';
import AboutAlt from '@/app/[lang]/dashboard/edit-slide-show/AboutAlt';
import ImageSliderPreview from '@/app/[lang]/dashboard/edit-slide-show/ImageSliderPreview';
import NavTile from '@/app/[lang]/dashboard/edit-slide-show/NavTile';
import Table from '@/app/[lang]/dashboard/edit-slide-show/Table';

// STORES
import { useLanguageStore, useTabNameStore } from '@/stores/index';

// API
import getSlideShows from "@/lib/api/slide-show/get";
import getCategories from '@/lib/api/categories/get';
import getSubCategories from '@/lib/api/sub-categories/get';

// JSON
import slideData from '@/json/slideShow.json';

export default function page () {  
  
  const lang = useLanguageStore((state: any) => state.lang);
  const isEn = lang === 'en';
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const { data: slideShowData, isLoading, isError} = useQuery({
    queryKey: ['slide-show'],
    queryFn: getSlideShows
  })
  const data = slideShowData?.data;

  const [ scrollTable, setScrollTable ] = useState<string>("none")
  const handleScrollTableData = (data: string) => setScrollTable(data);

  const [ scrollTrigger, setScrollTrigger ] = useState<number>(Date.now())
  const handleScrollTableTrigger = (data: number) => setScrollTrigger(data);

  useEffect(() => {
    setTabName('edit-slide-show');
  }, []);

  return (
    <div className="flex flex-col gap-8 p-4">
      <Instructions />
      <AboutAlt lang={lang} isEn={isEn} />
      <ImageSliderPreview lang={lang} isEn={isEn} />
      <NavTile 
        onScrollTableData={handleScrollTableData} 
        onScrollTableTrigger={handleScrollTableTrigger} 
      />
      <Table
        scroll={scrollTable}
        scrollTrigger={scrollTrigger}
        album={data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  )
}