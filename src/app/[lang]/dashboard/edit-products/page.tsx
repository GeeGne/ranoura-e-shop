"use client"

// HOOKS
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/edit-products/Table';
import NavTile from '@/app/[lang]/dashboard/edit-products/NavTile';
import ErrorLayout from '@/components/ErrorLayout';

// API
import getAllProducts from '@/lib/api/products/get';

export default function page () {  
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const [ scrollTable, setScrollTable ] = useState<string>("none")
  const handleScrollTableData = (data: string) => setScrollTable(data);

  const [ scrollTrigger, setScrollTrigger ] = useState<number>(Date.now())
  const handleScrollTableTrigger = (data: number) => setScrollTrigger(data);

  useEffect(() => {
    setTabName('edit-products');
  }, []);


  const { data: products, isLoading, isError } = useQuery({
    queryFn: getAllProducts,
    queryKey: ['products'],
  })

  // DEBUG & UI
  // console.log("onLayoutScroll: ", onLayoutScroll.target.scrollTop);
  // console.log("isLayoutScrolled: ", isLayoutScrolled);

  if (isError) return (
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  )

  return (
    <div className="relative flex flex-col p-4">
      <NavTile 
        onScrollTableData={handleScrollTableData} 
        onScrollTableTrigger={handleScrollTableTrigger} 
      />
      <Table
        scroll={scrollTable}
        scrollTrigger={scrollTrigger}
        products={products?.data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  )
}