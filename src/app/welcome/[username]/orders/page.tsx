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
  
  useEffect(() => {
    setTabName('userOrders');
  }, []);

  return (
    <ul
      className="flex flex-col gap-4 w-full p-4 mt-[-1rem] max-w-[1400px] lg:mx-auto bg-[var(--background-light-color)]"
    > 
      <li
        className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
      >
        <div className="flex items-center gap-2">
          <LineMdTextBoxToTextBoxMultipleTransition 
            className="text-heading"
          />
          <h3
            className="text-lg text-heading font-bold"
          >
            PERSONAL
          </h3>
        </div>
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">First Name</span>
            <span className="text-md text-heading">Ahmed</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">Last Name</span>
            <span className="text-md text-heading">El Ghabra</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">Email</span>
            <span className="text-md text-heading">bluewhalexweb@outlook.com</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">Date of Birth</span>
            <span className="text-md text-heading">1997 / 2 / 27</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">Gender</span>
            <span className="text-md text-heading">Male</span>
          </li>
        </ul>
      </li>
      {user.map((item, i) => 
        <ProfileLI 
          key={i}
        />
      )}
    </ul>
  )
}