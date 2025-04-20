"use client"

// HOOKS
import { useEffect } from 'react';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('edit-general-settings');
  }, []);

  return (
    <div>
      This is General Settings Page.
    </div>
  )
}