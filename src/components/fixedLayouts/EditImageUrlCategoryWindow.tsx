// HOOKS
import { useState, useRef, useReducer } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import LsiconPasteFilled from '@/components/svgs/LsiconPasteFilled';

// STORES
import { useLanguageStore, useEditImageUrlCategoryWindowStore, useAlertMessageStore } from '@/stores/index';

// API
import addNewSubCategory from '@/lib/api/sub-categories/post';

// UTILS
import createSlug from '@/utils/createSlug';

export default function EditImageUrlCategoryWindow () {
  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const imgUrlInptRef = useRef<HTMLInputElement>(null);

  const toggle = useEditImageUrlCategoryWindowStore(state => state.toggle);
  const setToggle = useEditImageUrlCategoryWindowStore(state => state.setToggle);
  const imageUrl = useEditImageUrlCategoryWindowStore(state => state.imageUrl);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ name, setName ] = useState<Record<string, string>>({ en: "", ar: "" });

  const addNewSubCategoryMutation = useMutation({
    mutationFn: addNewSubCategory,
    onSettled: () => {
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sub-categories'] });
      setAlertToggle(Date.now());
      setAlertType("success");
      setAlertMessage(data.message[isEn ? 'en' : 'ar']);
      setToggle(false);
    },
    onError: () => {
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(
        isEn 
          ? 'Error while Creating a new Sub Category, please try again later.' 
          : 'حصل خطأ خلال انشاء قسم فرعي, الرجاء المحاوله مره اخرى.'
      );
    },
  })

  const addIsProcessingNote = () => {
    setAlertToggle(Date.now());
    setAlertType("warning");
    setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
  }

  const handleClick = async (e: React.MouseEvent<HTMLElement | SVGElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'save_button_is_clicked':
        if (isLoading) addIsProcessingNote();

        // console.log('newSubCategoryInfo: ', newSubCategoryInfo);
        // addNewSubCategoryMutation.mutate(newSubCategoryInfo);
        break;
        case 'cancel_button_is_clicked':
          if (isLoading) return addIsProcessingNote();
          setToggle(false);
          break;
        case 'past_button_is_clicked':
          const clipBoardText = await navigator.clipboard.readText();
          if (imgUrlInptRef.current) imgUrlInptRef.current.value = clipBoardText;
          // console.log('newSubCategoryInfo: ', newSubCategoryInfo);
          // addNewSubCategoryMutation.mutate(newSubCategoryInfo);
          break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'imgUrlInpt':
        setName(val => ({ ...val, en: value.toUpperCase()}))
        break;
      case 'arSubCategory':
        setName(val => ({ ...val, ar: value}))
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  // DEBUG & UI
  console.log('imageUrl: ', imageUrl);

  return (
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
            {isEn ? 'Update Image URL' : 'تحديث رابط الصوره'}
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
              className="group absolute top-1/2 right-4 translate-y-[-50%]"
            >
              <LsiconPasteFilled 
                className="
                  peer w-6 h-6 p-1 rounded-md cursor-pointer
                  bg-body-light hover:bg-body active:bg-heading text-background-light
                  transition-all duration-200 ease-out
                "
                role="button"
                data-type="past_button_is_clicked"
                onClick={handleClick}
              />
              <span 
                className="
                  absolute bottom-[calc(100%+0.5rem)] left-1/2 translate-x-[-50%]
                  text-sm text-body-invert bg-body p-1 rounded-md
                  invisible peer-hover:visible opacity-0 peer-hover:opacity-100
                  transition-all duration-200 ease-out
                "
              >
                Paste
              </span>
            </div>
            <input 
              className="w-full text-body bg-background-light p-2 rounded-md"
              type="text"
              name="imgUrlInpt"
              id="imgUrlInpt"
              placeholder={imageUrl || ""}
              onChange={handleChange}
              ref={imgUrlInptRef}
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
            data-type="save_button_is_clicked"
            onClick={handleClick}
          >
            <span
              className={`
                ${isLoading ? 'text-transparent' : 'text-content'}
                transition-all duration-300 ease-in-out
              `}
            >
              {isEn ? 'save' : 'حفظ'}
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