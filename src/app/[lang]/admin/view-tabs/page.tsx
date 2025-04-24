"use client"

// HOOKS
import { useEffect } from 'react';

// STORES
import { useTabNameStore } from '@/stores/index';

// COMPONENTS
import Table from '@/app/[lang]/admin/view-tabs/Table';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('view-tabs');
  }, []);

  return (
    <div className="p-4">
      <Table />
    </div>
  )
}