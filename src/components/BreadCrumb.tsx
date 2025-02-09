// HOOKS
import Link from 'next/link';

// COMPONENTS
import LineMdHomeTwotone from '@/components/svgs/LineMdHomeTwotone';
import IconoirHomeAltSlim from '@/components/svgs/IconoirHomeAltSlim';
import LineMdChevronSmallRight from '@/components/svgs/LineMdChevronSmallRight';

type Props = {
  slugNameAndLinkArray?: any[];
  className?: string;
}

export default function BreadCrumb ({ slugNameAndLinkArray, className, ...props }: Props) {
  
  const scrollToTop = () => 
    document.querySelector('.app-layout')
    ?.scrollTo({ top:0, left:0, behavior: 'smooth'});

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
          className="mx-1"
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
                  className="mx-1"
                />
          }
        </li>
      )}
    </ul>
  )
}