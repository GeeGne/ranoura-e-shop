export default function NavTile () {
  return (
    <nav
      className="
        flex flex-row divide-inbetween py-4
        divide-x-[1px] border-solid border-inbetween border-b-[1px]
      "
    >
      <div
        className="
          flex flex-1 justify-center text-md text-heading hover:text-heading font-bold
          user-nav-selected
        "
      >
        Personal Data    
      </div>
      <div
        className="
          flex flex-1 justify-center text-md text-body hover:text-heading font-bold
          user-nav-selected
        "
      >
        Orders    
      </div>
      <div
        className="
          flex flex-1 justify-center text-md text-body hover:text-heading font-bold
          user-nav-selected
        "
      >
        Sign out    
      </div>
    </nav>
  )
}