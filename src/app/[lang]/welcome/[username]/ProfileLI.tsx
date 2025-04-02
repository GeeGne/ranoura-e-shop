// COMPONENTS
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';
import LineMdMapMarkerLoop from '@/components/svgs/LineMdMapMarkerLoop';

//  STORES
import { useLanguageStore } from '@/stores/index';

type Props = {
  category?: string;
  user?: any[];
} & React.ComponentPropsWithRef<"li">;

export default function ProfileLI ({ category, user, ...props }: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const categoryUnitsArray = user?.filter((itm: any) => itm.category === category);
  
  return (
    <li
      className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
      { ...props }
    >
      <div className="flex items-center gap-2">
        {category === 'personal' &&
          <LineMdTextBoxToTextBoxMultipleTransition 
            className="text-heading"
          />
        }
        {category === 'location' &&
          <LineMdMapMarkerLoop 
            className="text-heading"
          />
        }
        <h3
          className="text-lg text-heading font-bold"
        >
          {category?.toUpperCase() || 'LOADING'}
        </h3>
      </div>
      <ul
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
      >
        {categoryUnitsArray?.map((category: any, i) => 
          <li
            className="flex flex-col"
            key={i}
          >
            <span className="text-md text-body font-bold">{category.name[lang]}</span>
            <span className="text-md text-heading">{category.info}</span>
          </li>
        )}
      </ul>
    </li>     
  )
}