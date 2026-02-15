"use client"

// HOOKS
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import NavTile from '@/app/[lang]/dashboard/view-orders/NavTile';
import Orders from '@/components/Orders';

// STORES
import { useLanguageStore, useTabNameStore } from '@/stores/index';

// API
import getAllOrders from '@/lib/api/orders/get';

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

  const { data: ordersData, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders
  })

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
        data={ordersData?.data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  )
}