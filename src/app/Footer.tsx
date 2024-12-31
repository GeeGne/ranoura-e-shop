export default function Footer ({ ...props }) {
  return (
    <footer 
      className="
        relative p-4 gap-4
        grid grid-cols-1 md:grid-cols-2
      "
      {...props}
    >
      <div
        className="flex flex-col gap-2 w-[400px] mx-auto"
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
        </div><hr className="border-2 border-body-invert my-2" />
      </div>
      <div
        className="flex flex-col gap-4 w-[400px] mx-auto"
      >
        <span
          className="text-heading-invert text-xl text-bold"
        >
          COSTUMER SERVICE
        </span>
        <ul
          className="flex flex-col gap-2 text-body-invert"
        >
          <li>
            Privary Policy
          </li>
          <li>
            Return & Refunds
          </li>
          <li>
            Delivery Information and Shipment
          </li>
        </ul><hr className="border-2 border-body-invert my-2" />
      </div>
      <div
        className="flex flex-col gap-4 w-[400px] mx-auto"
      >
        <span
          className="text-heading-invert text-xl text-bold"
        >
          ABOUT US
        </span>
        <ul
          className="flex flex-col gap-2 text-body-invert"
        >
          <li>
            About Us
          </li>
          <li>
            FAQs
          </li>
          <li>
            Delivery Information and Shipment
          </li>
        </ul><hr className="border-2 border-body-invert my-2" />
      </div>
      <div
        className="flex flex-col gap-4 w-[400px] mx-auto"
      >
        <span
          className="text-heading-invert text-xl text-bold"
        >
          CONTACT US
        </span>
        <ul
          className="flex flex-col gap-2 text-body-invert"
        >
          <li>
            Phone: 0112339023
          </li>
          <li>
            email: email@email.com
          </li>
        </ul><hr className="border-2 border-body-invert" />
      </div>
      <div
        className="flex flex-col gap-4 w-[400px] mx-auto"
      >
        <span
          className="text-heading-invert text-xl text-bold"
        >
          SOCIAL LINKS
        </span>
        <ul
          className="flex flex-col gap-2 text-body-invert"
        >
          <li>
            Phone: 0112339023
          </li>
          <li>
            email: email@email.com
          </li>
        </ul><hr className="border-2 border-body-invert my-2" />
      </div>
    </footer>
  )
}