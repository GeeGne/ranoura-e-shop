export default function StatusMap () {
  return (
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
          <li className="w-[50px] h-[50px] rounded-full bg-yellow-300">1</li>
          <li className="w-[50px] h-[50px] rounded-full bg-yellow-300">2</li>
          <li className="w-[50px] h-[50px] rounded-full bg-yellow-300">3</li>
          <li className="w-[50px] h-[50px] rounded-full bg-yellow-300">4</li>
        </ul>
      </section>
      <section 
        className="absolute top-0 left-0 w-full text-transparent h-[50px] brightness-200"
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
          <li className="w-[50px] h-[50px] rounded-full bg-yellow-300">1</li>
          <li className="w-[50px] h-[50px] rounded-full bg-yellow-300">2</li>
          <li className="w-[50px] h-[50px] rounded-full bg-yellow-300">3</li>
          <li className="w-[50px] h-[50px] rounded-full bg-yellow-300">4</li>
        </ul>
      </section>
    </div>
  )
}