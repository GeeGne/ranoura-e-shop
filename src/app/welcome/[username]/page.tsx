"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import Banner from '@/app/welcome/[username]/Banner';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  
  useEffect(() => {
    setTabName('user');
  }, []);

  return (
    <div
      className="flex flex-col"
    >
      <Banner />
    </div>
  )
}