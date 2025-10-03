"use client"

// HOOKS
import { useState, useEffect } from 'react';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/view-users/Table';
import NavTile from '@/app/[lang]/dashboard/edit-products/NavTile';

// STORES
import { useLanguageStore, useTabNameStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const lang = useLanguageStore((state) => state.lang);
  const isEn = lang === "en";

  const [ scrollTable, setScrollTable ] = useState<string>("none")
  const handleScrollTableData = (data: string) => setScrollTable(data);

  const [ scrollTrigger, setScrollTrigger ] = useState<number>(Date.now())
  const handleScrollTableTrigger = (data: number) => setScrollTrigger(data);

  useEffect(() => {
    setTabName('view-users');
  }, []);

  return (
    <div>
      <NavTile 
        onScrollTableData={handleScrollTableData} 
        onScrollTableTrigger={handleScrollTableTrigger} 
      />
     <Table 
        lang={lang}
        isEn={isEn}
        scroll={scrollTable}
        scrollTrigger={scrollTrigger}
      />
    </div>
  )
}