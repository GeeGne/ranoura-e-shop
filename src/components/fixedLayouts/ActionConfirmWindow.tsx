// HOOKS
import { useState, useEffect, useRef, useReducer } from 'react';

// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import LsiconPasteFilled from '@/components/svgs/LsiconPasteFilled';

// STORES
import { useLanguageStore, useActionConfirmWindowStore, useAlertMessageStore } from '@/stores/index';

export default function ActionConfirmWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const inptRef = useRef<HTMLInputElement>(null);

  const toggle = useActionConfirmWindowStore(state => state.toggle);
  const setToggle = useActionConfirmWindowStore(state => state.setToggle);
  const isLoading = useActionConfirmWindowStore(state => state.isLoading);
  const setIsLoading = useActionConfirmWindowStore(state => state.setIsLoading);
  const title = useActionConfirmWindowStore(state => state.title);
  const setTitle = useActionConfirmWindowStore(state => state.setTitle);
  const description = useActionConfirmWindowStore(state => state.description);
  const setDescription = useActionConfirmWindowStore(state => state.setDescription);
  const action = useActionConfirmWindowStore(state => state.action);
  const setAction = useActionConfirmWindowStore(state => state.setAction);
  const btnTitle = useActionConfirmWindowStore(state => state.btnTitle);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const addIsProcessingNote = () => {
    setAlertToggle(Date.now());
    setAlertType("warning");
    setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        setToggle(false);
        break;
      case 'window_box_button_is_clicked':
        break;
      case 'accept_button_is_clicked':
        console.log('click')
        console.log('isLoading:', isLoading)
        if (isLoading) return addIsProcessingNote();

        setAction({ ...action, isConfirmed: true});
        break;
      case 'cancel_button_is_clicked':
        if (isLoading) {
          setAlertToggle(Date.now());
          setAlertType("warning");
          setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
          return;
        };

        setToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'actionWindowInpt': 
        setAction({ ...action, value})
        break;
      default:
      console.error('Unknown name: ', name);
    }
  }

  // DEBUG & UI
  // const toggle = true;
  // console.log('toggle: ', toggle);

  if (action.type === 'input') return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[5000]
        transition-all duration-200 ease-out
        ${toggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
      data-type="fixed_window_is_clicked"
      onClick={handleClick}
    >
      <div
        className={`
          absolute top-1/2 left-1/2 
          translate-x-[-50%] translate-y-[-50%]
          rounded-lg overflow-y-scroll
          bg-background overflow-hidden
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="window_box_button_is_clicked"
        onClick={handleClick}
      >
        <section
          className="
            flex text-body-light justify-center py-4 font-bold px-2
          "
        >
          <h2>
            {title[lang]}
          </h2>
        </section>
        <hr className="border-inbetween" />
        <section
          className="flex flex-col gap-4 w-[400px] md:w-[500px] px-2 py-4 text-body font-bold"
        >
          <div
            className="relative flex items-center justify-between"
          >
            <div
              className={`
                group absolute top-1/2 translate-y-[-50%]
                ${isEn ? 'right-4' : 'left-4'}
              `}
            >
              <LsiconPasteFilled 
                className="
                  peer w-6 h-6 p-1 rounded-md cursor-pointer
                  bg-body-light hover:bg-body active:bg-heading text-background-light
                  transition-all duration-200 ease-out
                "
                role="button"
                data-type="past_button_is_clicked"
                // onClick={handleClick}
              />
              <span 
                className="
                  absolute bottom-[calc(100%+0.5rem)] left-1/2 translate-x-[-50%]
                  text-sm text-body-invert bg-body p-1 rounded-md
                  invisible peer-hover:visible opacity-0 peer-hover:opacity-100
                  transition-all duration-200 ease-out
                "
              >
                {isEn ? 'Paste' : 'لصق'}
              </span>
            </div>
            <input 
              className="w-full text-body bg-background-light p-2 rounded-md"
              type="text"
              name="actionWindowInpt"
              id="actionWindowInpt"
              placeholder={description[lang] || ""}
              value={typeof action.value === 'string' ? action.value : ''}
              onChange={handleChange}
              ref={inptRef}
            />
          </div>
        </section>
        <hr className="border-inbetween" />
        <section
          className="
            relative flex w-full
          "
        >
          <div
            className="
              absolute top-1/2 left-1/2
              translate-x-[-50%] translate-y-[-50%]
              w-[1px] h-full bg-inbetween
            "
          />
          <button
            className="
              flex-1 text-heading p-1
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="cancel_button_is_clicked"
            onClick={handleClick}
          >
            {isEn ? 'cancel' : 'تراجع'}
          </button>
          <button
            className={`
              relative flex-1 p-1 
              hover:bg-background-deep-light
              ${isLoading ? 'cursor-progress' : 'cursor-pointer'}
            `}
            data-type="accept_button_is_clicked"
            onClick={handleClick}
          >
            <span
              className={`
                ${isLoading ? 'text-transparent' : 'text-content'}
                transition-all duration-300 ease-in-out
              `}
            >
              {btnTitle[lang]}
            </span>
            <SvgSpinnersRingResize 
              className={`
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                text-content
                ${isLoading ? 'text-content' : 'text-transparent'}
              `}
            />
          </button>
        </section>
      </div>
    </div>
  )

  if (action.type === 'text') return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[5000]
        transition-all duration-200 ease-out
        ${toggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
      data-type="fixed_window_is_clicked"
      onClick={handleClick}
    >
      <div
        className={`
          absolute top-1/2 left-1/2 
          translate-x-[-50%] translate-y-[-50%]
          rounded-lg overflow-y-scroll
          bg-background overflow-hidden
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
        onClick={handleClick}
      >
        <section
          className="
            flex text-body-light justify-center py-4 font-bold px-2
          "
        >
          <h2>
            {title[lang]}
          </h2>
        </section>
        <hr className="border-inbetween" />
        <section
          className="flex flex-col gap-2 w-full px-2 py-4 text-body font-bold"
        >
          <h3>
            {description[lang]}
          </h3>
        </section>
        <hr className="border-inbetween" />
        <section
          className="
            relative flex w-full
          "
        >
          <div
            className="
              absolute top-1/2 left-1/2
              translate-x-[-50%] translate-y-[-50%]
              w-[1px] h-full bg-inbetween
            "
          />
          <button
            className="
              flex-1 text-heading p-1
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="cancel_button_is_clicked"
            onClick={handleClick}
          >
            {isEn ? 'cancel' : 'تراجع'}
          </button>
          <button
            className={`
              relative flex-1 p-1 
              hover:bg-background-deep-light
              ${isLoading ? 'cursor-progress' : 'cursor-pointer'}
            `}
            data-type="accept_button_is_clicked"
            onClick={handleClick}
          >
            <span
              className={`
                ${isLoading ? 'text-transparent' : 'text-content'}
                transition-all duration-300 ease-in-out
              `}
            >
              {btnTitle[lang]}
            </span>
            <SvgSpinnersRingResize 
              className={`
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                text-content
                ${isLoading ? 'text-content' : 'text-transparent'}
              `}
            />
          </button>
        </section>
      </div>
    </div>
  )
}