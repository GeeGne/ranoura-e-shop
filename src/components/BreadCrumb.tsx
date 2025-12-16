// HOOKS
import Link from 'next/link';

// COMPONENTS
import LineMdHomeTwotone from '@/components/svgs/LineMdHomeTwotone';
import IconoirHomeAltSlim from '@/components/svgs/IconoirHomeAltSlim';
import LineMdChevronSmallRight from '@/components/svgs/LineMdChevronSmallRight';

// STORES
import { useLanguageStore } from '@/stores/index';

type Props = {
  slugNameAndLinkArray?: any[];
  className?: string;
  isLoading?: boolean;
}

export default function BreadCrumb ({ 
  slugNameAndLinkArray,
  className, 
  isLoading = false,
  ...props 
}: Props) {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const scrollToTop = () => 
    document.querySelector('.app-layout')
    ?.scrollTo({ top:0, left:0, behavior: 'smooth'})
  ;

  if (isLoading) return (
    <div
      className={`
        --blink-opacity flex items-center text-sm font-bold
        ${className}
      `}
      {...props}
    >
      <span
        className="text-transparent bg-background-light rounded-md"
      >
        ///////////////////////////////////////////////////
      </span>
    </div>    
  )

  return (
    <ul
      className={`
        flex items-center text-sm font-bold text-heading
        ${className}
      `}
      {...props}
    >
      <li
        className="flex items-center"
      >
        <Link
          href="/"
        >
          <IconoirHomeAltSlim
            className="text-heading hover:text-heading cursor-pointer"
          />
        </Link>
        <LineMdChevronSmallRight 
          className={`${isEn ? 'rotate-0' : 'rotate-180'} mx-1`}
        />
      </li>
      {slugNameAndLinkArray?.map((itm, i) => 
        <li
          className="flex items-center"
          key={i}
        >
          <Link
            className={`
              
              ${slugNameAndLinkArray.length - 1 === i
                ? "text-content py-1 px-2 "
                : "bg-[var(--background-deep-light-color)] py-1 px-2 rounded-md"
              }
            `}
            href={itm.href}
          >
            {itm.name}
          </Link>
          {slugNameAndLinkArray.length - 1 === i
            ||  <LineMdChevronSmallRight 
                  className={`${isEn ? 'rotate-0' : 'rotate-180'} mx-1`}
                />
          }
        </li>
      )}
    </ul>
  )
}