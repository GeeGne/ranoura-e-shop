// COMPONENTS
import ImageSlider from '@/components/home/ImageSlider';

export default function ImageSliderPreview() {
  return (
    <div
      className="
        p-4 bg-white rounded-lg
      "
    >
      <h2 className="font-bold font-">Preview</h2>
      <ImageSlider />
    </div>
  )
}