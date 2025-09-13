// HOOKS
import Link from 'next/link';


type Props = {
  isEn?: boolean;
};

export default function Guidelines ({ isEn = true }: Props) {
  if (isEn) return (
    <section>
      <h2 className="text-heading font-bold text-lg">
        Guidelines
      </h2>
      <h3 
        className="text-content font-bold py-2"
      >
        Duration
      </h3>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          Keep the total length
          <span className="font-bold"> 5–15 seconds.</span>
        </li>
        <li className="text-body font-regular">
          Shorter videos = smaller size, faster load, better loop experience.
        </li>
        <li className="text-body font-regular">
          Remove unnecessary frames before export.
        </li>
      </ul>
      <h3 
        className="text-content font-bold py-2"
      >
        Video Formats
      </h3>
      <p className="text-sm text-body font-regular">Provide <span className="font-bold">two formats</span> for best browser compatibility:</p>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          <span className="font-bold">WebM (VP9/AV1) </span> 
          best compression and quality for most modern
        </li>
        <li className="text-body font-regular">
          <span className="font-bold">MP4 (H.264) </span> 
          fallback for Safari and older browsers.
        </li>
      </ul>
      <h3 
        className="text-content font-bold py-2"
      >
        Resolution
      </h3>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          <span className="font-bold">1920x1080px (1080p) </span>or 
          <span className="font-bold"> 1280x720px (720p) </span> 
          . Do not upload
          <span className="font-bold"> 4K </span> 
           files.
        </li>
      </ul>
      <h3 
        className="text-content font-bold py-2"
      >
        Framerate
      </h3>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          <span className="font-bold">24fps or 30fps. </span> 
          If your source is 
          <span className="font-bold"> 60fps</span> 
          , please convert it down.

        </li>
        <li className="text-body font-regular">
          <span className="font-bold">Audio: None. </span> 
          Since the video autoplays on mute, the audio track must be removed during export. This significantly reduces file size.
        </li>
      </ul>
      <h3 
        className="text-content font-bold py-2"
      >
        File Size
      </h3>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          Ideal target:  
          <span className="font-bold"> Under 2 MB </span> 
        </li>
        <li className="text-body font-regular">
          Use compression tools:
          <Link 
            className="underline font-bold" 
            href="https://ffmpeg.org/"
            target="_blank"
          >
            <span> FFMPeg</span> (advanced) 
          </Link>
          or
          <Link 
            className="underline font-bold" 
            href="https://handbrake.fr/"
            target="_blank"
          >
            <span> HandBrake</span> (easy)
          </Link>.
        </li>
      </ul>
    </section>
  )

  return (
    <section>
      <h2 className="text-heading font-bold text-lg">
        إرشادات
      </h2>

      <h3 className="text-content font-bold py-2">
        مدة الفيديو
      </h3>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          اجعل المدة الإجمالية
          <span className="font-bold"> 5–15 ثانية.</span>
        </li>
        <li className="text-body font-regular">
          الفيديوهات الأقصر = حجم أصغر، تحميل أسرع، وتجربة تكرار أفضل.
        </li>
        <li className="text-body font-regular">
          احذف الإطارات غير الضرورية قبل التصدير.
        </li>
      </ul>
      <h3 className="text-content font-bold py-2">
        صيغ الفيديو
      </h3>
      <p className="text-sm text-body font-regular">
        وفر <span className="font-bold">صيغتين</span> لضمان التوافق مع أغلب المتصفحات:
      </p>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          <span className="font-bold">WebM (VP9/AV1) </span>
          أفضل ضغط وجودة لمعظم المتصفحات الحديثة.
        </li>
        <li className="text-body font-regular">
          <span className="font-bold">MP4 (H.264) </span>
          كخيار احتياطي لمتصفح Safari والمتصفحات القديمة.
        </li>
      </ul>

      <h3 className="text-content font-bold py-2">
        الدقة
      </h3>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          <span className="font-bold">1920x1080px (1080p)</span> أو
          <span className="font-bold"> 1280x720px (720p) </span>
          . لا تقم برفع ملفات
          <span className="font-bold"> 4K </span>.
        </li>
      </ul>

      <h3 className="text-content font-bold py-2">
        معدل الإطارات
      </h3>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          <span className="font-bold">24fps أو 30fps. </span>
          إذا كان المصدر
          <span className="font-bold"> 60fps</span>،
          يرجى تحويله للأسفل.
        </li>
        <li className="text-body font-regular">
          <span className="font-bold">الصوت: بدون. </span>
          بما أن الفيديو يعمل تلقائيًا على الوضع الصامت، يجب إزالة مسار الصوت عند التصدير. هذا يقلل حجم الملف بشكل كبير.
        </li>
      </ul>

      <h3 className="text-content font-bold py-2">
        حجم الملف
      </h3>
      <ul className="text-sm list-disc px-4">
        <li className="text-body font-regular">
          الهدف المثالي:
          <span className="font-bold"> أقل من 2 ميجابايت.</span>
        </li>
        <li className="text-body font-regular">
          استخدم أدوات الضغط:
          <Link
            className="underline font-bold"
            href="https://ffmpeg.org/"
            target="_blank"
          >
            <span> FFMPeg</span> (متقدم)
          </Link>
          أو
          <Link
            className="underline font-bold"
            href="https://handbrake.fr/"
            target="_blank"
          >
            <span> HandBrake</span> (سهل)
          </Link>.
        </li>
      </ul>
    </section>
  )
}