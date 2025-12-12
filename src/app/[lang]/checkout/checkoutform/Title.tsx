// SVGS
import LineMdAlertCircleLoop from '@/components/svgs/activity/LineMdAlertCircleLoop';
import LineMdAlertCircleTwotoneLoop from '@/components/svgs/activity/LineMdAlertCircleTwotoneLoop';

// STORES
import { useLanguageStore } from '@/stores/index';

type Props = {
  text?: string;
  info?: string;
  className?: string;
  infoEnabled?: boolean;
  isLoading?: boolean
}

export default function Title ({ 
  text, 
  info, 
  infoEnabled = true, 
  className,
  isLoading,
  ...props 
}: Props) {
  
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  if (isLoading) return (
    <div
      className={`--opacity-blink flex items-center justify-between ${className}`}
      { ...props }
    >
      <h2 className="bg-background-light text-3xl text-transparent font-light rounded-md">
        {text}
      </h2>
      {infoEnabled && 
        <div
          className="relative"
        >
          <div className="peer text-transparent w-6 h-6 rotate-180 rounded-full bg-background-light" />
          <div
            className={`
              absolute grow-1 bottom-[calc(100%+0.5rem)] w-[150px] md:w-[200px] max-w-[150px] md:max-w-[200px]  
              bg-[hsla(0,0%,20%,0.9)] rounded-t-md
              invisible opacity-0 peer-hover:visible peer-hover:opacity-100
              transition-300 duration-200 ease-in-out
              ${isEn ? 'right-1/2 rounded-bl-md' : 'left-1/2 rounded-br-md'}
            `}
          >
            <h4
              className="p-2 text-pretty text-transparent bg-background-light rounded-md text-xs md:text-sm font-bold"
            >
              /////////////////////////////////////////////////
            </h4>
            <div
              className={`
                absolute top-full w-2 h-2 
                triangle-clip-path bg-[hsla(0,0%,20%,0.9)] z-[5]
                ${isEn ? 'right-0' : 'left-0 scale-x-[-1]'}
              `}
            />
          </div>
        </div>
      }
    </div>    
  )

  return (
    <div
      className={`flex items-center justify-between ${className}`}
      { ...props }
    >
      <h2 className="text-3xl text-body font-light">
        {text}
      </h2>
      {infoEnabled && 
        <div
          className="relative"
        >
          <LineMdAlertCircleLoop className="peer text-body w-6 h-6 rotate-180" />
          <div
            className={`
              absolute grow-1 bottom-[calc(100%+0.5rem)] w-[150px] md:w-[200px] max-w-[150px] md:max-w-[200px]  
              bg-[hsla(0,0%,20%,0.9)] rounded-t-md
              invisible opacity-0 peer-hover:visible peer-hover:opacity-100
              transition-300 duration-200 ease-in-out
              ${isEn ? 'right-1/2 rounded-bl-md' : 'left-1/2 rounded-br-md'}
            `}
          >
            <h4
              className="p-2 text-pretty text-body-invert text-xs md:text-sm font-bold"
            >
              {info}
            </h4>
            <div
              className={`
                absolute top-full w-2 h-2 
                triangle-clip-path bg-[hsla(0,0%,20%,0.9)] z-[5]
                ${isEn ? 'right-0' : 'left-0 scale-x-[-1]'}
              `}
            />
          </div>
        </div>
      }
    </div>
  )
}