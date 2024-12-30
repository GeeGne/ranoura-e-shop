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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#F1EFEF"><path d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z" opacity=".5"></path><path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path></svg>
          </Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
