// COMPONENTS
import Title from '@/app/checkout/checkoutform/Title';

export default function CheckoutForm () {
  return (
    <form className="flex flex-col divide-solid divide-inbetween divide-y-[1px]">
      <section
        className="py-4 flex flex-col gap-4"
      >
        <Title text="Deliver To" info="Enter the address where you’d like your order to be delivered. Double-check the details to ensure everything is accurate and up-to-date for a smooth delivery experience!" />
        <div
          className="relative"
        >
          <input 
            type="text"
            readOnly
            value="Damascus"
            className="
              peer w-full p-2 bg-transparent
              border-solid border-inbetween focus:border-primary border-[2px] focus:border-[2px] rounded-lg
              text-heading
              transition-all duration-200 ease-in-out
            "
          />
          <ul
            className="
              absolute hidden peer-focus:flex flex-col 
              top-full left-0 w-full px-1 py-1
              bg-background text-body drop-shadow-md rounded-md  z-[5]"
          >
            <li
              className="
                py-1 px-2 hover:bg-content-invert hover:text-content hover:font-bold
                rounded-md
                transition-all duration-200 ease-in-out
              "
              role="button"
            >
              this
            </li>
            <li
              className="
                py-1 px-2 hover:bg-content-invert hover:text-content font-bold
                rounded-md
                transition-all duration-200 ease-in-out
              "
              role="button"
            >
              is
            </li>
            <li
              className="
                py-1 px-2 hover:bg-content-invert hover:text-content font-bold
                rounded-md
                transition-all duration-200 ease-in-out
              "
              role="button"
            >
              text
            </li>
          </ul>
        </div>
        <div className="flex justify-between">
            <h4 className="text-body">Shipping Fee:</h4>
            <span className="text-heading font-bold">200</span>
        </div>
      </section>
      <section
        className="py-4"
      >
        <Title text="Contact Phone Number" info="Please share a phone number where we can contact you about your order. This ensures we can reach you quickly for delivery updates or questions!" />
      </section>
      <section
        className="py-4"
      >
        <Title text="Shipping Address" info="Where should we send your order? Please provide the full address, including any necessary details like apartment numbers or landmarks, to ensure your package arrives safely and on time." />
      </section>
    </form>
  )
}