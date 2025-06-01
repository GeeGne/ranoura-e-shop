// COMPONENTS
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';
import LineMdMapMarkerLoop from '@/components/svgs/LineMdMapMarkerLoop';

//  STORES
import { useLanguageStore } from '@/stores/index';


export default function ProfileLoading (props: any) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  
  return (
    <>
      <li
        className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
        { ...props }
      >
        <div className="--opacity-blink flex items-center gap-2 w-[10rem] bg-background-deep-light rounded-lg">
          <LineMdTextBoxToTextBoxMultipleTransition 
            className="text-heading opacity-0"
          />
          <h3
            className="text-lg text-heading font-bold opacity-0"
          >
            PERSONAL
          </h3>
        </div>
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold opacity-0">{isEn ? 'Name' : 'الاسم'}</span>
            <span className="text-md text-heading opacity-0">any</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold opacity-0">{isEn ? 'Last Name' : 'اللقب'}</span>
            <span className="text-md text-heading opacity-0">any</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold opacity-0">{isEn ? 'Email' : 'الايميل'}</span>
            <span className="text-md text-heading opacity-0">any</span>
          </li>
        </ul>
      </li>     
      <li
        className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
        { ...props }
      >
        <div className="flex items-center gap-2">
          <LineMdMapMarkerLoop 
            className="text-heading"
          />
          <h3
            className="text-lg text-heading font-bold"
          >
            LOCATION
          </h3>
        </div>
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">any</span>
            <span className="text-md text-heading">any</span>
          </li>
        </ul>
      </li>
    </>
  )
}