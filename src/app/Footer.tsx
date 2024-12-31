// COMPONENTS
import FooterList from '@/components/FooterList';
import Facebook from '@/components/svgs/Facebook';
import Instagram from '@/components/svgs/Instagram';
import Telegram from '@/components/svgs/Telegram';

export default function Footer ({ ...props }) {
  return (
    <footer 
      className="
        relative flex flex-col gap-4 p-4 
      "
      {...props}
    >
      <section
        className="
          grid grid-cols-1 lg:grid-cols-4 lg:gap-4
        "
    >
        <div
          className="flex flex-col gap-2 w-full max-w-[600px] lg:max-w-[300px] mx-auto"
        >
          <span
            className="text-heading-invert text-2xl text-bold"
          >
            RANOURA
          </span>
          <span
            className="text-md text-body-invert"
          >
            I am not arrogant. I know my limitations, but I also believe in my abilities. When we are united and work sincerely, we can overcome difficulties. Cooperation and mutual understanding bring light to our path. Life is a continuous journey of learning and improvement. Together, we can achieve great things and leave a meaningful impact.
          </span>
          <div>
            <input 
              className="
                p-2 bg-primary font-bold text-heading-invert border-solid border-[2px] focus:border-[2px] border-heading-invert focus:border-heading-invert outline-none
                placeholder:font-bold placeholder:text-heading-invert 

              "
              placeholder="Enter your email"
            />
            <button
              className="p-2 bg-heading-invert font-bold text-heading border-solid border-[2px] border-heading-invert"
            >
              Subscribe
            </button>
          </div><hr className="border-2 border-body-invert my-4 lg:hidden" />
        </div>
        <FooterList 
          title={'COSTUMER SERVICE'} 
          content={['Privacy Policy', 'Returns & Refunds', 'Delivery and Shipment']} 
        />
        <FooterList 
          title={'ABOUT US'} 
          content={['About Us', 'FAQs']} 
        />
        <FooterList 
          title={'CONTACT US'} 
          content={['Phone: 01132523', 'Email: 34534']} 
        />
      </section>
      <section
        className="flex flex-col items-center gap-4"
      ><hr className="w-full border-body-light-invert  " />
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
            className="text-body-light text-sm"
          >
            Syria © 2025 RANOURA all rights reserved
          </span>
        </div>
      </section>
    </footer>
  )
}