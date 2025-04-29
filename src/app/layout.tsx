"use client"

// HOOKS
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import "./globals.css";

// COMPONENTS
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

  const pathNameIncludesAdmin = () => pathname.includes('/admin');

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', themes.primary_color);
    document.documentElement.style.setProperty('--primary-invert-color', themes.primary_invert_color);
    document.documentElement.style.setProperty('--secondary-color', themes.secondary_color);
    document.documentElement.style.setProperty('--secondary-invert-color', themes.secondary_invert_color);
    document.documentElement.style.setProperty('--inbetween-color', themes.inbetween_color);
    document.documentElement.style.setProperty('--content-color', themes.content_color);
    document.documentElement.style.setProperty('--content-inbetween-color', themes.content_inbetween_color);
    document.documentElement.style.setProperty('--content-invert-color', themes.content_invert_color);
  }, []);

  // DEBUG & UI
  // const handleScroll = (e: any) => console.log('wrokign');
  // console.log(layoutRef);
  // console.log(pathNameIncludesAdmin());

  return (
    <html lang={lang} dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <body
        className={`${lang} antialiased`}
      >
        <div 
          className={`app-layout`}
          onScroll={(e: any) => setOnScroll(e)}
          ref={(el: any) => setLayoutRef(el)}
        >
          <Header 
            onScroll={onScroll} 
            layoutRef={layoutRef}
            className={`${pathNameIncludesAdmin() ? 'hidden' : 'visible'}`}
          />
          <Main
            className={`
              relative bg-background
              ${pathNameIncludesAdmin() ? 'pb-[0rem]' : 'pb-[2rem] md:pb-[3rem] lg:pb-[3rem]'}
            `}
          >
            {children}
            <BottomBorder
              className={`
                absolute top-[100%] origin-top scale-x-[105%]
                scale-y-[50%] md:scale-y-[35%] lg:scale-y-[25%] text-primary rotate-180
                ${pathNameIncludesAdmin() ? 'hidden' : 'visible'}
              `}
            />
          </Main>
          <Footer 
            className={`${pathNameIncludesAdmin() ? 'hidden' : 'visible'}`}
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
        </FixedLayouts>
      </body>
    </html>
  );
}
