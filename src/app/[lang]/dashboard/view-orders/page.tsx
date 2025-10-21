"use client"

// HOOKS
import { useState, useEffect } from 'react';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/view-orders/Table';
import NavTile from '@/app/[lang]/dashboard/view-orders/NavTile';
import Orders from '@/components/Orders';

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
    setTabName('view-orders');
  }, []);

  return (
    <div>
      <NavTile 
        onScrollTableData={handleScrollTableData} 
        onScrollTableTrigger={handleScrollTableTrigger} 
      />
      <Orders 
        lang={lang}
        isEn={isEn}
        scroll={scrollTable}
        scrollTrigger={scrollTrigger}
        type="orders_table"
      />
    </div>
  )
}