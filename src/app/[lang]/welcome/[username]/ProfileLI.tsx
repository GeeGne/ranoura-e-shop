// HOOKS
import Link from 'next/link';

// COMPONENTS
import LineMdTextBoxToTextBoxMultipleTransition from '@/components/svgs/LineMdTextBoxToTextBoxMultipleTransition';
import LineMdMapMarkerLoop from '@/components/svgs/LineMdMapMarkerLoop';
import WarningSvg from '@/components/svgs/WarningSvg';

//  STORES
import { useLanguageStore } from '@/stores/index';

type Props = {
  category?: string;
  user: UserProps;
  isLoading?: boolean;
  isError?: boolean;
} & React.ComponentPropsWithRef<"li">;

type UserProps = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: addressProps;
  role: roleProps;
};

type addressProps = {
  address_details?: string;
  second_address?: string;
  notes?: string;
};

type roleProps = {
  name?: string;
  description?: string;
};

export default function ProfileLI ({ user, isLoading = false, isError = false, ...props }: Props) {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  
  if (isLoading) return (
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
            className="--opacity-blink bg-background-deep-light flex flex-col rounded-lg w-[300px]"
          >
            <span className="text-md text-body font-bold opacity-0">{isEn ? 'Name' : 'الاسم'}</span>
            <span className="text-md text-heading opacity-0">any</span>
          </li>
          <li
            className="--opacity-blink bg-background-deep-light flex flex-col rounded-lg w-[300px]"
          >
            <span className="text-md text-body font-bold opacity-0">{isEn ? 'Last Name' : 'اللقب'}</span>
            <span className="text-md text-heading opacity-0">any</span>
          </li>
          <li
            className="--opacity-blink bg-background-deep-light flex flex-col rounded-lg w-[300px]"
          >
            <span className="text-md text-body font-bold opacity-0">{isEn ? 'Email' : 'الايميل'}</span>
            <span className="text-md text-heading opacity-0">any</span>
          </li>
          <li
            className="--opacity-blink bg-background-deep-light flex flex-col rounded-lg w-[300px]"
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
        <div className="--opacity-blink flex items-center gap-2 w-[10rem] bg-background-deep-light rounded-lg">
          <LineMdMapMarkerLoop 
            className="text-heading opacity-0"
          />
          <h3
            className="text-lg text-heading font-bold opacity-0"
          >
            LOCATION
          </h3>
        </div>
        <ul
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          <li
            className="--opacity-blink bg-background-deep-light flex flex-col rounded-lg w-[300px]"
          >
            <span className="text-md text-body font-bold opacity-0">any</span>
            <span className="text-md text-heading opacity-0">any</span>
          </li>
          <li
            className="--opacity-blink bg-background-deep-light flex flex-col rounded-lg w-[300px]"
          >
            <span className="text-md text-body font-bold opacity-0">any</span>
            <span className="text-md text-heading opacity-0">any</span>
          </li>
        </ul>
      </li>
    </>
  )

  if (isError) return(
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-12 py-4 bg-background rounded-lg"
    >
      <WarningSvg 
        className="col-span-1 text-content w-[300px] h-[300px]"
      />
      <ul
        className="col-span-1 list-disc text-lg text-heading font-bold md:my-auto"
      >
        {isEn 
          ? 'Connection failed, Try:' 
          : 'فشل في محاوله الاتصال, جرب:'
        }
        <li
          className="text-base text-body"
        >
          {isEn
            ? 'Refreshing the page'
            : 'اعاده تحميل الصفحه'
          }
        </li>
        <li
          className="text-base text-body"
        >
          {isEn
            ? 'Checking your internet'
            : 'تفحص اتصالك بلانترنت'
          }
        </li>
        <li
          className="text-base text-body"
        >
          {isEn
            ? 'Restarting your browser'
            : 'اعاده تشغيل المتصفح'
          }
        </li>
      </ul>
      <div
        className="border-style flex gap-2 md:col-span-2 md:mx-auto bg-content-invert py-4 px-16"
      >
        <span className="text-body font-bold">
          {isEn 
            ? 'If the problem continues,'
            : 'اذا المشكله مازالت,'
          }
        </span>
        <Link 
          href="google.com"
          className="text-heading font-bold underline"
        >
          {isEn 
            ? 'Please contact support.'
            : 'الرجاء التوصل مع الدعم.'
          }
        </Link>
      </div>
      <h3 className="md:col-span-2 md:mx-auto text-body font-bold">
        <span>

        </span>
      </h3>
    </div>
  )

  const { first_name, last_name, email, phone_number, address }: UserProps = user;

  // DEBUG & UI
  // console.log('user: ', user);

  return (
    <>
      <li
        className="flex flex-col gap-4 w-full p-4 max-w-[1400px] mx-auto bg-background rounded-lg"
        { ...props }
      >
        <div className="flex items-center gap-2">
          <LineMdTextBoxToTextBoxMultipleTransition 
            className="text-heading"
          />
          <h3
            className="text-lg text-heading font-bold"
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
            <span className="text-md text-body font-bold">{isEn ? 'Name' : 'الاسم'}</span>
            <span className="text-md text-heading">{first_name}</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">{isEn ? 'Last Name' : 'اللقب'}</span>
            <span className="text-md text-heading">{last_name}</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">{isEn ? 'Email' : 'الايميل'}</span>
            <span className="text-md text-heading">{email}</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">{isEn ? 'Phone Number' : 'رقم الهاتف'}</span>
            <span className="text-md text-heading">{phone_number}</span>
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
            <span className="text-md text-body font-bold">{isEn ? 'Address' : 'العنوان'}</span>
            <span className="text-md text-heading">{address?.address_details}</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">{isEn ? 'Second Address' : 'العنوان الثاني'}</span>
            <span className="text-md text-heading">{address?.second_address}</span>
          </li>
          <li
            className="flex flex-col"
          >
            <span className="text-md text-body font-bold">{isEn ? 'Notes' : 'ملاحظات'}</span>
            <span className="text-md text-heading">{address?.notes}</span>
          </li>
        </ul>
      </li>
    </>
  )
}