"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import OrdersLi from '@/app/welcome/[username]/orders/OrdersLi';
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';

// STORES
import { useTabNameStore } from '@/stores/index';

// JSON
import orders from '@/json/orders.json';

export default function page () {
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  // const categoryArray = [ ...new Set(user.map(itm => itm.category))];
  
  useEffect(() => {
    setTabName('userOrders');
  }, []);

  // DEBUG & UI
  // console.log(user.filter((itm, i, self) => self.indexOf(itm) === i))
  // console.log(user.filter((itm, i, self) => self.indexOf(itm.category) === i))
  // console.log(user.map(itm => itm.category).filter((itm, i, self) => self.indexOf(itm) === i));
  // console.log([ ...new Set(user.map(itm => itm.category)) ])
  // console.log(categoryArray);
  
  return (
    <ul
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
    > 
      {orders.map((order, i) => 
        <OrdersLi 
          key={i}
          order={order}
        />
      )}
    </ul>
  )
}