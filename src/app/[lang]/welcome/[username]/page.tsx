"use client"

// HOOKS
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// COMPONENTS
import ProfileLI from '@/app/[lang]/welcome/[username]/ProfileLI';
import ProfileLoading from '@/app/[lang]/welcome/[username]/ProfileLoading';
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';

// STORES
import { useTabNameStore } from '@/stores/index';

// JSON
import user from '@/json/user.json';

// API
import getUserData from '@/lib/api/auth/me/get';

export default function page () {
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const categoryArray = [ ...new Set(user.map(itm => itm.category))];
  
  useEffect(() => {
    setTabName('personalData');
  }, []);

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
  });

  // DEBUG & UI
  // console.log(user.filter((itm, i, self) => self.indexOf(itm) === i))
  // console.log(user.filter((itm, i, self) => self.indexOf(itm.category) === i))
  // console.log(user.map(itm => itm.category).filter((itm, i, self) => self.indexOf(itm) === i));
  // console.log([ ...new Set(user.map(itm => itm.category)) ])
  // console.log(categoryArray);
  // console.log('userData: ', userData);
  
  if (isError) return (<></>);
  return (
    <ul
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
    > 
      <ProfileLI 
        user={userData?.data}
        isLoading={isLoading}
      />
    </ul>
  )
}