// COMPONENTS
import Title from '@/app/checkout/checkoutform/Title';

export default function CheckoutForm () {
  return (
    <form className="flex flex-col divide-solid divide-inbetween divide-y-[1px]">
      <section
        className="py-4"
      >
        <Title text="Deliver To" info="Enter the address where you’d like your order to be delivered. Double-check the details to ensure everything is accurate and up-to-date for a smooth delivery experience!" />
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