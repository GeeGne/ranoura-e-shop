// HOOKS
import Image from 'next/image';

// ASSETS
import img1 from '../../public/assets/img/ex-1.avif';
import img2 from '../../public/assets/img/ex-2.avif';
import img3 from '../../public/assets/img/ex-3.avif';
import img4 from '../../public/assets/img/ex-4.avif';

type Props = {
  className?: string;
}

export default function FilmTape ({ className = '', ...props }: Props) {
  return (
    <div
      className={`  
        w-[50px] h-[750px] md:w-[125px] md:h-[1050px] lg:h-[2050px] 
        bg-[hsl(0,7%,6%,0.3)] backdrop-blur-sm text-black overflow-hidden         
        ${className}
      `}
    >
      <ul
        className={`
          --infinite-card-slide-ani flex flex-col items-center p-1 md:p-4 gap-8 
          w-full
        `}
      >
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img1}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img2}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img3}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img1}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img2}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img3}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img1}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img2}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img2}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img1}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img3}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img3}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img1}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img2}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img3}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img1}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img2}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img3}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img1}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img2}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img2}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img1}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img3}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image
            className="bg-red-500 w-full h-full object-cover"
            src={img3}
            alt="test"
            loading="lazy"
            fetchPriority="low"
          />
        </li>
      </ul>
    </div>
  )
}