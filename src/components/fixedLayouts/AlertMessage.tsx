import { useEffect, useRef } from 'react';

// SVGS
import CheckBoxes from "@/components/svgs/CheckBoxes";
import Notify from "@/components/svgs/Notify";
import Warning from "@/components/svgs/Warning";
import Wishlist from "@/components/svgs/Wishlist";
import ShoppingApp from "@/components/svgs/ShoppingApp";
import OrderConfirmed from "@/components/svgs/OrderConfirmed";

// STORES
import { useAlertMessageStore } from "@/stores/index";

export default function AlertMessage () {

  const toggle = useAlertMessageStore(state => state.toggle);
  const type = useAlertMessageStore(state => state.type);
  const message = useAlertMessageStore(state => state.message);
  const wrapperRef = useRef<any>(null)
  const timeoutId = useRef<any>(null);
  const timeoutId2 = useRef<any>(null);

  useEffect(() => {
    if (toggle === 0) return;
    if (wrapperRef.current) wrapperRef.current.style.display = 'none'

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() =>{ 
      if (wrapperRef.current) wrapperRef.current.style.display = 'flex'

    }, 100);
    clearTimeout(timeoutId2.current);
    timeoutId.current = setTimeout(() =>{ 
      if (wrapperRef.current) wrapperRef.current.style.display = 'none'
    }, 10100);
  }, [toggle])


  const handleClick = (e: any) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'wrapper_is_clicked':
      case 'close_button_is_clicked':
        wrapperRef.current.style.display = 'none';
        break;
      default:
      console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // const type: any = 'error';
  // const type: any = 'warning';
  // const type: any = 'success';
  // const type: any = 'wishlist';
  // const type: any = 'product added';
  // const type: any = 'product removed';
  // const message = 'this is a message for something useful  this is a message for something useful';

  return (
    <div
      className="
        --alert-messge-ani
        hidden fixed top-[10%] left-1/2
        translate-x-[-50%]
        w-[calc(100vw-2rem)] md:w-auto
        flex flex-row md:flex-row items-center justify-center gap-4
        p-2 bg-[var(--background-light-color)] hover:bg-[var(--background-deep-light-color)] active:bg-[var(--background-deep-color)]
        drop-shadow-xl rounded-lg overflow-hidden
        transition-all duration-200 ease-in-out
        cursor-pointer z-[1000]
      "
      ref={wrapperRef}

      data-type="wrapper_is_clicked"
      onClick={handleClick}
    >
      <button
        className="
          --alert-messge-content-ani
          absolute top-2 right-2
          w-5 h-5 flex items-center justify-center bg-inbetween rounded-full
          text-[var(--background-light-color)] text-xs font-bold cursor-pointer
        "
        data-type="close_button_is_clicked"
        onClick={handleClick}
      >
        X
      </button>
      {type === 'wishlist' &&
        <Wishlist 
          className={`
            --alert-messge-content-ani w-[75px] h-[75px] lg:w-[100px] lg:h-[100px]
            text-pink-500
          `}
        />
      }  
      {type === 'success' &&
        <CheckBoxes 
          className={`
            --alert-messge-content-ani w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] 'text-green-500'
          `}
        />
      } 
      {type === 'warning' &&
        <Notify 
          className={`
            --alert-messge-content-ani w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] text-yellow-500
          `}
        />
      } 
      {type === 'error' &&
        <Warning 
          className={`
            --alert-messge-content-ani w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] text-red-500
          `}
        />
      } 
      {(type === 'product added'
        || type === 'product removed') 
        && <ShoppingApp 
          className={`
            --alert-messge-content-ani w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]
          `}
        />
      } 
      <div
        className="flex flex-col items-center gap-2"
      >
        <span
          className={`
            --alert-messge-content-ani text-base lg:text-xl font-bold
            ${type === 'success' 
              ? 'text-green-500'
              : type === 'warning'
                ? 'text-yellow-500'
                : type === 'wishlist'
                  ? 'text-pink-500'
                    : (type === 'product added' || type === 'product removed')
                      ? 'text-violet-500'
                      : 'text-red-500'
            }
          `}
        >
          {type === 'success' 
            ? 'All Set!'
            : type === 'warning'
              ? 'Attention Needed ✋'
              : type === 'wishlist'
                ? 'Wishlist Updated 💖'
                : type === 'product added'
                  ? 'Added to Your Cart'
                  :  type === 'product removed'
                    ? 'Item Removed from Cart'
                    : 'Oops! Something Went Wrong 🚫'
          }
        </span>
        <span
          className="--alert-messge-content-ani text-body text-sm lg:text-base"
        >
          {message}
        </span>
      </div> 
      <div
        className={`
          --alert-timer-tape-ani
          absolute bottom-0 left-0
          h-[5px]
          ${type === 'success' 
            ? 'bg-green-500'
            : type === 'warning'
              ? 'bg-yellow-500'
              : type === 'wishlist'
                ? 'bg-pink-500'
                  : (type === 'product added' || type === 'product removed')
                    ? 'bg-violet-500'
                    : 'bg-red-500'
          }
        `}
      />
    </div>
  )
}