"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import Table from '@/app/[lang]/dashboard/view-users/Table';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('view-users');
  }, []);

  return (
    <div>
      <Table />
    </div>
  )
}