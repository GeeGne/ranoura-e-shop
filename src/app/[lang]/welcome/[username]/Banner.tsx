const img1 = '/assets/img/background(2).jpg';
const img2 = '/assets/img/background(16).jpg';

export default function Banner () {
  return (
    <section
      className="w-full h-[100px] md:h-[150px]"
    >
      <img 
        src={img2}
        alt="img"
        className="
          w-full h-full object-cover object-center
        "
      />
    </section>
  )
}