'use client'

// HOOKS
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// API
import getThemeVars from '@/lib/api/themes/get';
import getUserData from '@/lib/api/auth/me/get';

// UTILS
import updateThemeVariables from '@/utils/updateThemeVariables';

export default function Layout (
  { children }
  : Readonly<{children: React.ReactNode;}>
) {

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

  // DEBUG & UI
  console.log('userData: ', userData);
  // console.log('themesData: ', themesData);

  return (
    <>
      {children}
    </>
  )
}