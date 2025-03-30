"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import BreadCrumb from '@/components/BreadCrumb';
import Banner from '@/app/[lang]/welcome/[username]/Banner';
import UserPfp from '@/app/[lang]/welcome/[username]/UserPfp';
import Username from '@/app/[lang]/welcome/[username]/Username';
import NavTile from '@/app/[lang]/welcome/[username]/NavTile';
import SignOutBtn from '@/app/[lang]/welcome/[username]/SignOutBtn';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function layout ({ children }: Readonly<{children: React.ReactNode}>) {
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const tabName = useTabNameStore((state: any) => state.tabName);
  
  const slugNameAndLinkArray = [
    {
      name: "User",
      href: "/welcome/asd"
    } 
  ];

  return (
    <div
      className="flex flex-col gap-4 max-w-[1400px] mx-auto"
    >
      <BreadCrumb 
        className="px-4"
        slugNameAndLinkArray={slugNameAndLinkArray}     
      />
      <Banner />
      <UserPfp className="mt-[-60.5px]" />
      <Username />
      <NavTile 
        className="sticky top-[5.4rem] z-[5]" 
        tabName={tabName}
      />
      {children}
      <SignOutBtn 
        className="sticky bottom-4 flex items-center justify-center drop-shadow-md"
      />
    </div>
  )
}