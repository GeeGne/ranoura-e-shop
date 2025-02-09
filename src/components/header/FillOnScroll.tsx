// HOOKS
import React, { ReactNode, useState, useEffect } from "react";

type Props = {
  onScroll: ReactNode,
  layoutRef: HTMLElement
}

export default function FillOnScroll ({ onScroll, layoutRef }: Props) {

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
        absolute top-0 left-1/2 w-[100vw] h-1 bg-content-invert
      `}
      style={{ transform: `translateX(${percantage - 150}%`}}
    />
  )
}