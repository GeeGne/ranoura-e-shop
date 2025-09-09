"use client";

// HOOKS
import { useState, useRef, useEffect } from "react";

// STORES
import { useTabNameStore, useLanguageStore } from "@/stores/index";

// COMPONENTS
import VideoDisplay from "@/app/[lang]/dashboard/edit-video/VideoDisplay";
import IonDesktopOutline from "@/components/svgs/IonDesktopOutline";
import FamiconsTabletPortraitSharp from "@/components/svgs/FamiconsTabletPortraitSharp";
import FamiconsPhonePortraitOutline from "@/components/svgs/FamiconsPhonePortraitOutline";
import UilExpandAlt from "@/components/svgs/UilExpandAlt";
import HugeiconsArrowExpand01 from "@/components/svgs/HugeiconsArrowExpand01";

export default function page() {
  const setTabName = useTabNameStore((state: any) => state.setTabName);
  const lang = useLanguageStore((state) => state.lang);
  const isEn = lang === "en";

  useEffect(() => {
    setTabName("edit-video");
  }, []);

  return (
    <div
      className="flex flex-col gap-4"
    >
      <section>
        <h2 className="text-heading font-bold text-lg">
          {isEn ? "Guidelines" : "إرشادات"}
        </h2>
        <h3 
          className="text-content font-bold py-2"
        >
          Video Lengh & conent
        </h3>
        <ul className="text-sm list-disc px-4">
          <li className="text-body font-regular">
            <span className="font-bold">Ideal Length:</span> 15-30 seconds.
          </li>
          <li className="text-body font-regular">
            <span className="font-bold">Reasoning:</span> 
            The video is a hook, not a documentary. It should quickly convey our brand message or showcase a key product. A shorter loop feels seamless and is more likely to be watched multiple times without feeling repetitive
          </li>
          <li className="text-body font-regular">
            <span className="font-bold">Content Tip:</span> 
            Ensure the beginning and end of the clip can loop smoothly without a noticeable jump or cut.
          </li>
        </ul>
        <h3 
          className="text-content font-bold py-2"
        >
          Technical Specifications (Non-Negotiable)
        </h3>
        <p className="text-sm text-body font-regular">Please export and provide TWO versions of the final video:</p>
        <ul className="text-sm list-disc px-4">
          <li className="text-body font-regular">
            <span className="font-bold">Primary Format:</span> 
            mp4 file using the H.264 codec.
          </li>
          <li className="text-body font-regular">
            <span className="font-bold">High-Performance Format:</span> 
            .webm file using the VP9 codec.
          </li>
          <li className="text-body font-regular">
            <span className="font-bold">Content Tip:</span> 
            Ensure the beginning and end of the clip can loop smoothly without a noticeable jump or cut.
          </li>
          <li className="text-body font-regular">
            <span className="font-bold">Why Two Formats?</span> 
            The .webm version is 25-35% smaller and loads faster for users on Chrome, Firefox, and Edge. The .mp4 version is a universal fallback for all other browsers (like Safari).
          </li>
        </ul>
        <h3 
          className="text-content font-bold py-2"
        >
          Export & Compression Settings
        </h3>
        <p className="text-sm text-body">To keep file sizes small and quality high, use these settings in your editing software (e.g., Adobe Premiere, Final Cut Pro) or a compression tool like HandBrake (free):</p>
        <ul className="text-sm list-disc px-4">
          <li className="text-body font-regular">
            <span className="font-bold">Resolution: 1920x1080 px (1080p).</span> 
            Do not upload 4K files.
          </li>
          <li className="text-body font-regular">
            <span className="font-bold">Frame Rate: 24fps or 30fps.</span> 
            If your source is 60fps, please convert it down.
          </li>
          <li className="text-body font-regular">
            <span className="font-bold">Audio: None.</span> 
            Since the video autoplays on mute, the audio track must be removed during export. This significantly reduces file size.
          </li>
          <li className="text-body font-regular">
            <span className="font-bold">Quality:</span> 
            Use a Constant Rate Factor (CRF) between 23-28 if using HandBrake/FFmpeg. This provides the best quality-to-size ratio.
          </li>
        </ul>
        <p className="text-sm text-body"><span className="font-bold">Target File Size:</span> A 30-second video should ideally be under 2.5 MB. Use the settings above to achieve this.</p>
      </section>
      <section>
        <span className="text-heading font-bold text-lg">
          {isEn ? "Preview" : "العرض"}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            className="
              flex flex-col gap-2 items-center justify-center 
              bg-background-light p-4 rounded-lg
            "
          >
            <span className="text-body font-bold">
              {isEn ? "DESKTOP" : "سطح المكتب"}
            </span>
            <div className="relative w-12 h-12">
              <IonDesktopOutline
                className="
                  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                  w-full h-full text-body bg-background-light z-[5]
                "
              />
              <HugeiconsArrowExpand01
                className="
                  hidden absolute top-1/2 left-1/2
                  translate-x-[-50%] translate-y-[-50%]
                  text-body rotate-45 w-[100px] h-[100px]
                "
              />
            </div>
            <VideoDisplay className="w-[300px] aspect-[16/9]" />
          </div>
          <div
            className="
              flex flex-col gap-2 items-center justify-center 
              bg-background-light p-4 rounded-lg
            "
          >
            <span className="text-body font-bold">
              {isEn ? "SMARTPHONE" : "هاتف"}
            </span>
            <div className="relative w-12 h-12">
              <FamiconsPhonePortraitOutline
                className="
                  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                  w-full h-full text-body bg-background-light z-[5]
                "
              />
              <HugeiconsArrowExpand01
                className="
                  hidden absolute top-1/2 left-1/2
                  translate-x-[-50%] translate-y-[-50%]
                  text-body rotate-45 w-[100px] h-[100px]
                "
              />
            </div>
            <VideoDisplay className="w-[200px] aspect-[9/16]" />
          </div>
          <div
            className="
              flex flex-col gap-2 items-center justify-center 
              bg-background-light p-4 rounded-lg
            "
          >
            <span className="text-body font-bold">
              {isEn ? "TABLET" : "تابلت"}
            </span>
            <div className="relative w-12 h-12">
              <FamiconsTabletPortraitSharp
                className="
                  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                  w-full h-full text-body bg-background-light z-[5]
                "
              />
              <HugeiconsArrowExpand01
                className="
                  hidden absolute top-1/2 left-1/2
                  translate-x-[-50%] translate-y-[-50%]
                  text-body rotate-45 w-[100px] h-[100px]
                "
              />
            </div>
            <VideoDisplay className="w-[250px] aspect-[3/4]" />
          </div>
        </div>
      </section>
    </div>
  );
}
