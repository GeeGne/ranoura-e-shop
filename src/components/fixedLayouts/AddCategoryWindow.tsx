// HOOKS
import { useState, useReducer } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { useLanguageStore, useAddCategoryWindowStore, useAlertMessageStore } from '@/stores/index';

// API
import addNewSubCategory from '@/lib/api/sub-categories/post';

// UTILS
import createSlug from '@/utils/createSlug';

export default function AddCategoryWindow () {
  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useAddCategoryWindowStore(state => state.toggle);
  const setToggle = useAddCategoryWindowStore(state => state.setToggle);
  const categorySlug = useAddCategoryWindowStore(state => state.categorySlug);

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

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'add_button_is_clicked':
        if (isLoading) addIsProcessingNote();

        const newSubCategoryInfo = {
          name,
          slug: createSlug(name.en),
          type: categorySlug
        }

        console.log('newSubCategoryInfo: ', newSubCategoryInfo);
        addNewSubCategoryMutation.mutate(newSubCategoryInfo);
        break;
      case 'cancel_button_is_clicked':
        if (isLoading) return addIsProcessingNote();
        setToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'enSubCategory':
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
  // console.log('name: ', name);
  // console.log('categorySlug: ', categorySlug);

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
            {isEn ? 'Add new SubCategory' : 'انشئ مجموعه فرعيه جديده'}
          </h2>
        </section>
        <hr className="border-inbetween" />
        <section
          className="flex flex-col gap-4 w-[400px] px-2 py-4 text-body font-bold"
        >
          <label
            className="flex items-center justify-between"
            htmlFor="enSubCategory"
          >
            <h3
              className="text-body"
            >
              {isEn ? 'Title in English' : 'العنوان بل انجليزي'}
            </h3>
            <input 
              className="text-body bg-background-light p-2 rounded-md"
              type="text"
              name="enSubCategory"
              id="enSubCategory"
              onChange={handleChange}
            />
          </label>
          <label
            className="flex gap-2 items-center justify-between"
            htmlFor="arSubCategory"
          >
            <h3
              className="text-body"
            >
              {isEn ? 'Title in Arabic' : 'العنوان بل عربي'}
            </h3>
            <input 
              className="text-body bg-background-light p-2 rounded-md"
              type="text"
              id="arSubCategory"
              name="arSubCategory"
              onChange={handleChange}
            />
          </label>
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
            data-type="add_button_is_clicked"
            onClick={handleClick}
          >
            <span
              className={`
                ${isLoading ? 'text-transparent' : 'text-content'}
                transition-all duration-300 ease-in-out
              `}
            >
              {isEn ? 'Add' : 'اضف'}
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