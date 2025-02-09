// COMPONENTS
import LayeredStepsHaikeiMd from "@/components/svgs/layered_shapes/LayeredStepsHaikeiMd";
import Card from "@/components/AccountBenefitsSection/Card";
import UndrawPrivateData from "@/components/svgs/UndrawPrivateData";

type Props = {
  className?: string;
}

export default function AccountBenefitsSection ({ className, ...props }: Props) {
  return (
    <section
      className={`
        flex flex-col gap-8
        ${className}
      `}
      { ...props }
    >
      <h2
        className={`
          text-heading text-center font-bold text-2xl
        `}
      >
        Why Making New Account?
      </h2>
      <UndrawPrivateData 
        className="w-[300px] h-auto mx-auto"
      />
      <ul
        className="
          relative flex flex-col gap-8
          before:content-[''] before:absolute before:bottom-12 before:left-1/2 
          before:translate-x-[-50%] before:w-[0.5px] before:h-[100%] before:bg-body-extra-light
          after:content-[''] after:absolute after:top-[-56px] after:left-1/2 
          after:translate-x-[-50%] after:w-4 after:h-4 after:bg-body-extra-light after:rounded-full
        "
      >
        <Card />
        <Card />
        <Card />
        <Card />
      </ul>
    </section>
  )
}