export default function UnderlineStyle ({ ...props }) {
  return (
    <div
      className="
        absolute bottom-[-4px] left-0 w-0 group-hover:w-full h-[2px] 
        bg-heading-invert 
        transition-all ease-in-out duration-200
      "
      {...props}
    />
  )
}