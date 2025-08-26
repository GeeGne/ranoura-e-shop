// HOOKS
import { useState, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import MdiColor from '@/components/svgs/MdiColor';
import CarbonCategory from '@/components/svgs/CarbonCategory';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { 
  useLanguageStore, useActivityWindowStore
} from '@/stores/index';

// API
import editProduct from '@/lib/api/products/put';
import removeFile from '@/lib/api/object/delete';

// JSON
import colorsArray from '@/json/colors.json';
// import subCategories from '@/json/subCategories.json';
import subCategories from '@/json/subCategoriesV2.json';
import categories from '@/json/categories.json';

// UTILS
import getColor from '@/utils/getColor';
import createSlug from '@/utils/createSlug';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.avif";
const outfit1 = "/assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.avif"
const outfit3 = "assets/img/outfit-3.avif"

export default function ActivityWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const toggle = useActivityWindowStore(state => state.toggle);
  const setToggle = useActivityWindowStore(state => state.setToggle);
  const message = useActivityWindowStore(state => state.message);
  const setMessage = useActivityWindowStore(state => state.setMessage);
  
  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[1000]
        transition-all duration-200 ease-out
        ${toggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
    >
      <div
        className={`
          absolute top-1/2 left-1/2
          translate-x-[-50%] translate-y-[-50%]
          flex flex-col items-center gap-4
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${toggle ? 'scale-100 opacity-100' : 'scale-[0.8] opacity-0'}
        `}
      >
        <span
          className="text-heading-invert text-2xl font-bold"
        >
          {message}
        </span>
        <SvgSpinnersRingResize 
          className="text-heading-invert w-12 h-12"
        />
      </div>
    </div>
  )
}