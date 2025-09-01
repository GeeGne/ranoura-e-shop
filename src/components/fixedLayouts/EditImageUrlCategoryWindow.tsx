// HOOKS
import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';
import LsiconPasteFilled from '@/components/svgs/LsiconPasteFilled';

// STORES
import { useLanguageStore, useEditImageUrlCategoryWindowStore, useAlertMessageStore } from '@/stores/index';

// API
import addNewSubCategory from '@/lib/api/sub-categories/post';
import updateCategory from '@/lib/api/categories/slug/put';

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
  const categorySlug = useEditImageUrlCategoryWindowStore(state => state.slug);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ name, setName ] = useState<Record<string, string>>({ en: "", ar: "" });


  const [ imgUrlValue, setImageUrlValue ] = useState<string>("");

  useEffect(() => {
    if (imgUrlInptRef.current) imgUrlInptRef.current.value = "";
  }, [toggle])

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

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSettled: () => {
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories']});
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
      setToggle(false);
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't update Image Url, please try again." 
          : "فشل في محاوله تحديث رابط الصوره, الرجاء محاوله مره اخرى."
      , "error");
    }
  });

  const displayAlert = (message: any, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertToggle(Date.now());
  };

  const addIsProcessingNote = () => {
    setAlertToggle(Date.now());
    setAlertType("warning");
    setAlertMessage(isEn ? 'Please wait until the operation is finished' : 'الرجاء الانتظار حتى انتهاء من العمليه');
  }

  const isValidHttpUrl = async (url: string) => {
    try {
      const newUrl = new URL(url);
      console.log('newUrl: ', newUrl);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
  }

  const handleClick = async (e: React.MouseEvent<HTMLElement | SVGElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        if (isLoading) return addIsProcessingNote();
        setToggle(false);
        break;
      case 'save_button_is_clicked':
        if (isLoading) addIsProcessingNote();
        const isValidHTTPUrl = await isValidHttpUrl(imgUrlValue);
        if (!isValidHTTPUrl) return displayAlert(
          isEn 
            ? "Please enter a valid HTTP or HTTPS URL." 
            : "الرجاء تنصيب رابط صحيح."
        , "error");
        if (imgUrlValue && categorySlug) updateCategoryMutation
          .mutate({ slug: categorySlug ,data: { imgUrl: imgUrlValue} });
        break;
        case 'cancel_button_is_clicked':
          if (isLoading) return addIsProcessingNote();
          setToggle(false);
          break;
        case 'past_button_is_clicked':
          const clipBoardText = await navigator.clipboard.readText();
          if (imgUrlInptRef.current) imgUrlInptRef.current.value = clipBoardText;
          setImageUrlValue(clipBoardText);
          break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'imgUrlInpt':
        setImageUrlValue(value);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  // DEBUG & UI
  // console.log('imageUrl: ', imageUrl);
  console.log('imgUrlValue: ', imgUrlValue);

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
                {isEn ? 'Paste' : 'لصق'}
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