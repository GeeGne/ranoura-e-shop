// COMPONENTS
import LineMdCloseToMenuAltTransition from '@/components/svgs/LineMdCloseToMenuAltTransition';
import LineMdMenuToCloseAltTransition from '@/components/svgs/LineMdMenuToCloseAltTransition';
import SolarCart4Outline from '@/components/svgs/SolarCart4Outline';
import IconamoonSearchThin from '@/components/svgs/IconamoonSearchThin';
import EpUser from '@/components/svgs/EpUser';

export default function Header ({ ...props }) {
  return (
    <header 
      className="
        sticky top-0 flex flex-row items-center mx-auto gap-4 bg-transparent px-4 py-4 z-[1000]
        before:content-[''] before:absolute before:top-0 before:left-1/2 before:translate-x-[-50%] 
        before:w-[100vw] before:h-full before:bg-transparent before:z-[-1] 
      "
      {...props}
    >
      <LineMdCloseToMenuAltTransition 
        className="text-heading-invert"
        width={24} 
        height={24} 
      />
      <span
        className="text-heading-invert text-2xl text-bold mx-auto"
      >
        RANOURA
      </span>
      <IconamoonSearchThin 
        className="text-heading-invert"
        width={24} 
        height={24} 
      />
      <EpUser 
        className="text-heading-invert"
        width={24} 
        height={24} 
      />
      <SolarCart4Outline 
        className="text-heading-invert"
        width={24} 
        height={24} 
      />
    </header>
  )
}
