// HOOKS
import Image from 'next/image';

// ASSETS
import img1 from '../../public/assets/img/ex-1.jpg';
import img2 from '../../public/assets/img/ex-2.jpg';
import img3 from '../../public/assets/img/ex-3.jpg';
import img4 from '../../public/assets/img/ex-4.jpg';

type Props = {
  className?: string;
}

export default function FilmTape ({ className = '', ...props }: Props) {
  return (
    <div
      className={`  
        w-[100px] h-[700px] md:w-[125px] md:h-[1000px] lg:h-[2050px] 
        bg-[hsl(0,7%,94%,0.2)] backdrop-blur-sm text-black overflow-hidden
         
        ${className}
      `}
    >
      <ul
        className={`
          --infinite-card-slide-ani flex flex-col items-center p-4 gap-8 
          w-full
        `}
      >
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img1}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img2}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img3}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img1}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img2}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img3}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img1}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img2}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img2}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img1}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img3}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img3}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img1}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img2}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img3}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img1}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img2}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img3}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img1}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img2}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img2}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img1}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img3}
            alt="test"
          />
        </li>
        <li
          className="w-full shrink-0 aspect-[3/4] bg-[var(--background-color)] rounded-2xl overflow-hidden"
        >
          <Image 
            src={img3}
            alt="test"
          />
        </li>
      </ul>
    </div>
  )
}