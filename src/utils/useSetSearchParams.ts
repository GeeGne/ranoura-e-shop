import { useRouter, useSearchParams } from 'next/navigation';

export default function useSetSearchParams () {
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const setSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  return setSearchParams;
}
