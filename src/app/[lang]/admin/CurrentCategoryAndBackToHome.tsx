"use client"

// HOOKS
import { useState, useEffect } from 'react';
import Link from 'next/link';

// COMPONENTS
import IconoirHomeAltSlim from '@/components/svgs/IconoirHomeAltSlim';
import EpUser from "@/components/svgs/EpUser";
import BtnB from "@/components/BtnB";

// STORES
import { useTabNameStore } from '@/stores/index';

// JSON
import adminTabs from '@/json/adminTabs.json';

export default function CurrentCategoryAndBackToHome () {

  const tabName = useTabNameStore((state: any) => state.tabName);
  const [ title, setTitle ] = useState<any>('default');
  const isSlugForAdmin = () =>  adminTabs?.some(tab => tab.slug === tabName);
  const getTab = () => adminTabs?.find(tab => tab.slug === tabName);

  useEffect(() => {
    if (isSlugForAdmin()) setTitle(getTab()?.name);
  }, [tabName]);

  return (
    <div
      className="flex items-center justify-between"
    >
      <h2
        className="text-2xl font-bold text-heading"
      >
        {title}
      </h2>
      <div 
        className="flex gap-4"
      >
        <BtnB
          className="
            group bg-transparent hover:bg-heading
            transition-all duration-300 ease-in-out
          "
        >
          <IconoirHomeAltSlim 
            className="
              rotate-[-45deg] text-heading group-hover:text-heading-invert
              transition-all duration-300 ease-in-out
            "
          />
        </BtnB>
        <BtnB
          className="
            group bg-transparent hover:bg-heading
            transition-all duration-300 ease-in-out
          "
        >
          <EpUser 
            className="
              rotate-[-45deg] w-6 h-6 text-heading group-hover:text-heading-invert
              transition-all duration-300 ease-in-out
            "
          />
        </BtnB>
      </div>
    </div>
  )
}