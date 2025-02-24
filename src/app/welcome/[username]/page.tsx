"use client"

// HOOKS
import { useEffect } from 'react';

// COMPONENTS
import BreadCrumb from '@/components/BreadCrumb';
import Banner from '@/app/welcome/[username]/Banner';
import UserPfp from '@/app/welcome/[username]/UserPfp';
import Username from '@/app/welcome/[username]/Username';
import NavTile from '@/app/welcome/[username]/NavTile';
import SignOutBtn from '@/app/welcome/[username]/SignOutBtn';

// STORES
import { useTabNameStore } from '@/stores/index';

export default function page () {
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  
  const slugNameAndLinkArray = [
    {
      name: "User",
      href: "/welcome/asd"
    } 
  ];

  useEffect(() => {
    setTabName('personalData');
  }, []);

  return (
    <section
      className="flex flex-col gap-4 max-w-[1400px] mx-auto"
    >
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
      <div>
        Persoanl Data
      </div>
    </section>
  )
}