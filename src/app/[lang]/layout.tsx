'use client'

// HOOKS
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// API
import getThemeVars from '@/lib/api/themes/get';

// UTILS
import updateThemeVariables from '@/utils/updateThemeVariables';

export default function Layout (
  { children }
  : Readonly<{children: React.ReactNode;}>
) {

  const { data: themesData, isError, isLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: getThemeVars,
  })

  useEffect(() => {
    if (isError || isLoading) return;
    updateThemeVariables(themesData);
  }, [themesData]);

  return (
    <>{children}</>
  )
}