"use client"

// HOOKS
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import Instructions from '@/app/[lang]/dashboard/edit-categories/Instructions';
import NavTile from '@/app/[lang]/dashboard/edit-categories/NavTile';
import Table from '@/app/[lang]/dashboard/edit-categories/Table';

// STORES
import { useTabNameStore } from '@/stores/index';

// API
import getCategories from '@/lib/api/categories/get';
import getSubCategories from '@/lib/api/sub-categories/get';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const [ scrollTable, setScrollTable ] = useState<string>("none")
  const handleScrollTableData = (data: string) => setScrollTable(data);

  const [ scrollTrigger, setScrollTrigger ] = useState<number>(Date.now())
  const handleScrollTableTrigger = (data: number) => setScrollTrigger(data);

  useEffect(() => {
    setTabName('edit-categories');
  }, []);

  const { 
    data: categoriesData, 
    isLoading: isCategoriesDataLoading, 
    isError: isCategoriesDataError 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })
  
  const { 
    data: subCategoriesData, 
    isLoading: isSubCategoriesDataLoading, 
    isError: isSubCategoriesDataError 
  } = useQuery({
    queryKey: ['sub-categories'],
    queryFn: getSubCategories
  })

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
        categories={categoriesData?.data}
        subCategories={subCategoriesData?.data}
        isCategoriesLoading={isCategoriesDataLoading}
        isSubCategoriesLoading={isSubCategoriesDataLoading}
        isCategoriesError={isCategoriesDataError}
        isSubCategoriesError={isSubCategoriesDataError}
      />
    </div>
  )
}