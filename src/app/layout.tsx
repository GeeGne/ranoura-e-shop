"use client"

// HOOKS
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import "./globals.css";

// COMPONENTS
import Providers from '@/app/Providers';
import Header from '@/components/header/index';
import Main from '@/app/[lang]/Main';
import Footer from '@/app/[lang]/Footer';
import FixedLayouts from '@/components/fixedLayouts/Index';
import LoadingScreen from '@/components/fixedLayouts/LoadingScreen';
import Cart from '@/components/fixedLayouts/Cart';
import Navbar from '@/components/fixedLayouts/navbar/Index';
import FilterWindow from '@/components/fixedLayouts/FilterWindow';
import SelectLang from '@/components/fixedLayouts/SelectLang';
import AlertMessage from '@/components/fixedLayouts/AlertMessage';
import AllProductImages from '@/components/fixedLayouts/AllProductImages';
import EditProductWindow from '@/components/fixedLayouts/EditProductWindow';
import AddProductImgAddWindow from '@/components/fixedLayouts/AddProductImgAddWindow';
import BottomBorder from '@/components/svgs/BottomBorder';

// STORES
import { useLayoutRefStore, useLanguageStore } from '@/stores/index';

// JSON
import themes from '@/json/themes.json';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const layoutRef = useLayoutRefStore(state => state.layoutRef);
  const setLayoutRef = useLayoutRefStore(state => state.setLayoutRef);
  const lang = useLanguageStore(state => state.lang);
  const [ onScroll, setOnScroll ] = useState<any>(null);

  const pathNameIncludesDashboard = () => pathname.includes('/dashboard');

  // DEBUG & UI
  // const handleScroll = (e: any) => console.log('wrokign');
  // console.log(layoutRef);
  // console.log(pathNameIncludesDashboard());

  return (
    <html lang={lang} dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <body
        className={`${lang} antialiased`}
      >
        <Providers>
          <div 
            className={`app-layout`}
            onScroll={(e: any) => setOnScroll(e)}
            ref={(el: any) => setLayoutRef(el)}
          >
            <Header 
              onScroll={onScroll} 
              layoutRef={layoutRef}
              className={`${pathNameIncludesDashboard() ? 'hidden' : 'visible'}`}
            />
            <Main
              className={`
                relative bg-background
                ${pathNameIncludesDashboard() ? 'pb-[0rem]' : 'pb-[2rem] md:pb-[3rem] lg:pb-[3rem]'}
              `}
            >
              {children}
              <BottomBorder
                className={`
                  absolute top-[100%] origin-top scale-x-[105%]
                  scale-y-[50%] md:scale-y-[35%] lg:scale-y-[25%] text-primary rotate-180
                  ${pathNameIncludesDashboard() ? 'hidden' : 'visible'}
                `}
              />
            </Main>
            <Footer 
              className={`${pathNameIncludesDashboard() ? 'hidden' : 'visible'}`}
            />
          </div>
          <FixedLayouts>
            {/* <LoadingScreen /> */}
            <Cart />
            <Navbar />
            <SelectLang />
            <FilterWindow />    
            <AlertMessage />
            <AllProductImages />
            <EditProductWindow />
            <AddProductImgAddWindow />
          </FixedLayouts>
        </Providers>
      </body>
    </html>
  );
}
