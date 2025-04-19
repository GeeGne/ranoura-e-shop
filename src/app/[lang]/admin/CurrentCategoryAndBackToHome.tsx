"use client"

// HOOKS
import { useState, useEffect } from 'react';

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
      className=""
    >
      <h2
        className="text-2xl font-bold text-heading"
      >
        {title}
      </h2>
    </div>
  )
}