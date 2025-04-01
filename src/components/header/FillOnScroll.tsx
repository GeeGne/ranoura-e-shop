// HOOKS
import React, { ReactNode, useState, useEffect } from "react";

// STORES
import { useLanguageStore } from '@/stores/index';

type Props = {
  onScroll: ReactNode,
  layoutRef: HTMLElement
}

export default function FillOnScroll ({ onScroll, layoutRef }: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const [ percantage, setPercantage ] = useState<number>(0);

  useEffect(() => {
    if (!layoutRef) return;
    const { scrollHeight, offsetHeight, scrollTop } = layoutRef;
    const wrapperHeight = (scrollHeight - offsetHeight);
  
    const currentPercantage = (scrollTop * 100) / (wrapperHeight);
    setPercantage(currentPercantage);    
  },[ onScroll ]);

  // DEBUG
  // console.log('scrollHeight: ', scrollHeight);
  // console.log('offsetHeight: ', offsetHeight);
  // console.log('wrapperHeight: ', wrapperHeight);
  // console.log('scrollTop: ', scrollTop);
  // console.log('currentPercantage: ', currentPercantage.toFixed(0));

  return (
    <div
      className={`
        absolute top-0 left-0 w-full h-1 
        bg-content-inbetween z-[2000]
        ${isEn ? 'origin-left' : 'origin-right'}
      `}
      style={{ transform: `scaleX(${percantage / 100}`}}
    />
  )
}