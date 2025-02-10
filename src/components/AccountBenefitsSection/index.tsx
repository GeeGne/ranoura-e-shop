// COMPONENTS
import LayeredStepsHaikeiMd from "@/components/svgs/layered_shapes/LayeredStepsHaikeiMd";
import Card from "@/components/AccountBenefitsSection/Card";
import UndrawPrivateData from "@/components/svgs/UndrawPrivateData";
import OfferSvg from "@/components/svgs/Offer";
import Location from "@/components/svgs/Location";
import Date from "@/components/svgs/Date";
import Notification from "@/components/svgs/Notification";
import CloudStorage from "@/components/svgs/CloudStorage";
import SvgSpinnersPulseRingsMultiple from "@/components/svgs/activity/SvgSpinnersPulseRingsMultiple";

type Props = {
  className?: string;
}

export default function AccountBenefitsSection ({ className, ...props }: Props) {
  return (
    <section
      className={`
        grid md:grid-cols-4 lg:grid-cols-3 gap-8 max-w-[450px] md:max-w-[1100px] mx-auto
        ${className}
      `}
      { ...props }
    >
      <h2
        className={`
          md:col-span-4 lg:col-span-3 text-heading text-center font-bold text-2xl
        `}
      >
        Why Making New Account?
      </h2>
      <UndrawPrivateData 
        className="md:col-span-2 lg:col-span-2 w-[300px] md:w-[400px] lg:w-[500px] h-auto mx-auto text-content"
      />
      <section
        className="
          relative grid grid-cols-1 md:col-span-2 lg:col-span-1 gap-8
          before:content-[''] before:absolute before:bottom-0 before:left-1/2
          before:translate-x-[-50%] before:w-[0.5px] before:h-full before:bg-body-extra-light
          after:content-[''] after:absolute after:md:hidden after:top-[-56px] after:left-1/2
          after:translate-x-[-50%] after:w-4 after:h-4 after:bg-body-extra-light after:rounded-full
        "
      >
        <SvgSpinnersPulseRingsMultiple 
          className="
            absolute md:hidden top-[-68px] left-1/2 
            translate-x-[-50%] w-10 h-10 text-body
          "
        />
        <div
            className="
            absolute md:hidden bottom-full left-1/2
            translate-x-[-50%] w-[0.5px] h-12 bg-body-extra-light
          "      
        />
        <Card 
          svg={<CloudStorage className="w-full h-auto text-content" />}
          title="Save Personal Data for Faster Checkouts"
          description="Skip filling in details every time! Save your name, address, and payment information securely for isntant checkout. Perfect for busy shoppers who waqnt to worder their favorite styles in seconds." 
          className="md:relative"
        >
          <div
            className="
            absolute invisible md:visible top-1/2 right-full
            translate-y-[-50%] w-12 h-[0.5px] bg-body-extra-light
          "      
          />
          <SvgSpinnersPulseRingsMultiple
            className="
            absolute invisible md:visible top-1/2 right-[calc(100%+20px)]
            translate-y-[-50%] w-10 h-10 text-body-extra-light
          "      
          />
          <div
            className="
            absolute invisible md:visible top-1/2 right-[calc(100%+2rem)]
            translate-y-[-50%] w-4 h-4 bg-body-extra-light rounded-full
          "      
          />
        </Card>
        <Card 
          svg={<Location className="w-full h-auto text-content" />}
          title="Order Tracking & History"
          description="track your order real-time form 'Processing' to 'Delivered.' Plus, revisist past pruchases to reorder beloved itmes or share reviews to help others shop confidently."
        />
        <Card 
          svg={<Date className="w-full h-auto text-content" />}
          title="Delivery Date & Updates "
          description="Get live updates via email or SMS so you never miss a delivery. Adjust delivery prefernces or reschedule directly from your account dashboard." 
        />
        <Card 
          svg={<Notification className="w-full h-auto text-content" />}
          title="Restock Alerts"
          description="Love a sold-out item? Enable notifiactions, and well alert you the moment it's back on stock. Never miss out on trending styles again!." 
        />
        <Card 
          svg={<OfferSvg className="w-full h-auto text-content" />}
          title="Exclusive Access to Sales & Early lanuches"
          description="Unlock VIP perks like realy access to seasonal sales, limited-edition collections, and members-only discounts. Your account is your key to curated fashion." 
        />
      </section>
    </section>
  )
}