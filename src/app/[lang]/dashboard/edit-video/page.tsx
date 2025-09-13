"use client";

// HOOKS
import { useState, useRef, useEffect } from "react";

// STORES
import { useTabNameStore, useLanguageStore } from "@/stores/index";

// COMPONENTS
import VideoDisplay from "@/app/[lang]/dashboard/edit-video/VideoDisplay";
import Preview from "@/app/[lang]/dashboard/edit-video/Preview";
import Options from "@/app/[lang]/dashboard/edit-video/Options";
import Guidelines from "@/app/[lang]/dashboard/edit-video/Guidelines";
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
      <Guidelines isEn={isEn} />
      <Preview isEn={isEn} />
      <Options isEn={isEn} />
    </div>
  );
}
