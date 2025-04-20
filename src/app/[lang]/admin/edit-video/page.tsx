"use client"

// HOOKS
import { useEffect } from 'react';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('edit-video');
  }, []);

  return (
    <div>
      This is Video Page.
    </div>
  )
}