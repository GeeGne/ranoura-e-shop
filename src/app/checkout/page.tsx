"use client"

// HOOKS
import { useEffect }from 'react';

// COMPONENTS
import ShowOrderSummary from '@/app/checkout/ShowOrderSummary';
import OrderSummary from '@/components/OrderSummary';
import CheckoutForm from '@/app/checkout/checkoutform/index';
import AccountBenefitsSection from '@/components/AccountBenefitsSection/index';
import BreadCrumb from '@/components/BreadCrumb';
import SignupForm from '@/app/signup/SignupForm';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const slugNameAndLinkArray = [
    {
      name: "Checkout",
      href: "/checkout"
    } 
  ];

  useEffect(() => {
    setTabName('checkout');
  }, []);

  return (
    <div
      className="
        flex flex-col gap-0 md:gap-0 p-4 
        lg:grid grid-cols-2 lg:gap-8 
        md:max-w-[1400px] md:mx-auto
      "
    >
      <BreadCrumb 
        className="py-4 lg:py-0 lg:col-span-2"
        slugNameAndLinkArray={slugNameAndLinkArray}     
      />
      <ShowOrderSummary 
        className="
          lg:relative lg:order-3 lg:border-none
          lg:before:content-[''] lg:before:absolute 
          lg:before:right-[calc(100%+1rem)] lg:before:top-0 
          lg:before:translate-x-[-50%] lg:before:w-[1px] lg:before:h-full
          lg:before:bg-inbetween lg:before:z-[5]
        "
      />
      <CheckoutForm 
        className="
          lg:order-2 lg:col-span-1
        "
      />
    </div>
  )
}