"use client"

// HOOKS
import { useState, useEffect, useRef } from 'react';

// STORES
import { useTabNameStore, useLanguageStore } from '@/stores/index';

// ASSETS
const filmTapeImg = "/assets/img/film-tape-hide.avif";

export default function page () {  

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  
  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const [ filmTape, setFilmTape ] = useState<boolean>(true);
  const FilmTapeInptRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTabName('edit-filmTape');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    
    switch (name) {
      case 'film_tape':
        setFilmTape(checked);
        break;
      default:
        console.error("Unknown name: ", name);
    }
  }

  return (
    <section
      className="flex flex-col items-center gap-4 bg-background-light p-4 rounded-lg"
    >
      <div
        className="flex flex-row w-full"
      >
        <span
          className="text-body font-bold"
        >
          Show Film Tape
        </span>
        <label
          className={`
            relative w-10 h-5 
            rounded-full overflow-hidden border border-inbetween
            bg-green-500 cursor-pointer
            ${isEn ? 'ml-auto' : 'mr-auto'}
          `}
          htmlFor="film_tape"
        >
          <input
            className="
              peer invisible flex items-center gap-2 p-2 rounded-lg w-10 text-center
            "
            type="checkbox"
            name="film_tape"
            id="film_tape"
            onChange={handleChange}
            ref={FilmTapeInptRef}
          />
          <div
            className={`
              absolute top-1/2  
              translate-y-[-50%] w-4 h-4 aspect-1/1 
              bg-background rounded-full border border-background-light z-[5]
              transition-all duration-300 ease-in-out
              ${isEn 
                ? 'left-[2px] peer-checked:left-[calc(100%-18px)]' 
                : 'right-[2px] peer-checked:right-[calc(100%-18px)]'
              }
            `}
          />
          <div
            className="
              absolute top-0 left-0   
              w-full h-full aspect-1/1 peer-checked:bg-green-500 bg-inbetween
              transition-all duration-300 ease-in-out
            "
          />
        </label>
      </div>
      <img
        className="w-[600px] rounded-lg" 
        src={filmTapeImg}
      />
    </section>
  )
}