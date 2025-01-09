"use client"

// HOOKS
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function ProductPage () {
  const slugArray = useParams().productNameAndId || [];
  const productName = slugArray[0];
  const productId = slugArray[1];

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  useEffect(() => {
    setTabName('product');
  }, [])

  // DEBUG
  console.log('slug:', slugArray);
  console.log('productName:', productName);
  console.log('productId:', productId);

  return (
    <div>
      hi
    </div>
  )
}