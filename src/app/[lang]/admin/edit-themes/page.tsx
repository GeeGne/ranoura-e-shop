"use client"

// HOOKS
import { useEffect } from 'react';

// STORES
import { useTabNameStore } from '@/stores/index';

// COMPONENTS
import Table from '@/app/[lang]/admin/edit-themes/Table';
import PickTheme from '@/components/svgs/PickTheme';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('edit-themes');
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <PickTheme className="mx-auto w-full h-auto md:w-[250px] md:h-[250px]" />
      <Table />
    </div>
  )
}