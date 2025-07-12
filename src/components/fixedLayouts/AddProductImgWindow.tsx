// HOOKS
import { useState, useRef } from 'react';

// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import MdiColor from '@/components/svgs/MdiColor';
import LineMdClose from '@/components/svgs/LineMdClose';
import LineMdFolderArrowUp from '@/components/svgs/LineMdFolderArrowUp';

// STORES
import { 
  useAlertMessageStore, useLanguageStore, 
  useAddProductImgWindowStore, useSelectImgColorWindowStore
} from '@/stores/index';

// JSON
import colorsArray from '@/json/colors.json';

// UTILS
import getColor from '@/utils/getColor';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.avif";
const outfit1 = "/assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.avif"
const outfit3 = "assets/imgb/outfit-3.avif"

export default function AddProductImgWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const [ isFileOnDrag, setIsFileOnDrag ] = useState<boolean>(false);
  const [ preview, setPreview ] = useState<any>(null);

  const productImgInptRef = useRef<HTMLInputElement>(null);

  const addToggle = useAddProductImgWindowStore(state => state.toggle);
  const setAddToggle = useAddProductImgWindowStore(state => state.setToggle);

  const colorToggle = useSelectImgColorWindowStore(state => state.toggle);
  const setColorToggle = useSelectImgColorWindowStore(state => state.setToggle);
  const selectedColor = useSelectImgColorWindowStore(state => state.selectedColor);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const previewUploadedImg = (files: any) => {
    if (!files[0]) return;
    const reader = new FileReader();
    reader.onload = (e: any) => setPreview(e.currentTarget.result);
    reader.readAsDataURL(files[0]);
  }

  const handleClick = (
    e: React.MouseEvent<HTMLElement>
  ) => {
    // e.preventDefault();
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        setAddToggle(false);
        break;
      case 'fixed_box_is_clicked':
        break;
      case 'upload_img_label':
      case 'upload_img_upload_button_is_clicked':
        if (productImgInptRef.current) productImgInptRef.current.click();
        break;
      case 'cancel_button_is_clicked':
        setAddToggle(false);
        break;
      case 'change_color_button_is_clicked':
        setColorToggle(true);
        break;
      case 'upload_img_remove_button_is_clicked':
        if (productImgInptRef.current) productImgInptRef.current.value = "";
        setPreview(null);
        break;
      case 'upload_img_div_box_is_clicked':
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { name } = e.currentTarget;

    switch (name) {
      case 'productImage':
        const files = e.currentTarget.files;
        previewUploadedImg(files);
        break;
      default:
        console.error('Unknown type: ', name);
    }
  }

  const handleDragEnter = (
    e: React.DragEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setAddToggle(false);
        break;
      case 'upload_img_label':
        setIsFileOnDrag(true);
        break;
      case 'change_color_button_is_clicked':
        setColorToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleDragLeave = (
    e: React.DragEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setAddToggle(false);
        break;
      case 'upload_img_label':
        setIsFileOnDrag(false);
        break;
      case 'change_color_button_is_clicked':
        setColorToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleDragOver = (
    e: React.DragEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setAddToggle(false);
        break;
      case 'upload_img_label':
        setIsFileOnDrag(true);
        break;
      case 'change_color_button_is_clicked':
        setColorToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  const handleDrop = (
    e: React.DragEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setAddToggle(false);
        break;
      case 'cancel_button_is_clicked':
        setAddToggle(false);
        break;
      case 'upload_img_label':
        setIsFileOnDrag(false);
        const files = e.dataTransfer.files;

        if (files.length === 1) {
          if (productImgInptRef.current) productImgInptRef.current.files = files;
          previewUploadedImg(files);
        } else {
          setAlertToggle(Date.now());
          setAlertType("error");
          setAlertMessage(isEn ? `Please upload only one Image` : `الرجاء رفع صوره واحده فقط`);  
        }
        break;
      case 'change_color_button_is_clicked':
        setColorToggle(true);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  // DEBUG & UI
  // const addToggle = true;
  // console.log('addToggle: ', addToggle);
  // console.log('selectedColor: ', selectedColor);

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[2000]
        transition-all duration-200 ease-out
        ${addToggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
      data-type="fixed_window_is_clicked"
      onClick={handleClick}
    >
      <div
        className={`
          absolute top-1/2 left-1/2
          translate-x-[-50%] translate-y-[-50%]
          h-[calc(100%-2rem)] rounded-lg bg-background overflow-y-scroll
          transition-all delay-100 duration-200 ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)]
          ${addToggle ? 'scale-100 opacity-100' : 'scale-[80%] opacity-0'}
        `}
        data-type="fixed_box_is_clicked"
        onClick={handleClick}
      >
        <section
          className="
            flex text-body-light justify-center py-4 font-bold px-2
          "
        >
          <h2>
            {isEn ? 'ADD PRODUCT IMAGE' : 'اضف صوره للمنتج'}
          </h2>
        </section>
        <hr className="border-inbetween" />
        <section
          className="flex flex-col gap-2 w-full px-2 py-4"
        >
          <div
            className="flex items-center w-full p-2 gap-8 bg-background-light rounded-lg"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'IMAGE UPLOAD' : ''}
            </h3>
            <div
              className={`
                relative flex flex-col items-center justify-center 
                w-[250px] h-[375px] aspect-2/3 rounded-md mx-auto
                bg-background-light cursor-pointer 
                border border-dashed border-[2px] overflow-hidden
                transition-all duration-300 ease-in-out
                ${isFileOnDrag ? 'border-content' : 'border-inbetween'}
              `}
              role="button"
              data-type="upload_img_label"
              // htmlFor="productImage"
              onClick={handleClick}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input 
                className="
                  absolute top-0 left-0 invisible opacity-0
                "
                type="file"
                accept="image/*"
                name="productImage"
                id="productImage"
                onChange={handleChange}
                ref={productImgInptRef}
              />
              <LineMdImageFilled 
                className="text-inbetween w-8 h-8"
              />
              <div
                className={`
                  absolute top-0 left-0 
                  w-full h-full bg-background z-[5] 
                  transition-all duration-300 ease-in-out
                  ${preview ? 'visible opacity-100' : 'invisible opacity-0'}
                `}
              >
                <img 
                  className={`
                    w-full h-full object-cover position-center
                  `}
                  src={preview}
                />
                <div
                  className={`
                    absolute top-0 left-0 
                    flex flex-row items-center justify-center gap-8
                    w-full h-full bg-shade
                    opacity-0 hover:opacity-100
                    transition-all duration-300 ease-in-out
                  `}
                  data-type="upload_img_div_box_is_clicked"
                  onClick={handleClick}
                >
                  <LineMdFolderArrowUp 
                    className="
                      text-heading-invert hover:bg-shade
                      w-16 h-16 p-2
                      transition-all duration-300 ease-in-out
                    "
                    role="button"
                    data-type="upload_img_upload_button_is_clicked"
                    onClick={handleClick}
                  />
                  <LineMdClose 
                    className="
                      text-heading-invert hover:bg-shade
                      w-16 h-16 p-2
                      transition-all duration-300 ease-in-out
                    "
                    role="button"
                    data-type="upload_img_remove_button_is_clicked"
                    onClick={handleClick}
                  />
                </div>
              </div>
              <span
                className="text-body text-center text-s font-bold"
              >
                Drag & drop or click to upload
              </span>
              <span
                className="text-inbetween text-center text-s"
              >
                (Recommended: 1200x800px, AVIF)
              </span>
              <div
                className="
                  flex gap-2 p-2 bg-content rounded-lg mt-2 hover:opacity-80
                  transition-all duration-300 ease-in-out
                "
              >
                <LineMdPlus 
                  className="text-heading-invert"
                />
                <span
                  className="text-heading-invert"
                >
                  Upload Image

                </span>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between w-full p-2 gap-8 bg-background-light rounded-lg"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'COLOR ASSIGNMENT' : 'الالوان'}
            </h3>
            <div
              className="flex flex-col gap-2 w-[130px] bg-background-deep-light p-2 rounded-lg"
            >
              <div
                className="relative flex bg-yellow-500 w-full h-[50px] rounded-lg text-center text-heading-invert"
                style={{backgroundColor: selectedColor?.hex || 'black'}}
              >
                <span
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-sm text-heading-invert z-[10]
                    "
                >
                  {selectedColor?.name || 'unSelected'}
                </span>
                <div
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-sm text-transparent bg-shade drop-shadow-lg
                    h-4 px-1 blur-[3px] z-[5] rounded-full 
                  "
                >
                  {selectedColor?.name || 'unSelected'}
                </div>
              </div>
              <button 
                className="
                  flex items-center gap-1 justify-center 
                  text-sm text-body font-bold 
                  bg-background-light hover:bg-background
                  py-2 rounded-lg
                  transition-all duration-300 ease-in-out
                "
                data-type="change_color_button_is_clicked"
                onClick={handleClick}
              >
                <MdiColor className="text-body w-4 h-4"/>
                <span>
                  Change Color
                </span>
              </button>
            </div>
          </div>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'TYPE' : 'الصنف'}
            </h3>
            <form
              className="flex gap-4 ml-auto"
            >
              <label
                className="
                  relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="imageTypeA"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="imageTypeA"
                  name="imageType"
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-outs
                  "
                >
                  {isEn ? 'A (Primary)' : 'A (رئيسي)'}
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
              <label
                className="
                  relative flex gap-2 items-center 
                  border border-inbetween px-2 py-1 
                  rounded-lg bg-background overflow-hidden cursor-pointer
                "
                htmlFor="imageTypeB"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="imageTypeB"
                  name="imageType"
                />{' '}
                <h4
                  className="
                    peer-checked:text-heading text-body text-sm font-bold z-[5]
                    transition-all duration-300 ease-in-outs
                  "
                >
                  {isEn ? 'B (Secondary)' : 'B (ثانوي)'}
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-green-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
            </form>
          </div>
        </section>
        <hr className="border-inbetween" />
        <section
          className="
            relative flex w-full
          "
        >
          <div
            className="
              absolute top-1/2 left-1/2
              translate-x-[-50%] translate-y-[-50%]
              w-[1px] h-full bg-inbetween
            "
          />
          <button
            className="
              flex-1 text-heading p-1
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="cancel_button_is_clicked"
            onClick={handleClick}
          >
            cancel
          </button>
          <button
            className="
              flex-1 text-content p-1 
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
          >
            accept
          </button>
        </section>
      </div>
    </div>
  )
}