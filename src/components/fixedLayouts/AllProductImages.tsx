// HOOKS
import {useRef} from 'react';

// COMPONENTS
import FilterExpandWrapper from "@/components/categoryPage/FilterExpandWrapper";
import ArrowUp from "@/components/svgs/ArrowUp";
import LineMdArrowSmallUp from "@/components/svgs/LineMdArrowSmallUp";

// STORES
import { useAllProductImagesStore } from '@/stores/index';

export default function AllProductImages () {

  const toggle = useAllProductImagesStore(state => state.toggle);
  const setToggle = useAllProductImagesStore(state => state.setToggle);
  const imagesArray = useAllProductImagesStore(state => state.images);

  const MainWrapperRef = useRef<any>(null);
  const imagesRefs = useRef<any>([]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {

    const { type, sectionKey, index } = e.currentTarget.dataset;

    switch (type) {
      case 'close_button_is_clicked':
        setToggle(false);
        break;
      case 'scroll_to_top_button_is_clicked':
        MainWrapperRef.current?.scroll({ top: 0, behavior: 'smooth'} );
        break;
      case 'image_button_is_clicked':
        imagesRefs.current
          .find((itm: string, i: number) => i === Number(index))
          .scrollIntoView({ block: 'center', behavior:'smooth' });
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  const removeCategory = (array: any[], key: any) =>  array.filter(itm => itm.key !== key);

  // DEBUG
  // console.log('test: ', selectedCategories);
  // console.log('test: ', toggle);
  // console.log('imagesArray: ', imagesArray);
  console.log('imagesRefs: ', imagesRefs);

  return (
    <>    
      <div
        className={`
          fixed top-0 left-0 pb-8
          flex flex-col gap-4 w-screen h-screen bg-[var(--shade-v3-color)] z-[2000]
          transition-all duration-300 ease-in-out
          backdrop-blur-[2px] overflow-y-scroll
          ${toggle ? 'translate-y-[0%]' : 'translate-y-[100%]'}
        `}
        ref={MainWrapperRef}
      >
        <div
          className="
            sticky top-0 z-[5]
          "
        >
          <button
            className="
              flex items-center justify-end w-full p-5 opacity-100 cursor-pointer
              w-full text-body text-3xl font-thin
              flex items-center justify-center gap-2 bg-[hsla(0,0%,80%,0.6)] 
              backdrop-blur-[3px] z-[5]
            "
            onClick={handleClick}
            data-type="close_button_is_clicked"
          >
            <ArrowUp 
              className="w-6 h-6 text-between rotate-[180deg] rounded-full border-solid border-body-light border-[1px] p-1"
            />
            <h2>
              CLOSE
            </h2>
          </button>
          <hr className="border-inbetween"/>
        </div>
        <div
          className="
            relative flex flex-col gap-4
            w-full h-full px-4 max-w-[500px] mx-auto
          "
        >
          <ul
            className="grid grid-cols-4 gap-2"
          >
            <li
              className="col-span-4 text-center text-5xl font-light text-body"
            >
              Pick an Image
            </li>
            {imagesArray.map((url, i) =>
              <li
                className="
                  w-full aspect-[2/3] rounded-md overflow-hidden
                  border-soild border-inbetween hover:border-primary border-[2px]
                  transition-all duration-300 ease-in-out
                "
                role="button"
                data-type="image_button_is_clicked"
                data-index={i}
                onClick={handleClick}
                key={i}
              >
                <img 
                  className="w-full h-full object-fit object-cover"
                  alt="photo"
                  src={url}
                />
              </li>
            )}
          </ul>
          <hr className="border-inbetween" />
          <ul
            className="flex flex-col gap-4 pb-4"
          >
            {imagesArray.map((url, i) =>
              <li
                className="w-full h-auto rounded-lg overflow-hidden"
                key={i}
                ref={(el: any) => imagesRefs.current[i] = el}
              >
                <img 
                  className="w-full h-full object-fit object-cover"
                  alt="photo"
                  src={url}
                />              
              </li>
            )}
          </ul>
        </div>
      </div>
      <button
        className={`
          fixed bottom-8 right-8 bg-primary rounded-full z-[2005]
          scale-[100%] hover:scale-[105%]
          transition-all duration-300 ease-in-out
          ${toggle ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
        data-type="scroll_to_top_button_is_clicked"
        onClick={handleClick}
      >
        <LineMdArrowSmallUp 
          className="p-2 w-12 h-12 text-heading-invert"
        />
      </button>
    </>  
  )
}