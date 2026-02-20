import LineMdConfirmCircleFilled from '@/components/svgs/LineMdConfirmCircleFilled';

export default function StatusMap () {
  const status = "confirmed";
  
  if (status === "confirmed") return (
    <div className="relative">
      <section 
        className="relative w-full bg-transparent text-transparent h-[50px]"
      >
        f
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] left-0 w-[calc(100%-1rem)] h-2 bg-green-500
          "
        />
        <ul className="
            absolute top-0 left-0 w-full h-full
            flex justify-between items-center
          "
        >
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            1
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            2
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            3
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            4
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
        </ul>
      </section>
      <section 
        className="
          --status-mask-ani absolute top-0 left-0 w-full text-transparent h-[50px] brightness-[150%]
        "
      >
        f
        <div 
          className="
            absolute top-1/2 translate-y-[-50%] left-0 w-[calc(100%-1rem)] h-2 bg-green-500
          "
        />
        <ul className="
            absolute top-0 left-0 w-full h-full
            flex justify-between items-center
          "
        >
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            1
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            2
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            3
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
          <li className="relative w-[50px] h-[50px] rounded-full bg-[#27AE60]">
            4
            <LineMdConfirmCircleFilled 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-12 h-12 text-background" 
            />
          </li>
        </ul>
      </section>
    </div>
  )
}