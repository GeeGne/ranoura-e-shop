// COMPONENTS
import Switch from '@/components/Switch';
import LineMdArrowsDiagonal from '@/components/svgs/LineMdArrowsDiagonal';
import LineMdEdit from '@/components/svgs/LineMdEdit';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import FluentZoomFit24Regular from '@/components/svgs/FluentZoomFit24Regular';
import GardenFileImage26 from '@/components/svgs/GardenFileImage26';

// ASSETS
const posterImg = "/assets/img/background(5).webp";
const navBarLgImg = "/assets/img/background(7).webp";

type Props = {
  isEn?: boolean;
};

export default function Options ({ isEn = true }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <span className="text-heading font-bold text-lg">
        {isEn ? "Options" : "الخيارات"}
      </span>
      <div
        className="flex justify-between items-center w-full"
      >
        <div>
          <p
            className="text-body font-bold"
          >
            {isEn ? 'Poster' : 'بوستر'}
          </p>
          <p
            className="text-sm text-body-light font-bold"
          >
            {isEn ? '(optional)' : 'اختياري'}
          </p>
        </div>
        {true 
          ? <div
            className="
            group relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden
          ">
            <div
              className="
                absolute top-0 left-0 w-full h-full bg-shade
                flex flex-row gap-4 items-center justify-center
                text-heading-invert
                unvisible group-hover:visible opacity-0 group-hover:opacity-100
                transition-all duration-300 ease-in-out
              "
            >
              <LineMdTrash
                className="
                  w-10 h-10 hover:bg-shade-v2 p-2
                  rounded-md active:opacity-80 cursor-pointer
                  transition-all duration-200 ease-out
                "
              />
              <label
                className=""
                htmlFor="edit-video-poster"
              >
                <LineMdEdit
                  className="
                    w-10 h-10 hover:bg-shade-v2 p-2
                    rounded-md active:opacity-80 cursor-pointer
                    transition-all duration-200 ease-out
                  "
                />
                <input
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%] w-0 h-0
                    unvisible opacity-0
                  "
                  type="file"
                  accept="image/*"
                  id="edit-video-poster"
                  name="edit-video-poster"
                />
              </label>
              <FluentZoomFit24Regular
                className="
                  w-10 h-10 hover:bg-shade-v2 p-2
                  rounded-md active:opacity-80 cursor-pointer
                  transition-all duration-200 ease-out
                "
                role="button"
                data-type="expand_image_button_is_clicked"
                data-image-url={posterImg}
              />
            </div>
            <img 
              src={posterImg}
              className="w-full object-center object-cover"
            />
          </div>
          : <label
            className="
              flex relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden cursor-pointer
            "
            htmlFor="navBarImgEditInpt"
          >
            <input
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%] w-0 h-0
                unvisible opacity-0
              "
              type="file"
              accept="image/*"
              id="navBarImgEditInpt"
              name="navBarImgEditInpt"
              data-image-type="navbar"
              data-variable-name="navbarImg"
            />
            <div
              className="
                absolute top-0 left-0 w-full h-full bg-background-light
                border border-dashed border-[4px] border-body-light
                flex flex-row gap-4 items-center justify-center
                text-heading-invert
                transition-all duration-300 ease-in-out
              "
            />
            <LineMdPlus
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                w-12 h-12 text-body-light
              "
            />
            <div
              className="
                absolute bottom-0 left-1/2 translate-x-[-50%]
                flex items-center justify-evenly w-full p-4
              "
            >
              <div
                className="relative bg-body-light p-1 rounded-lg"
              >
                <LineMdArrowsDiagonal className="text-background-light w-8 h-8" />
                <span
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  1:1
                </span>
              </div>
              <div
                className="flex items-center gap-2 bg-body-light p-2 rounded-lg"
              >
                <GardenFileImage26 className="text-background-light" />
                <span
                  className="
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  AVIF
                </span>
              </div>
            </div>
          </label>
        }
      </div>
      <div
        className="flex justify-between items-center w-full"
      >
        <div>
          <p
            className="text-body font-bold"
          >
            WEBM
          </p>
          <p
            className="text-sm text-body-light font-bold"
          >
            {isEn ? '(required)' : 'مطلوب'}
          </p>
        </div>
        {true 
          ? <div
            className="
            group relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden
          ">
            <div
              className="
                absolute top-0 left-0 w-full h-full bg-shade
                flex flex-row gap-4 items-center justify-center
                text-heading-invert
                unvisible group-hover:visible opacity-0 group-hover:opacity-100
                transition-all duration-300 ease-in-out
              "
            >
              <LineMdTrash
                className="
                  w-10 h-10 hover:bg-shade-v2 p-2
                  rounded-md active:opacity-80 cursor-pointer
                  transition-all duration-200 ease-out
                "
              />
              <label
                className=""
                htmlFor="edit-video-poster"
              >
                <LineMdEdit
                  className="
                    w-10 h-10 hover:bg-shade-v2 p-2
                    rounded-md active:opacity-80 cursor-pointer
                    transition-all duration-200 ease-out
                  "
                />
                <input
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%] w-0 h-0
                    unvisible opacity-0
                  "
                  type="file"
                  accept="image/*"
                  id="edit-video-poster"
                  name="edit-video-poster"
                />
              </label>
              <FluentZoomFit24Regular
                className="
                  w-10 h-10 hover:bg-shade-v2 p-2
                  rounded-md active:opacity-80 cursor-pointer
                  transition-all duration-200 ease-out
                "
                role="button"
                data-type="expand_image_button_is_clicked"
                data-image-url={posterImg}
              />
            </div>
            <img 
              src={posterImg}
              className="w-full object-center object-cover"
            />
          </div>
          : <label
            className="
              flex relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden cursor-pointer
            "
            htmlFor="navBarImgEditInpt"
          >
            <input
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%] w-0 h-0
                unvisible opacity-0
              "
              type="file"
              accept="image/*"
              id="navBarImgEditInpt"
              name="navBarImgEditInpt"
              data-image-type="navbar"
              data-variable-name="navbarImg"
            />
            <div
              className="
                absolute top-0 left-0 w-full h-full bg-background-light
                border border-dashed border-[4px] border-body-light
                flex flex-row gap-4 items-center justify-center
                text-heading-invert
                transition-all duration-300 ease-in-out
              "
            />
            <LineMdPlus
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                w-12 h-12 text-body-light
              "
            />
            <div
              className="
                absolute bottom-0 left-1/2 translate-x-[-50%]
                flex items-center justify-evenly w-full p-4
              "
            >
              <div
                className="relative bg-body-light p-1 rounded-lg"
              >
                <LineMdArrowsDiagonal className="text-background-light w-8 h-8" />
                <span
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  1:1
                </span>
              </div>
              <div
                className="flex items-center gap-2 bg-body-light p-2 rounded-lg"
              >
                <GardenFileImage26 className="text-background-light" />
                <span
                  className="
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  AVIF
                </span>
              </div>
            </div>
          </label>
        }
      </div>
      <div
        className="flex justify-between items-center w-full"
      >
        <div>
          <p
            className="text-body font-bold"
          >
            MP4
          </p>
          <p
            className="text-sm text-body-light font-bold"
          >
            {isEn ? '(required)' : 'مطلوب'}
          </p>
        </div>
        {true 
          ? <div
            className="
            group relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden
          ">
            <div
              className="
                absolute top-0 left-0 w-full h-full bg-shade
                flex flex-row gap-4 items-center justify-center
                text-heading-invert
                unvisible group-hover:visible opacity-0 group-hover:opacity-100
                transition-all duration-300 ease-in-out
              "
            >
              <LineMdTrash
                className="
                  w-10 h-10 hover:bg-shade-v2 p-2
                  rounded-md active:opacity-80 cursor-pointer
                  transition-all duration-200 ease-out
                "
              />
              <label
                className=""
                htmlFor="edit-video-poster"
              >
                <LineMdEdit
                  className="
                    w-10 h-10 hover:bg-shade-v2 p-2
                    rounded-md active:opacity-80 cursor-pointer
                    transition-all duration-200 ease-out
                  "
                />
                <input
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%] w-0 h-0
                    unvisible opacity-0
                  "
                  type="file"
                  accept="image/*"
                  id="edit-video-poster"
                  name="edit-video-poster"
                />
              </label>
              <FluentZoomFit24Regular
                className="
                  w-10 h-10 hover:bg-shade-v2 p-2
                  rounded-md active:opacity-80 cursor-pointer
                  transition-all duration-200 ease-out
                "
                role="button"
                data-type="expand_image_button_is_clicked"
                data-image-url={posterImg}
              />
            </div>
            <img 
              src={posterImg}
              className="w-full object-center object-cover"
            />
          </div>
          : <label
            className="
              flex relative w-[200px] aspect-[1/1] rounded-lg overflow-hidden cursor-pointer
            "
            htmlFor="navBarImgEditInpt"
          >
            <input
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%] w-0 h-0
                unvisible opacity-0
              "
              type="file"
              accept="image/*"
              id="navBarImgEditInpt"
              name="navBarImgEditInpt"
              data-image-type="navbar"
              data-variable-name="navbarImg"
            />
            <div
              className="
                absolute top-0 left-0 w-full h-full bg-background-light
                border border-dashed border-[4px] border-body-light
                flex flex-row gap-4 items-center justify-center
                text-heading-invert
                transition-all duration-300 ease-in-out
              "
            />
            <LineMdPlus
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%]
                w-12 h-12 text-body-light
              "
            />
            <div
              className="
                absolute bottom-0 left-1/2 translate-x-[-50%]
                flex items-center justify-evenly w-full p-4
              "
            >
              <div
                className="relative bg-body-light p-1 rounded-lg"
              >
                <LineMdArrowsDiagonal className="text-background-light w-8 h-8" />
                <span
                  className="
                    absolute top-1/2 left-1/2
                    translate-x-[-50%] translate-y-[-50%]
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  1:1
                </span>
              </div>
              <div
                className="flex items-center gap-2 bg-body-light p-2 rounded-lg"
              >
                <GardenFileImage26 className="text-background-light" />
                <span
                  className="
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  AVIF
                </span>
              </div>
            </div>
          </label>
        }
      </div>
      <div
        className="flex justify-between items-center w-full"
      >
        <div>
          <p
            className="text-body font-bold"
          >
            Mute
          </p>
          <p
            className="text-sm text-body-light font-bold"
          >
            (recommended = yes)
          </p>
        </div>
        <Switch />
      </div>
    </section>
  )
}