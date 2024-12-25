import Image from "next/image";
import Hero from '@/components/home/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
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
  );
}
