import { useRouter } from 'next/navigation';

export default function useDeleteAllSearchParams () {
  
  const router = useRouter();

  const deleteAllSearchParams = () => {
    router.replace(window.location.pathname, { scroll: false });
  };

  return deleteAllSearchParams;
}
