// HOOKS
import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import SocialIcon from '@/components/SocialIcon';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import StashPlusSolid from '@/components/svgs/StashPlusSolid';
import LsiconPasteFilled from '@/components/svgs/LsiconPasteFilled';
import TablerCopy from '@/components/svgs/TablerCopy';
import MaterialSymbolsCheckRounded from '@/components/svgs/MaterialSymbolsCheckRounded';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { useAlertMessageStore } from '@/stores/index';

// API
import addSocialLink from '@/lib/api/social-links/post';

// JSON
import icons from '@/json/icons.json';

type Props = {
  isEn?: boolean;
};

export default function Add ({ isEn = true }: Props) {

  const queryClient = useQueryClient();

  const soicalLinkUrlInptRef = useRef<HTMLInputElement>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ socialLinkData, setSocialLinkData ] = useState<Record<string, any>>({
    platform: { en: "Facebook", ar: "فيسبوك" },
    url: "",
    color: "oklch(70.7% 0.165 254.624)",
    icon: "facebook"
  });

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const displayAlert = (message: any, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertToggle(Date.now());
  };

  const useAddSocialLinkMutation = useMutation({
    mutationFn: addSocialLink,
    onSettled: () => {
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
      queryClient.invalidateQueries({ queryKey: ['social-links']})
    },
    onError: () => {
      displayAlert(
        isEn 
          ? 'Error while adding new Social Link, Please try again later..' 
          : 'حصل خطأ اثناء اضافه رابط جديد, الرجاء المحاوله مره اخرى..', "error");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'url':
        setSocialLinkData({ ...socialLinkData, [name]: value })
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleClick = async (e: React.MouseEvent<SVGElement | HTMLButtonElement>) => {
    const { type, iconName, iconColor, iconPlatformEn, iconPlatformAr } = e.currentTarget.dataset;

    switch (type) {
      case 'icon_button_is_clicked':
        if (
          iconName && iconColor && iconPlatformEn && iconPlatformAr
        ) setSocialLinkData({
          ...socialLinkData, 
          platform: { en: iconPlatformEn, ar: iconPlatformAr },
          icon: iconName, 
          color: iconColor
        });
        break;
      case 'add_button_is_clicked':
        if (isLoading) return;

        const { icon, url } = socialLinkData;
        if (!icon || !url ) return;

        useAddSocialLinkMutation.mutate(socialLinkData);
        break;
        case 'past_button_is_clicked':
          if (isLoading) return;
          const clipBoardText = await navigator.clipboard.readText();
          if (soicalLinkUrlInptRef.current) soicalLinkUrlInptRef.current.value = clipBoardText;
          break;
      default:
        console.error('Unknown Type: ', type);
    }
  };

  // DEBUG & UI
  console.log('add Data :', socialLinkData);

  return (
    <section
    className="flex flex-col gap-4"
    >
      <h2
        className="text-heading text-lg font-semibold"
      >
        {isEn ? 'Add' : 'اضف'}
      </h2>
      <div
        className="flex flex-row gap-8"
      >
        <div
          className="flex items-center gap-2"
        >
          <span className="text-heading">{isEn ? 'Icon' : 'ايقونه'}</span>
          <label
            className={`
              relative flex w-[50px] h-[50px] rounded-lg
              border border-solid border-px border-inbetween
              ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            htmlFor="iconPicker"
          >
            <input 
              className="peer invisible w-0"
              type="checkbox"
              name="iconPicker"
              id="iconPicker"
              disabled={isLoading}
            />
            <SocialIcon
              className="absolute w-full h-full p-2 text-body" 
              style={{color: socialLinkData.color}}
              icon={socialLinkData.icon}
            />
            <ul
              className="
                absolute top-0 peer-checked:top-[calc(100%+0.5rem)] left-0
                w-full max-h-[224px] shadow-md
                flex flex-col items-center py-1 rounded-lg bg-white
                overflow-y-scroll overflow-x-hidden
                invisible peer-checked:visible opacity-0 peer-checked:opacity-100 
                transition-all duration-200 ease-in-out
              "
            >
              {icons.map((itm, i) =>
                <li
                  key={i}
                >
                  <SocialIcon
                    className="
                      w-[38px] h-[38px] p-1 rounded-lg
                      text-body hover:bg-background
                      transition-all duration-200 ease-in-out
                    " 
                    style={{color: itm.color}}
                    icon={itm.icon}
                    role="button"
                    data-type="icon_button_is_clicked"
                    data-icon-name={itm.icon}
                    data-icon-color={itm.color}
                    data-icon-platform-en={itm.platform.en}
                    data-icon-platform-ar={itm.platform.ar}
                    onClick={handleClick}
                  />        
                </li>

              )}
            </ul>
          </label>
        </div>
        <label
          className="flex flex-row flex-1 items-center gap-2"
          htmlFor="url"
        >
          <span className="text-heading">{isEn ? 'Social URL' : 'الرابط الاجتماعي'}</span>
          <div
            className="relative grow max-w-[600px]"
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
              className={`
                bg-background-light w-full h-12 text-body font-bold rounded-lg p-2
                border border-solid border-px border-transparent focus:border-inbetween outline-none
                transition-all duration-200 ease-in-out
                ${isLoading ? 'cursor-not-allowed' : 'cursor-auto'}
              `}
              placeholder="Example: https://www.facebook.com/your-profile-name"
              type="text"
              id="socialLinkUrl"
              name="url"
              disabled={isLoading}
              onChange={handleChange}
              ref={soicalLinkUrlInptRef}
            />
          </div>
        </label>
        <button
          className={`
            relative flex items-center grow-0 px-2 gap-2 bg-primary rounded-lg ml-auto
            hover:opacity-80 active:opacity-60
            transition-all duration-200 ease-in-out
            ${isLoading ? 'cursor-progress' : 'cursor-pointer'}
          `}
          data-type="add_button_is_clicked"
          onClick={handleClick}
        >
          {isLoading && 
            <SvgSpinnersRingResize 
              className="
                absolute top-1/2 left-1/2 
                translate-x-[-50%] translate-y-[-50%] 
                text-heading-invert
              "
            />
          }
          <StashPlusSolid 
            className={`
              w-5 h-5 border border-solid border-[2px] rounded-full
              ${isLoading ? 'text-transparent border-transparent' : 'text-heading-invert border-heading-invert'}
            `}
          />
          <span 
            className={`
              font-bold ${isLoading ? 'text-transparent' : 'text-heading-invert'}
            `}
          >
            {isEn ? 'ADD' : 'اضف'}
          </span>
        </button>
      </div>
    </section>
  )
}