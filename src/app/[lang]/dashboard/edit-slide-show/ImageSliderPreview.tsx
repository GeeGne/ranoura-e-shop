// COMPONENTS
import ImageSlider from '@/components/home/imageSlider/index';

type Props = {
  lang?: string;
  isEn?: boolean;
}

export default function ImageSliderPreview({ lang, isEn }: Props) {
  return (
    <div
      id="previewSlideShow"
      className="
        flex flex-col p-4 bg-white rounded-lg gap-4
      "
    >
      <h2 className="font-semibold text-lg">{isEn ? 'Preview' : 'معاينه'}</h2>
      <ImageSlider />
    </div>
  )
}