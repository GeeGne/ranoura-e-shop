// COMPONENTS
import UndrawPrivateData from "@/components/svgs/UndrawPrivateData";
import Facebook from "@/components/svgs/Facebook";

export default function Card () {
  return (
    <li
      className="
        grid grid-cols-1 content-center items-center gap-4
        md:grid-rows-[auto_auto] md:grid-cols-[auto_auto] 
        border-solid border-body-extra-light border-[1px]
        bg-background p-4 rounded-2xl z-[5]
      "
    >
      <div
        className="flex items-center justify-center w-[100px] h-[100px] mx-auto md:row-span-2"
      >
        <Facebook 
          className="w-12 h-auto"
        
        />
      </div>
      <h3
        className="text-md text-body md:row-span-1 font-bold text-center"
      >
        Save Personal Data for Faster Checkouts
      </h3>
      <h4
        className="text-body text-sm md:row-span-1"
      >
        Skip filling in details every time! Save your name, address, and payment information securely for isntant checkout. Perfect for busy shoppers who waqnt to worder their favorite styles in seconds.
      </h4>
    </li>
  )
}