// HOOKS
import Image from 'next/image';

// COMPONENTS
import DisplayImg from '@/components/DisplayImg';

// ASSETS
const img1 = '/assets/img/ex-1.jpg';
const img2 = '/assets/img/cover-1.jpg';


export default function ImageSlider () {
  return (
    <ul>
      <li
        className="w-full aspect-[1/1] md:aspect-[4/3] lg:aspect-[16/9] bg-red-500"
      >
        <DisplayImg 
          className="w-full h-full object-cover object-center"
          src={img2}
          alt="test"
        />
      </li>
    </ul>
  )
}