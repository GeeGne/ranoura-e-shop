"use client"

// HOOKS
import { useEffect } from 'react';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('edit-categoires');
  }, []);

  return (
    <div>
      This is Categories Page.
    </div>
  )
}