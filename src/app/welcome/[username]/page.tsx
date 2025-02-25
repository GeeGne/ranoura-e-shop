"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import ProfileLI from '@/app/welcome/[username]/orders/ProfileLI';
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';

// STORES
import { useTabNameStore } from '@/stores/index';

// JSON
import user from '@/json/user.json';

export default function page () {
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const categoryArray = [ ...new Set(user.map(itm => itm.category))];
  
  useEffect(() => {
    setTabName('personalData');
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
      {categoryArray.map((itm, i) => 
        <ProfileLI 
          key={i}
          title={itm}
          user={user}
        />
      )}
    </ul>
  )
}