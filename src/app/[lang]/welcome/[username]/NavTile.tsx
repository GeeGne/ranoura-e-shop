import Link from 'next/link';

type Props = {
  className?: string;
  tabName?: string;
  lang?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<"nav">;

export default function NavTile ({ className, tabName, lang, isLoading = false, ...props }: Props) {
  const isEn = lang === 'en';
  if (isLoading) return (
    <nav
      className={`
        flex flex-row divide-inbetween py-1 bg-background
        divide-x-[1px] border-solid border-inbetween border-b-[1px]
        ${className}
      `}
      { ...props }
    >
      <div
        className={`
          group relative flex flex-1 justify-center 
          text-md text-body hover:text-heading font-bold
          transition-all duration-300 ease-in-out
        `}
      >
        <span
          className={`
            py-1 px-2 rounded-md
            --opacity-blink bg-background-deep-light text-background-deep-light
            transition-all duration-300 ease-in-out
          `}        
        >
          Profile
        </span>
      </div>
      <div
        className={`
          group relative flex flex-1 justify-center 
          text-md font-bold text-background-deep-light
          transition-all duration-300 ease-in-out
        `}
      >
        <span
          className={`
            py-1 px-2 rounded-md
            --opacity-blink bg-background-deep-light text-background-deep-light
            transition-all duration-300 ease-in-out
          `}        
        >
          Orders 
        </span>
      </div>
    </nav>
  )

  return (
    <nav
      className={`
        relative flex flex-row py-1 bg-background
        border-solid border-inbetween border-b-[1px]
        ${className}
      `}
      { ...props }
    >
      <div 
        className={`
          absolute top-1/2 left-1/2
          translate-x-[-50%] translate-y-[-50%]
          w-px h-8 bg-inbetween
        `}
      />
      <Link
        href="/welcome/sdf"
        scroll={true}
        className={`
          group flex flex-1 justify-center 
          text-md text-body hover:text-heading font-bold
          transition-all duration-300 ease-in-out
        `}
      >
        <span
          className={`
            relative group-hover:bg-[var(--background-light-color)] py-2 px-2 rounded-md
            transition-all duration-300 ease-in-out
            ${tabName === 'personalData' ? 'user-nav-selected text-heading' : 'user-nav-not-selected text-body' }
          `}        
        >
          {isEn ? 'Profile' : 'البروفايل'}
        </span>
      </Link>
      <Link
        href="/welcome/fsadf/orders"
        className={`
          group flex flex-1 justify-center 
          text-md text-body hover:text-heading font-bold
          transition-all duration-300 ease-in-out
        `}
      >
        <span
          className={`
            relative group-hover:bg-[var(--background-light-color)] py-2 px-2 rounded-md
            transition-all duration-300 ease-in-out
            ${tabName === 'userOrders' ? 'user-nav-selected text-heading' : 'user-nav-not-selected text-body' }
          `}                
        >
          {isEn ? 'Orders' : 'الاوردرات'} 
        </span>
      </Link>
    </nav>
  )
}