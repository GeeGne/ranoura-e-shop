"use client"

// HOOKS
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// STORES
import { useTabNameStore } from '@/stores/index';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/edit-themes/Table';

// API
import getAllProducts from '@/lib/api/products/get';

export default function page () {  
  
  const queryClient = useQueryClient();
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('edit-products');
  }, []);

  const { data } = useQuery({
    queryFn: getAllProducts,
    queryKey: ['products'],
  })

  // UI & DEBUG
  console.log('product data: ', data);
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <Table />
    </div>
  )
}