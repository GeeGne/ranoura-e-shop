// HOOKS
import { useState } from 'react';

// COMPONENTS
import SocialIcon from '@/components/SocialIcon';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import StashPlusSolid from '@/components/svgs/StashPlusSolid';

// JSON
import icons from '@/json/icons.json';

export default function Add () {

  const [ selectedIcon, setSelectedIcon ] = useState<Record<string, any>>({
    name: "facebook",
    platform: {en: "Facebook", ar: "فيسبوك"},
    color: "oklch(70.7% 0.165 254.624)"
  });
  const [ url, setUrl ] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'socialLinkUrl':
        setUrl(value);
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  const handleClick = (e: React.MouseEvent<SVGElement | HTMLButtonElement>) => {
    const { type, iconName, iconColor, iconPlatformEn, iconPlatformAr } = e.currentTarget.dataset;

    switch (type) {
      case 'icon_button_is_clicked':
        if (
          iconName && iconColor && iconPlatformEn && iconPlatformAr
        ) setSelectedIcon({
          name: iconName, color: iconColor, platform: { en: iconPlatformEn, ar: iconPlatformAr }
        });
        break;
      case 'add_button_is_clicked':

        break;
      default:
        console.error('Unknown Type: ', type);
    }
  };

  return (
    <section
    className="flex flex-col gap-4"
    >
      <h2
        className="text-heading text-lg font-bold"
      >
        Add
      </h2>
      <div
        className="flex flex-row gap-8"
      >
        <div
          className="flex items-center gap-2"
        >
          <span className="text-heading">Icon</span>
          <label
            className="
              relative flex w-[50px] h-[50px] rounded-lg
              border border-solid border-px border-inbetween cursor-pointer
            "
            htmlFor="iconPicker"
          >
            <input 
              className="peer invisible w-0"
              type="checkbox"
              name="iconPicker"
              id="iconPicker"
            />
            <SocialIcon
              className="absolute w-full h-full p-2 text-body" 
              style={{color: selectedIcon.color}}
              icon={selectedIcon.name}
            />
            <ul
              className="
                absolute top-[calc(100%+0.5rem)] left-0
                w-full max-h-[224px]
                flex flex-col items-center py-1 rounded-lg bg-background-light
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
                      text-body hover:bg-background-deep-light
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
          className="flex flex-row items-center gap-2"
          htmlFor="socialLinkUrl"
        >
          <span className="text-heading">Social URL</span>
          <input
            className="
              bg-background-light h-12 text-body font-bold rounded-lg p-2
              border border-solid border-px border-transparent focus:border-inbetween outline-none
              transition-all duration-200 ease-in-out
            "
            type="text"
            id="socialLinkUrl"
            name="socialLinkUrl"
            onChange={handleChange}
          />
        </label>
        <button
          className="
            flex items-center grow-0 px-2 gap-2 bg-primary rounded-lg ml-auto
            hover:opacity-80 active:opacity-60
            transition-all duration-200 ease-in-out
          "
          data-type="add_button_is_clicked"
          onClick={handleClick}
        >
          <StashPlusSolid 
            className="
              text-heading-invert w-5 h-5
              border border-solid border-[2px] border-heading-invert rounded-full
            "
          />
          <span className="text-heading-invert font-bold">ADD</span>
        </button>
      </div>
    </section>
  )
}