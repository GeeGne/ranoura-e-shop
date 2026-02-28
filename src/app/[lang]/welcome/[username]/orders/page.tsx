"use client"

// HOOKS
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import OrdersLi from '@/app/[lang]/welcome/[username]/orders/orderLi/index';
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// JSON
import orders from '@/json/orders.json';

// API
import getUserData from '@/lib/api/auth/me/get';

export default function page () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  // const categoryArray = [ ...new Set(user.map(itm => itm.category))];
  
  useEffect(() => {
    setTabName('userOrders');
  }, []);

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
  });
  const user = userData?.data;
  const orders = user?.userOrders;

  // DEBUG & UI
  // console.log(user.filter((itm, i, self) => self.indexOf(itm) === i))
  // console.log(user.filter((itm, i, self) => self.indexOf(itm.category) === i))
  // console.log(user.map(itm => itm.category).filter((itm, i, self) => self.indexOf(itm) === i));
  // console.log([ ...new Set(user.map(itm => itm.category)) ])
  // console.log(categoryArray);
  console.log('orders: ', orders);
  return (
    <OrdersLi 
      lang={lang}
      isEn={isEn}
      isLoading={isLoading}
      orders={orders}
    />
  )
}