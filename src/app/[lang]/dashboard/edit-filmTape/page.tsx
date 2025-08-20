"use client"

// HOOKS
import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import ErrorLayout from '@/components/ErrorLayout';

// STORES
import { 
  useTabNameStore, useLanguageStore, 
  useAlertMessageStore, useActivityWindowStore
} from '@/stores/index';

// API
import getGeneralSettingsData from '@/lib/api/general-settings/get';
import updateGeneralSettingsData from '@/lib/api/general-settings/id/put';

// ASSETS
const filmTapeImg = "/assets/img/film-tape-hide.avif";

export default function page () {  

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  
  const filmTapeInptRef = useRef<HTMLInputElement>(null);

  const setTabName = useTabNameStore((state: any) => state.setTabName);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const setActivityWindowToggle = useActivityWindowStore(state => state.setToggle);
  const setActivityWindowMessage = useActivityWindowStore(state => state.setMessage);

  useEffect(() => {
    setTabName('edit-filmTape');
  }, []);

  const { data: generalSettingsData, isLoading, isError } = useQuery({
    queryKey: ['general-settings'],
    queryFn: getGeneralSettingsData
  });

  useEffect(() => {
    if (isLoading || isError) return;
    if (filmTapeInptRef.current) filmTapeInptRef.current.checked = generalSettingsData?.data.film_tape;
  }, [generalSettingsData]);

  const useUpdateGeneralSettingsMuation = useMutation({
    mutationFn: updateGeneralSettingsData,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Saving new Changes...' : 'جاري حفظ التغييرات الجديده...')
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['general-settings']});
      setAlertToggle(Date.now());
      setAlertType("success");
      setAlertMessage(data?.message[isEn ? 'en' : 'ar']);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['general-settings']});
      setAlertToggle(Date.now());
      setAlertType("error");
      setAlertMessage(isEn ? "Couldn't save the new changes, please try again." : "فشل في محاوله حفظ التغييرات الجديده, الرجاء محاوله مره اخرى.")
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    const { id } = e.currentTarget.dataset;
    
    switch (name) {
      case 'film_tape':
        if (id) useUpdateGeneralSettingsMuation.mutate({ id, data: { [name]: checked } });
        break;
      default:
        console.error("Unknown name: ", name);
    }
  }

  // DEBUG & UI
  // console.log('generalSettingsData: ', generalSettingsData);

  if (isError) return (
    <ErrorLayout 
      title={isEn ? 'Unable To Load' : 'لم يتم التحميل'}
      description={isEn ? 'Please Refresh the page or try again later' : 'الرجاء اعاده تحميل الصفحه او حاول مره اخرى لاحقا'}
    />
  )

  if (isLoading) return (
    <section
      className="flex flex-col items-center gap-4 bg-background-light p-4 rounded-lg"
    >
      <div
        className="flex flex-row w-full"
      >
        <span
          className="--opacity-blink text-body font-bold text-transparent bg-background-deep-light rounded-lg"
        >
          Show Film Tape
        </span>
        <label
          className={`
            --opacity-blink relative w-10 h-5 
            rounded-full overflow-hidden
            bg-background-deep-light rounded-lg
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
            ref={filmTapeInptRef}
          />
        </label>
      </div>
      <div
        className="--opacity-blink bg-background-deep-light rounded-lg" 
      >
        <img
          className="w-[600px] opacity-0" 
          src={filmTapeImg}
        />
      </div>
    </section>
  )

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
            data-id={generalSettingsData.data.id}
            onChange={handleChange}
            ref={filmTapeInptRef}
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