"use client"

// HOOKS
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import Instructions from '@/app/[lang]/dashboard/edit-slide-show/instructions/index';
import NavTile from '@/app/[lang]/dashboard/edit-slide-show/NavTile';
import Table from '@/app/[lang]/dashboard/edit-slide-show/Table';

// STORES
import { useTabNameStore } from '@/stores/index';

// API
import getCategories from '@/lib/api/categories/get';
import getSubCategories from '@/lib/api/sub-categories/get';

// JSON
import slideData from '@/json/slideShow.json';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const [ scrollTable, setScrollTable ] = useState<string>("none")
  const handleScrollTableData = (data: string) => setScrollTable(data);

  const [ scrollTrigger, setScrollTrigger ] = useState<number>(Date.now())
  const handleScrollTableTrigger = (data: number) => setScrollTrigger(data);

  useEffect(() => {
    setTabName('edit-slid-show');
  }, []);

  return (
    <div>
      <Instructions />
      <NavTile 
        onScrollTableData={handleScrollTableData} 
        onScrollTableTrigger={handleScrollTableTrigger} 
      />
      <Table 
        scroll={scrollTable}
        scrollTrigger={scrollTrigger}
        album={slideData}
        isLoading={false}
        isError={false}
      />
    </div>
  )
}