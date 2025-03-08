import { useRouter, useSearchParams } from 'next/navigation';

export default function useDeleteSearchParams () {
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const deleteSearchParams = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  return deleteSearchParams;
}
