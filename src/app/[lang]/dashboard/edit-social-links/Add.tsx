// HOOKS
import { useState } from 'react';

// COMPONENTS
import SocialIcon from '@/components/SocialIcon';

// JSON
import icons from '@/json/icons.json';

export default function Add () {

  const [ selectedIcon, setSelectedIcon ] = useState<string>('facebook');

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    const { type, iconName } = e.currentTarget.dataset;

    switch (type) {
      case 'icon_button_is_clicked':
        console.log('click');
        if (iconName) setSelectedIcon(iconName);
        break;
      default:
        console.error('Unknown Type: ', type);
    }
  }

  return (
    <section
      className="flex flex-col"
    >
      <h2
        className="text-heading text-lg font-bold"
      >
        Add
      </h2>
      <div
        className="flex flex-row gap-4"
      >
        <div
          className="flex items-center gap-2"
        >
          <span className="text-heading">Select Icon</span>
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
              icon={selectedIcon}
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
              {icons.map((name, i) =>
                <li
                  key={i}
                >
                  <SocialIcon
                    className="
                      w-[38px] h-[38px] p-1 rounded-lg
                      text-body hover:bg-background-deep-light
                      transition-all duration-200 ease-in-out
                    " 
                    icon={name}
                    role="button"
                    data-type="icon_button_is_clicked"
                    data-icon-name={name}
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
          <span className="text-heading">url</span>
          <input
            className="bg-background-light h-12 text-body font-bold rounded-lg p-2"
            type="text"
            id="socialLinkUrl"
            name="socialLinkUrl"
          />
        </label>
      </div>
    </section>
  )
}