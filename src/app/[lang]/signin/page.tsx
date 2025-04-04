"use client"

// HOOKS
import { useEffect, useRef } from 'react';

// COMPONENTS
import AccountBenefitsSection from '@/components/AccountBenefitsSection/index';
import BreadCrumb from '@/components/BreadCrumb';
import SigninForm from '@/app/[lang]/signin/SigninForm';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// JSON
import products from "@/json/products.json";

export default function page () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const slugNameAndLinkArray = [
    {
      name: isEn ? "Signin" : "تسجيل الدخول",
      href: "/signin"
    } 
  ];

  useEffect(() => {
    setTabName('signin');
  }, []);

  return (
    <div
      className="
        flex flex-col gap-8 md:gap-8 p-4 
        md:max-w-[1400px] md:mx-auto
      "
    >
      <BreadCrumb 
        className="px-4"
        slugNameAndLinkArray={slugNameAndLinkArray}     
      />
      <SigninForm 
        className="px-4"
      />
      <AccountBenefitsSection
        className="px-4 pb-4"
      />
    </div>
  )
}