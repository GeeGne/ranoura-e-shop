'use client'

// HOOKS
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

// API
import getThemeVars from '@/lib/api/themes/get';
import getUserData from '@/lib/api/auth/me/get';

// UTILS
import updateThemeVariables from '@/utils/updateThemeVariables';

// STORES
import { useLanguageStore } from '@/stores/index';

export default function Layout (
  { children }
  : Readonly<{children: React.ReactNode;}>
) {

  const { lang } = useParams();
  const setLang = useLanguageStore((state: any) => state.setLang);

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getUserData,
  });
                                                                                            
  const { data: themesData, isError, isLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: getThemeVars,
  });

  useEffect(() => {
    if (isError || isLoading || !themesData?.data) return;
    updateThemeVariables(themesData?.data);
  }, [themesData]);

  useEffect(() => {
    setLang(lang);
    document.cookie = `preferredLang=${lang}; path=/; max-age=31536000`
    console.log('lang layout trigger', lang);
  }, [lang])

  // DEBUG & UI
  // console.log('userData: ', userData);
  // console.log('themesData: ', themesData);

  return (
    <>
      {children}
    </>
  )
}