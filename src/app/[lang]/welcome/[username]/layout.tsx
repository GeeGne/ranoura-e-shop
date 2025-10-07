"use client"

// HOOKS
import { useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import BreadCrumb from '@/components/BreadCrumb';
import Banner from '@/app/[lang]/welcome/[username]/Banner';
import UserPfp from '@/app/[lang]/welcome/[username]/UserPfp';
import Username from '@/app/[lang]/welcome/[username]/Username';
import NavTile from '@/app/[lang]/welcome/[username]/NavTile';
import SignOutBtn from '@/app/[lang]/welcome/[username]/SignOutBtn';
import EosIconsAdminOutlined from '@/components/svgs/EosIconsAdminOutlined';
import MaterialSymbolsDashboardRounded from '@/components/svgs/MaterialSymbolsDashboardRounded';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// API
import getUserData from '@/lib/api/auth/me/get';

export default function layout ({ children }: Readonly<{children: React.ReactNode}>) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const tabName = useTabNameStore((state: any) => state.tabName);
  
  const slugNameAndLinkArray = [
    {
      name: isEn ? "User" : "المستخدم",
      href: "/welcome/asd"
    } 
  ];

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
  });
  const isAdmin = userData?.data?.role.role?.name === 'admin';

  // DEBUG
  console.log('userData: ', userData);

  return (
    <div
      className="flex flex-col gap-4 max-w-[1400px] mx-auto"
    >
      <BreadCrumb 
        className="px-4"
        slugNameAndLinkArray={slugNameAndLinkArray}     
      />
      <div
        className="relative"
      >
        <Banner isLoading={isLoading}/>
        {isAdmin 
          && <Link
            href="/dashboard"
            className="
              absolute top-[calc(100%+1rem)] right-4
              flex items-center justify-center w-10 h-10 rounded-full
              cursor-pointer hover:bg-background-light z-[10]
              transition-all duration-300 ease-in-out
            "
          >
            <MaterialSymbolsDashboardRounded
              className="text-primary"
              type="button"
            />    
          </Link>
        }
        
      </div>
      <UserPfp 
        className="mt-[-60.5px] z-[5]" 
        lang={lang}
        isEn={isEn}
        data={userData?.data}
        isLoading={isLoading}
        isError={isError}
      />
      <Username isLoading={isLoading} lang={lang} userName={`${userData?.data.first_name} ${userData?.data.last_name}`} />
      <NavTile 
        className="sticky top-[5.4rem] z-[5]" 
        tabName={tabName}
        lang={lang}
        isLoading={isLoading}
      />
        {children}
      <SignOutBtn 
        className="sticky bottom-4 flex items-center justify-center drop-shadow-md"
        isLoading={isLoading}
      />
    </div>
  )
}