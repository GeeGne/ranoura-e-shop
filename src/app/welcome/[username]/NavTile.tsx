import Link from 'next/link';

type Props = {
  className?: string;
  tabName?: string;
} & React.ComponentPropsWithRef<"nav">;

export default function NavTile ({ className, tabName, ...props }: Props) {
  return (
    <nav
      className={`
        flex flex-row divide-inbetween py-4 bg-background
        divide-x-[1px] border-solid border-inbetween border-b-[1px]
        ${className}
      `}
      { ...props }
    >
      <Link
        href="/welcome/sdf"
        scroll={true}
        className={`
          relative flex flex-1 justify-center text-md text-body hover:text-heading font-bold
          transition-all duration-300 ease-in-out
          ${tabName === 'personalData' ? 'user-nav-selected text-heading' : 'text-body' }
        `}
      >
        Profile    
      </Link>
      <Link
        href="/welcome/fsadf/orders"
        className={`
          relative flex flex-1 justify-center text-md text-body hover:text-heading font-bold
          transition-all duration-300 ease-in-out
          ${tabName === 'userOrders' ? 'user-nav-selected text-heading' : 'text-body' }
        `}
      >
        Orders    
      </Link>
    </nav>
  )
}