"use client"

// HOOKS
import { useState, useEffect } from 'react';

// COMPONENTS
import IconoirHomeAltSlim from '@/components/svgs/IconoirHomeAltSlim';
import EpUser from "@/components/svgs/EpUser";

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
        <button
          className="border-solid border-heading border-[1px] p-1 rotate-45 rounded-md"
        >
          <IconoirHomeAltSlim 
            className="rotate-[-45deg]"
          />
        </button>
        <button
          className="border-solid border-heading border-[1px] p-1 rotate-45 rounded-md"
        >
          <EpUser 
            className="rotate-[-45deg] w-6 h-6"
          />
        </button>
      </div>
    </div>
  )
}