// HOOKS
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import MdiColor from '@/components/svgs/MdiColor';
import LineMdClose from '@/components/svgs/LineMdClose';
import LineMdFolderArrowUp from '@/components/svgs/LineMdFolderArrowUp';
import SvgSpinnersRingResize from '@/components/svgs/activity/SvgSpinnersRingResize';

// STORES
import { 
  useAlertMessageStore, useLanguageStore, 
  useAddProductImgWindowStore, useSelectImgColorWindowStore,
  useStorageStore, useEditProductWindowStore
} from '@/stores/index';

// API
import uploadProductImage from '@/lib/api/object/post';
import editProduct from '@/lib/api/products/put';

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

  const queryClient = useQueryClient();
  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';

  const [ isFileOnDrag, setIsFileOnDrag ] = useState<boolean>(false);
  const [ preview, setPreview ] = useState<any>(null);

  const productImgInptRef = useRef<HTMLInputElement>(null);

  const addToggle = useAddProductImgWindowStore(state => state.toggle);
  const setAddToggle = useAddProductImgWindowStore(state => state.setToggle);

  const colorToggle = useSelectImgColorWindowStore(state => state.toggle);
  const setColorToggle = useSelectImgColorWindowStore(state => state.setToggle);
  const setSelectedColor = useSelectImgColorWindowStore(state => state.setSelectedColor);
  const selectedColor = useSelectImgColorWindowStore(state => state.selectedColor);

  const productData = useEditProductWindowStore(state => state.productData);
  const setProductData = useEditProductWindowStore(state => state.setProductData);

  const setFileData = useStorageStore(state => state.setFileData);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const [ imageSelectedType , setImageSelectedType ] = useState<Record<string, string> | null>(null);
  const [ productImage, setProductImage ] = useState<File | null>(null);
  const [ isMutating, setIsMutating ] = useState<boolean>(false);

  const setFilePath = (productId: string, color: string, viewType: string) => `${productId}/${color}/${Date.now()}-view-${viewType}`;

  const resetWindowToDefault = () => {
    setPreview(null);
    setProductImage(null);
    setSelectedColor(null);
    setImageSelectedType(null);
  };

  const displayAlert = (message: any, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertToggle(Date.now());
  };

  const updateProductImages = ({ message, data }: any) => {
    const newView = { 
      url: data.publicUrl, 
      type: imageSelectedType?.type, 
      ...(imageSelectedType?.tag && { tag: imageSelectedType?.tag })
    };

    let imagesArray = productData?.images ? [ ...productData.images ] : [];
    const colorIndex = imagesArray.findIndex((image: any) => image.color === selectedColor?.name);

    if (colorIndex !== -1) {
      imagesArray[colorIndex] = {
        ...imagesArray[colorIndex], 
        views: [ 
          ...imagesArray[colorIndex].views.filter((view: any) => view.type !== newView.type), 
          newView
        ]
      }
    } else {
      imagesArray = [ ...imagesArray, { color: selectedColor?.name, views: [ newView ] } ];
    }

    const colors = imagesArray.map(image => image.color);
    const updatedProductData = { ...productData, images: imagesArray };
    console.log('colors: ', colors);
    console.log('old images Data: ', productData);
    console.log('new images Data: ', updatedProductData);

    return { images: imagesArray, updatedProductData, colors};
  }

  const uploadProductImageMutation = useMutation({
    mutationFn: uploadProductImage,
    onSettled: () => {
      setIsMutating(false);
    },
    onMutate: () => {
      setIsMutating(true);
    },
    onSuccess: (data) => {
      console.log('upload image data result: ', data);
      setFileData(data);
      const { images, colors } = updateProductImages(data);
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
      setProductData({ ...productData, images, colors });
      // editProductAfterImageUploadMutation.mutate({id: productData?.id, images, colors})
      setAddToggle(false);
    },
    onError: () => {
      displayAlert(isEn ? 'An Error has accured during uploading the image, please try again.' : 'هناك مشكله خلال رفع الصوره, الرجاء المحاوله مره اخرى.', "error");
    }
  })

  const previewUploadedImg = (files: any) => {
    if (!files[0]) return;
    const reader = new FileReader();
    reader.onload = (e: any) => setPreview(e.currentTarget.result);
    reader.readAsDataURL(files[0]);
    setProductImage(files[0]);
  }

  const handleClick = (
    e: React.MouseEvent<HTMLElement | SVGElement>
  ) => {
    e.stopPropagation();
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'fixed_window_is_clicked':
        resetWindowToDefault();
        setAddToggle(false);
        break;
      case 'fixed_box_is_clicked':
        break;
      case 'upload_img_label':
      case 'upload_img_upload_button_is_clicked':
        if (productImgInptRef.current) productImgInptRef.current.click();
        break;
      case 'cancel_button_is_clicked':
        resetWindowToDefault();
        setAddToggle(false);
        break;
      case 'accept_button_is_clicked':
        console.log('productData: ', productData);
        console.log('selectedColor: ', selectedColor);
        console.log('imageSelectedType: ', imageSelectedType);
        console.log('productImage: ', productImage);

        switch (false) {
          case productData !== null:
            displayAlert(isEn ? 'Couldn\'t get product data please try again.' : 'عدم القدره على قراءه معلومات المنتج, الرجاء المحاوله مره اخرى.', "error");
            break;
          case productImage !== null:
            displayAlert(isEn ? 'Please Select an Image for your product.' : 'الرجاء اختيار صوره للمنتج.', "warning");
            break;
          case selectedColor !== null:
            displayAlert(isEn ? 'Please Choose a color that repesents the product' : 'الرجاء اختيار اللون المناسب للمنتج.', "warning");
            break;
          case imageSelectedType !== null:
            displayAlert(isEn ? 'Please Choose the view type.' : 'الرجاء اختيار الصنف للعرض.', "warning");
            break;
          default:
            uploadProductImageMutation.mutate({
              bucketName: 'assets',
              filePath: setFilePath(productData?.id, selectedColor?.name, imageSelectedType?.type),
              productImage
            });
        }
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
    e.stopPropagation();
    const { name } = e.currentTarget;
    const { type, tag } = e.currentTarget.dataset;

    switch (name) {
      case 'productImage':
        const files = e.currentTarget.files;
        previewUploadedImg(files);
        break;
      case 'imageType':
        if (type && tag) setImageSelectedType({ type, tag });
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
          displayAlert(isEn ? `Please upload only one Image` : `الرجاء رفع صوره واحده فقط`, "error"); ""  
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
  console.log('imageSelectedType: ', imageSelectedType);

  return (
    <div
      className={`
        fixed top-0 left-0
        flex items-center justify-center w-full h-full
        bg-[var(--shade-color)] z-[2000]
        transition-all duration-200 ease-out
        ${addToggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
      data-type="fixed_window_is_clicked"
      onClick={handleClick}
    >
      <div
        className={`
          absolute
          flex flex-col w-auto max-h-full
          rounded-lg bg-background overflow-y-auto
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
              {isEn ? 'IMAGE UPLOAD' : 'رفع الصوره'}
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
                {isEn ? 'Drag & drop or click to upload' : 'اسحب واسقط او انقر للرفع'}
              </span>
              <span
                className="text-inbetween text-center text-s"
              >
                {isEn ? '(Recommended: 1200x800px, AVIF)' : '(موصى به: 1200x800px, AVIF)'}
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
                  {isEn ? 'Upload Image' : 'رفع الصوره'}
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-between w-full p-2 gap-8 bg-background-light rounded-lg"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'COLOR ASSIGNMENT' : 'اللوان المختار'}
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
                  {getColor(colorsArray, selectedColor?.name)?.title[lang] || (isEn ? 'unSelected' : 'غير محدد')}
                </span>
                <div
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-sm text-transparent bg-shade drop-shadow-lg
                    h-4 px-1 blur-[3px] z-[5] rounded-full 
                  "
                >
                  {getColor(colorsArray, selectedColor?.name)?.title[lang] || (isEn ? 'unSelected' : 'غير محدد')}
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
                  {isEn ? 'Change Color' : 'تغيير اللون'}
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
                  data-type="main"
                  data-tag="a"
                  onChange={handleChange}
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
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
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
                  data-type="alternate"
                  data-tag="b"
                  onChange={handleChange}
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
                  className={`
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute w-4 h-4 text-body z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
                />
                <RiCheckFill
                  className={`
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute w-4 h-4 text-heading z-[5]
                    transition-all duration-300 ease-in-out
                    ${isEn ? 'left-2' : 'right-2'}
                  `}
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
            {isEn ? 'cancel' : 'تراجع'}
          </button>
          <button
            className="
              flex justify-center flex-1 text-content p-1 
              hover:bg-background-deep-light
              transition-all duration-300 ease-in-out
            "
            data-type="accept_button_is_clicked"
            onClick={handleClick}
          >
            {isMutating 
              ? <SvgSpinnersRingResize />
              : isEn 
              ? 'accept' 
              : 'قبول'
            }
          </button>
        </section>
      </div>
    </div>
  )
}