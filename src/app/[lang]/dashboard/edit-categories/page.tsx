"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/edit-categories/Table';
import Instructions from '@/app/[lang]/dashboard/edit-categories/Instructions';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('edit-categories');
  }, []);

  return (
    <div>
      <Instructions />
      <Table />
    </div>
  )
}