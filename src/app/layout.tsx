"use client"
import type { Metadata } from "next";
import { useState, useRef } from 'react';
import "./globals.css";

import Header from '@/app/Header';
import Main from '@/app/Main';
import Footer from '@/app/Footer';
import Cart from '@/components/fixedLayouts/Cart';
import Navbar from '@/components/fixedLayouts/Navbar';
import FilterWindow from '@/components/fixedLayouts/FilterWindow';
import FixedLayouts from '@/components/fixedLayouts/Index';
import BottomBorder from '@/components/svgs/BottomBorder';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [ layoutRef, setLayoutRef ] = useState<any>(null);
  const [ onScroll, setOnScroll ] = useState<any>(null);

  // DEBUG & UI
  // const handleScroll = (e: any) => console.log('wrokign');
  // console.log(layoutRef);
  
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div 
          className="app-layout"
          onScroll={(e: any) => setOnScroll(e)}
          ref={(el: any) => setLayoutRef(el)}
        >
          <Header onScroll={onScroll} layoutRef={layoutRef}/>
          <Main
            className="relative bg-background pb-[3rem] md:pb-[4rem] lg:pb-[6rem]"
          >
            {children}
            <BottomBorder
              className="
                absolute top-[100%] origin-top scale-x-[105%]
                scale-y-[50%] md:scale-y-[35%] lg:scale-y-[25%] text-primary rotate-180
              "
            />
          </Main>
          <Footer />
        </div>
        <FixedLayouts>
          <Cart />
          <Navbar />
          <FilterWindow />          
        </FixedLayouts>
      </body>
    </html>
  );
}
