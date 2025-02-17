"use client"

// HOOKS
import { useEffect }from 'react';

// COMPONENTS
import ShowOrderSummary from '@/app/checkout/ShowOrderSummary';
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
        flex flex-col gap-8 md:gap-8 p-4 
        md:max-w-[1400px] md:mx-auto
      "
    >
      <BreadCrumb 
        className=""
        slugNameAndLinkArray={slugNameAndLinkArray}     
      />
      <ShowOrderSummary />      
    </div>
  )
}