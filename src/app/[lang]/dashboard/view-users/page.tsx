"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/view-users/Table';

// STORES
import { useLanguageStore, useTabNameStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const lang = useLanguageStore((state) => state.lang);
  const isEn = lang === "en";

  useEffect(() => {
    setTabName('view-users');
  }, []);

  return (
    <div>
      <Table 
        isEn={isEn}
      />
    </div>
  )
}