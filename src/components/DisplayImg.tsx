"use client"

import React, { useState } from 'react';

type Props = {
  className?: string; 
  src?: string; 
  alt?: string; 
  loading?: string; 
  fetchpriority?: string; 
  darkMode?: string; 
  lan?: string;
}

function DisplayImg ({
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoad = () => setIsLoading(false);

  return (
    
    <img 
      alt="A Picture" 
      loading="lazy" 
      onLoad={handleLoad}
      style={{
        transition: 'filter 0.5s ease-in-out',
        filter: 'blur(' + (isLoading ? '20' : '0') + 'px)',
      }}
      {...props}
    />

  )
}

export default DisplayImg;