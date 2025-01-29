// STORES
import { useCartStore, useNavbarStore, useTabNameStore } from '@/stores/index';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";

export default function NavbarLg () {

  const navbarToggle = useNavbarStore((status:any) => status.toggle);
  // const navbarToggle = true;
  const setNavbarToggle = useNavbarStore((status:any) => status.setToggle);
  
  return (
    <>
      <div
        className={`
          absolute top-0 left-1/2 translate-x-[-50%] 
          w-[100vw] h-full bg-background z-[20] 
          transition-all ease-in-out duration-300
          ${navbarToggle ? 'lg:visible opacity-100' : 'lg:invisible opacity-0'}
        `}        
      />
      <div
        className={`
          hidden lg:flex absolute top-full left-1/2 translate-x-[-50%] 
          w-[100vw] bg-background z-[20] p-8 shadow-md rounded-b-[3rem]
          transition-all ease-in-out duration-300
          ${navbarToggle ? 'lg:visible opacity-100' : 'lg:invisible opacity-0'}
        `}
        onMouseEnter={() => setNavbarToggle(true)}
        onMouseLeave={() => setNavbarToggle(false)}
      >
        <div
          className="flex flex-col flex-1 text-heading text-3xl font-bold gap-2"
        >
          <span
            className="text-body-extra-light text-xs"
          >
            CLOTHING
          </span>
          <ul
            className=""
          >
            <li>
              test
            </li>
            <li>
              test1
            </li>
            <li>
              test2
            </li>
            <li>
              test3
            </li>
          </ul>
        </div>
        <img
          className="flex-[2] rounded-lg" 
          src={ramdanBanner}
          alt="Image"
        />
      </div>
    </>

  )
}