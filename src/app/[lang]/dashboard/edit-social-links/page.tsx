"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import Instructions from '@/app/[lang]/dashboard/edit-social-links/Instructions';
import Add from '@/app/[lang]/dashboard/edit-social-links/Add';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  useEffect(() => {
    setTabName('edit-social-links');
  }, []);

  return (
    <div
      className="flex flex-col gap-4"
    >
      <Instructions />
      <Add />
    </div>
  )
}