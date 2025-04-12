const logo = "/assets/img/ranoura-logo.png"
const logo2 = "/assets/img/ranoura-logo(2).png"

export default function LoadingScreen () {
  return (
    <div
      className="
        fixed top-0 left-0 w-full h-full bg-primary z-[2000]
        flex flex-col items-center justify-center gap-4
      "
    >
      <img 
        className="w-[400px]"
        alt="Ranoura Logo"
        src={logo}
      />
      <span
        className="text-heading-invert text-xl"
      >
        Loading
      </span>
    </div>
  )
}