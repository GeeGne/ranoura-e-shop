"use client"

// HOOKS
import { useEffect, useRef } from 'react';

// COMPONENTS
import BreadCrumb from '@/components/BreadCrumb';
import SigninForm from '@/app/user/signin/SigninForm';

// STORES
import { useTabNameStore } from '@/stores/index';

// JSON
import products from "@/json/products.json";

export default function Page () {

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const slugNameAndLinkArray = [
    {
      name: "Signin",
      href: "/user/signin"
    } 
  ];

  useEffect(() => {
    setTabName('signin');
  }, []);

  return (
    <div
      className="flex flex-col gap-4"
    >
      <BreadCrumb 
        className="px-4"
        slugNameAndLinkArray={slugNameAndLinkArray}     
      />
      <SigninForm 
        className="px-4"
      />
    </div>
  )
}