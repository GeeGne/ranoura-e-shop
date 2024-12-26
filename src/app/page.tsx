import Image from "next/image";
import Hero from '@/components/home/Hero';
import FileTape from '@/components/FilmTape';

export default function Home() {
  return (
    <div>
      <Hero
        className="relative test z-[1]"

      > 
        <FileTape
          className="
            absolute top-1/2 right-0 translate-y-[-50%]   
            origin-center-right rotate-[45deg]
          "
        />
      </Hero>
      <div
        className=""
      >
        <div
          className="text-2xl"
        >
          text 2xl
        </div>
        <div
          className="text-xl"
        >
          text xl
        </div>
        <div
          className="text-lg"
        >
          text lg
        </div>
        <div
          className="text-md"
        >
          text md
        </div>
        <div
          className="text-sm"
        >
          text sm
        </div>
        <div
          className="text-xs"
        >
          text xs
        </div>
      </div>
    </div>
  );
}
