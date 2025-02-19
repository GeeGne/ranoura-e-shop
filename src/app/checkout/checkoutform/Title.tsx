import LineMdAlertCircleLoop from '@/components/svgs/activity/LineMdAlertCircleLoop';
import LineMdAlertCircleTwotoneLoop from '@/components/svgs/activity/LineMdAlertCircleTwotoneLoop';

type Props = {
  text?: string;
  info?: string;
  className?: string;
}

export default function Title ({ text, info, className, ...props }: Props) {
  return (
    <div
      className={`flex items-center justify-between ${className}`}
      { ...props }
    >
      <h2 className="text-3xl text-body font-light">
        {text}
      </h2>
      <div
        className="relative"
      >
        <LineMdAlertCircleLoop className="peer text-body w-6 h-6 rotate-180" />
        <div
          className="
            absolute grow-1 bottom-[calc(100%+0.5rem)] right-1/2 w-[150px] md:w-[200px] max-w-[150px] md:max-w-[200px]  
            bg-[hsla(0,0%,20%,0.9)] rounded-t-md rounded-bl-md
            invisible opacity-0 peer-hover:visible peer-hover:opacity-100
            transition-300 duration-200 ease-in-out
          "
        >
          <h4
            className="p-2 text-pretty text-body-invert text-xs md:text-sm font-bold"
          >
            {info}
          </h4>
          <div
            className="
            absolute top-full right-0 w-2 h-2 
            triangle-clip-path bg-[hsla(0,0%,20%,0.9)] z-[5]"
          />
        </div>
      </div>
    </div>
  )
}