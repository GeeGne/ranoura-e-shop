"use client"
import type { Metadata } from "next";
import { useState, useRef } from 'react';
import "./globals.css";
import Header from '@/app/Header';
import Main from '@/app/Main';
import Footer from '@/app/Footer';

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
          <Main>
            {children}
          </Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
