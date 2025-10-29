"use client"

// HOOKS
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/view-users/Table';
import NavTile from '@/app/[lang]/dashboard/view-users/NavTile';

// STORES
import { useLanguageStore, useTabNameStore } from '@/stores/index';

// API
import getUsersData from '@/lib/api/users/get';

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

  const { data: usersData, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsersData,
  });

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
        data={usersData}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  )
}