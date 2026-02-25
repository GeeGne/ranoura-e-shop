"use client"

// HOOKS
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import OrdersLi from '@/app/[lang]/welcome/[username]/orders/OrdersLi';
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
    <ul
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
    > 
      {orders?.map((order: Record<string, any>, i: number) => 
        <OrdersLi 
          key={i}
          lang={lang}
          isEn={isEn}
          order={order}
        />
      )}
    </ul>
  )
}