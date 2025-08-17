"use client"

// HOOKS
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// STORES
import { useTabNameStore } from '@/stores/index';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/edit-products/Table';
import NavTile from '@/app/[lang]/dashboard/edit-products/NavTile';

// API
import getAllProducts from '@/lib/api/products/get';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const isEn = true;


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