"use client"

// HOOKS
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import Instructions from '@/app/[lang]/dashboard/edit-social-links/Instructions';
import Add from '@/app/[lang]/dashboard/edit-social-links/Add';
import Table from '@/app/[lang]/dashboard/edit-social-links/Table';
import ErrorLayout from '@/components/ErrorLayout';

// API
import getSocialLinks from '@/lib/api/social-links/get';
import deleteSocialLink from '@/lib/api/social-links/id/delete';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

export default function page () {  
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  useEffect(() => {
    setTabName('edit-social-links');
  }, []);

  const { data: socialLinks, isLoading, isError } = useQuery({
    queryKey: ['social-links'],
    queryFn: getSocialLinks,
  })

  // DEBUG
  console.log('social links data: ', socialLinks);

  if (isError) return ( 
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  );

  return (
    <div
      className="flex flex-col gap-8"
    >
      <Instructions />
      <Add />
      <Table 
        data={socialLinks?.data} 
        isLoading={isLoading} 
      /> 
    </div>
  )
}