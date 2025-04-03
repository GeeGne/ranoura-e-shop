// STORES
import { useLanguageStore } from '@/stores/index';

export default function UnderlineStyle ({ ...props }) {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  return (
    <div
      className={`
        absolute bottom-[-4px] w-0 group-hover:w-full h-[2px] 
        bg-heading-invert 
        transition-all ease-in-out duration-200
        ${isEn ? 'left-0' : 'right-0'}
      `}
      {...props}
    />
  )
}