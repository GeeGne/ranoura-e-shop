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
  className = '', 
  src = '', 
  alt = 'Image', 
  loading = '', 
  fetchpriority = 'auto', 
  darkMode, 
  lan
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoad = () => setIsLoading(false);

  return (
    
    <img 
      className={className} 
      src={src} 
      loading={loading} 
      alt={alt} 
      fetchPriority={fetchpriority} 
      onLoad={handleLoad}
      style={{
        transition: 'filter 0.5s ease-in-out',
        filter: 'blur(' + (isLoading ? '20' : '0') + 'px)',
      }}
    />

  )
}

export default DisplayImg;