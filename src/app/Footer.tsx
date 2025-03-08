// COMPONENTS
import FooterList from '@/components/FooterList';
import Facebook from '@/components/svgs/Facebook';
import Instagram from '@/components/svgs/Instagram';
import Telegram from '@/components/svgs/Telegram';
import Phone from '@/components/svgs/Phone';
import Email from '@/components/svgs/Email';
import BtnA from '@/components/BtnA';

// STORES
import { useAlertMessageStore } from '@/stores/index';

// ASSETS
const logo = '/assets/img/ranoura-logo(2).png';
const background = '/public/assets/img/background(2).jpg';

export default function Footer ({ ...props }) {

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const handleClick = (e: any) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'subscribe_button_is_clicked':
        setAlertToggle(Date.now());
        setAlertType("warning");
        setAlertMessage("Sorry! We're currently working on this feature.");
        break;
      default:
        console.error('Unknown type: ', type);
    }
  };

  return (
    <footer 
      className="
        relative flex flex-col gap-4 p-4 bg-primary
        before:content-[''] before:absolute before:top-0 before:left-1/2
        before:translate-x-[-50%] before:w-screen before:h-full before:bg-primary before:z-[-1]
      "
      {...props}
    >
      <section
        className="
          grid grid-cols-1 lg:grid-cols-5 lg:gap-4
        "
      >
        <div
          className="hidden lg:inline lg:col-span-5 relative w-full [mask-image:linear-gradient(to_top,transparent_10%,black_50%)] overflow-hidden"
        >
          <img 
            src={logo}
            alt="Ranoura Logo"
            className="opacity-100 w-full h-auto object-fit object-center [mask-image:linear-gradient(to_top,transparent_10%,black_20%)]"
          />
          <div
            className="opacity-0 absolute w-full h-full inset-0 bg-cover overflow-hidden"
            style={{
              backgroundImage: `url('/assets/img/background(9).jpg')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              maskImage: `url('/assets/img/ranoura-logo(2).png')`,
              WebkitMaskImage: `url('/assets/img/ranoura-logo(2).png')`,
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
              maskSize: 'cover'
            }}
          />
        </div>
        <div
          className="lg:col-span-2 flex flex-col gap-2 shirnk-0 w-full max-w-[600px] lg:max-w-auto mx-auto pb-4"
        >
          <div
            className="inline lg:hidden relative w-full [mask-image:linear-gradient(to_top,transparent_10%,black_30%)] overflow-hidden"
          >
            <img 
              src={logo}
              alt="Ranoura Logo"
              className="opacity-100 w-full h-auto object-fit object-center [mask-image:linear-gradient(to_top,transparent_10%,black_30%)]"
            />
            <div
              className="opacity-0 absolute w-full h-full inset-0 bg-cover overflow-hidden"
              style={{
                backgroundImage: `url('/assets/img/background(9).jpg')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                maskImage: `url('/assets/img/ranoura-logo(2).png')`,
                WebkitMaskImage: `url('/assets/img/ranoura-logo(2).png')`,
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
                maskSize: 'cover',
              }}
            />
          </div>
          <span
            className="text-base text-body-invert"
          >
            I am not arrogant. I know my limitations, but I also believe in my abilities. When we are united and work sincerely, we can overcome difficulties. Cooperation and mutual understanding bring light to our path. Life is a continuous journey of learning and improvement. Together, we can achieve great things and leave a meaningful impact.
          </span>
          <div className="flex shirnk-0">
            <input 
              className="
                p-2 bg-primary font-bold text-heading-invert border-solid border-[2px] focus:border-[2px] border-heading-invert focus:border-heading-invert outline-none
                placeholder:font-bold placeholder:text-heading-invert 

              "
              placeholder="Enter your email"
            />
            <BtnA
              className="p-2 bg-heading-invert font-bold text-heading border-solid border-[2px] border-heading-invert"
              data-type="subscribe_button_is_clicked"
              onClick={handleClick}
            >
              SUBSCRIBE
            </BtnA>
          </div>
        </div>
        <FooterList 
          index={0}
          title={'COSTUMER SERVICE'} 
          content={['Privacy Policy', 'Returns & Refunds', 'Delivery and Shipment']} 
        />
        <FooterList 
          index={1}
          title={'ABOUT US'} 
          content={['About Us', 'FAQs']} 
        />
        <FooterList 
          index={2}
          title={'CONTACT US'} 
          content={[
            <div key="1" className="flex gap-2"><Phone />+9639302942</div>, 
            <div key="2" className="flex gap-2"><Email />support@ranoura.com</div> 
          ]} 
        />
      </section>
      <section
        className="flex flex-col items-center gap-4"
      ><hr className="w-full border-body-light-invert" />
        <div
          className="flex flex-col gap-2 items-center"
        >
          <span
            className="text-heading-invert text-xl text-bold"
          >
            SOCIAL LINKS
          </span>
          <ul
            className="flex flex-row gap-2 text-body-invert"
          >
            <li>
              <Facebook 
                className="
                  text-body-invert hover:text-blue-400 hover:scale-125 cursor-pointer
                  transition-all ease-in-out duration-300
                "
              />
            </li>
            <li>
              <Instagram 
                className="
                  text-body-invert hover:text-fuchsia-400 hover:scale-125 cursor-pointer
                  transition-all ease-in-out duration-300
                "
              />
            </li>
            <li>
              <Telegram
                className="
                  text-body-invert hover:text-cyan-400 hover:scale-125 cursor-pointer
                  transition-all ease-in-out duration-300
                "
              />
            </li>
          </ul>
        </div>
        <div>
          <span
            className="text-body-light-invert text-sm"
          >
            Syria © 2025 RANOURA all rights reserved
          </span>
        </div>
      </section>
    </footer>
  )
}