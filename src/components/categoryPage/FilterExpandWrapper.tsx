import { useState } from 'react';

export default function FilterExpandWrapper () {
  const [ toggle, setToggle ] = useState<boolean>(false);
  
  return (
    <div
      className="flex flex-col p-4"
    >
      <div 
        className="flex justify-between"
        onClick={() => setToggle(val => !val)}
      >
        <h2 
          className={`
            text-md
            transition-all duration-300 ease-in-out
            ${toggle ? 'text-heading font-bold' : 'text-body font-normal'}
          `}
        >
          SECTION
        </h2>
        <div>X</div>
      </div>
    </div>  
  )
}