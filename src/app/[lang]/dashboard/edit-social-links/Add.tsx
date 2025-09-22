// COMPONENTS
import SocialIcon from '@/components/SocialIcon';

export default function Add () {
  return (
    <section>
      <h2
        className="text-heading text-lg font-bold"
      >
        Add
      </h2>
      <label
        className="flex w-[100px] h-[100px] bg-red-500"
        htmlFor="iconPicker"
      >
        <input 
          className="invisible opacity-0"
          name="iconPicker"
          id="iconPicker"
        />
      </label>
    </section>
  )
}