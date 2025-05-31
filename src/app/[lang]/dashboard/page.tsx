"use client"

// HOOKS
import { useEffect } from 'react';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('userOrders');
  }, []);

  return (
    <div>Hi!, This is an Admin page.</div>
  )
}