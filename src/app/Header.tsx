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
        relative sticky top-0 flex flex-row items-center gap-4 bg-foreground  px-4 py-4
        before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%]
        before:w-full before:h-full before:z-[-1]
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
