// HOOKS
import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// COMPONENTS
import Switch from '@/components/Switch';
import MaterialSymbolsLightDataTable from '@/components/svgs/MaterialSymbolsLightDataTable';
import TablerVideoFilled from '@/components/svgs/TablerVideoFilled';
import LineMdArrowsDiagonal from '@/components/svgs/LineMdArrowsDiagonal';
import LineMdEdit from '@/components/svgs/LineMdEdit';
import LineMdTrash from '@/components/svgs/LineMdTrash';
import LineMdPlus from '@/components/svgs/LineMdPlus';
import FluentZoomFit24Regular from '@/components/svgs/FluentZoomFit24Regular';
import GardenFileImage26 from '@/components/svgs/GardenFileImage26';

// STORES
import { useActivityWindowStore, useAlertMessageStore } from '@/stores/index';

// API
import updateHeroVideoDetails from '@/lib/api/hero-video/put';
import uploadStorageFile from '@/lib/api/object/bucketName/filePath/post';

// ASSETS
const posterImg = "/assets/img/background(5).webp";
const navBarLgImg = "/assets/img/background(7).webp";

type Props = {
  isEn?: boolean;
  isLoading: boolean;
  data: Record<string, string> | null;
};

export default function Options ({ isEn = true, data, isLoading }: Props) {

  const queryClient = useQueryClient();
  const onSwitchToggle = (data: boolean) => updateHeroVideoMutation.mutate({ mute: data });

  const setActivityWindowToggle = useActivityWindowStore(state => state.setToggle);
  const setActivityWindowMessage = useActivityWindowStore(state => state.setMessage);

  const setAlertToggle = useAlertMessageStore((state) => state.setToggle);
  const setAlertType = useAlertMessageStore((state) => state.setType);
  const setAlertMessage = useAlertMessageStore((state) => state.setMessage);

  const targetedRow = useRef<string>(null);

  const displayAlert = (message: any, type: string) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertToggle(Date.now());
  };

  const updateHeroVideoMutation = useMutation({
    mutationFn: updateHeroVideoDetails,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Updating the Video Settings...' : 'جاري تحديث اعدادات الفيديو...')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['hero-video']});
      displayAlert(data.message[isEn ? 'en' : 'ar'], "success");
    },
    onError: () => {
      displayAlert(
        isEn 
          ? "Couldn't update Video Settings, please try again." 
          : "فشل في محاوله تحديث اعدادات الفيديو, الرجاء محاوله مره اخرى."
      , "error");
    },
  })

  const uploadFileMutation = useMutation({
    mutationFn: uploadStorageFile,
    onSettled: () => {
      setActivityWindowToggle(false);
    },
    onMutate: () => {
      setActivityWindowToggle(true);
      setActivityWindowMessage(isEn ? 'Uploading the Image...' : 'جاري رفع الصوره...');
    },
    onSuccess: (results) => {
      const { publicUrl } = results.data;
      displayAlert(results.message[isEn ? 'en' : 'ar'], "success");
      if (targetedRow.current) updateHeroVideoMutation.mutate({ [targetedRow.current]: publicUrl });
      // DEBUG
      // console.log('upload image data result: ', data);
    },
    onError: () => {
      displayAlert(isEn ? 'An Error has accured during uploading the image, please try again.' : 'هناك مشكله خلال رفع الصوره, الرجاء المحاوله مره اخرى.', "error");
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.currentTarget;
    const { rowName } = e.currentTarget.dataset;

    switch (name) {
      case 'PosterUpload':
        if (!files) return;
        const file: any = files[0];
        uploadFileMutation.mutate({
          bucketName: 'assets',
          filePath: `images/hero-video/poster/${Date.now()}`,
          file
        });
        uploadFileMutation.mutate(file);
        if (rowName) targetedRow.current = rowName;
        break;
      default:
        console.error('Unknown name: ', name);
    }
  }

  // DEBUG & UI
  // console.log('isSwitchChekced: ', isSwitchChekced);
  // isLoading = true;

  if (isLoading) return (
    <section className="flex flex-col gap-4">
      <span className="--opacity-blink w-20 text-transparent bg-background-deep-light rounded-lg font-bold text-lg">
        //////////////////
      </span>
      {['///////////////', '/////////////////////', '//////////'].map((itm, i) => 
        <div
          key={i}
          className="flex justify-between items-center w-full"
        >
          <div
            className="--opacity-blink text-transparent bg-background-deep-light rounded-lg"
          >
            <p
              className="text-transparent font-bold"
            >
              {itm}
            </p>
            <p
              className="text-transparent text-sm font-bold"
            >
              {itm}
            </p>
          </div>
          <div
            className="
              --opacity-blink w-[200px] aspect-[1/1] rounded-lg bg-background-deep-light
            "
          />
        </div>
      )}
      <div
        className="flex justify-between items-center w-full"
      >
        <div
          className="--opacity-blink text-transparent bg-background-deep-light rounded-lg"
        >
          <p
            className="text-transparent font-bold"
          >
            /////////////////////////
          </p>
          <p
            className="text-transparent text-sm font-bold"
          >
            /////////////////////////
          </p>
        </div>
        <Switch 
          isLoading={true}
        />
      </div>
    </section>
  )

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
        {data?.poster_url 
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
            htmlFor="PosterUpload"
          >
            <input
              className="
                absolute top-1/2 left-1/2
                translate-x-[-50%] translate-y-[-50%] w-0 h-0
                unvisible opacity-0
              "
              type="file"
              accept="image/*"
              id="PosterUpload"
              name="PosterUpload"
              data-row-name="poster_url"
              onChange={handleChange}
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
            WebM
          </p>
          <p
            className="text-sm text-body-light font-bold"
          >
            {isEn ? '(required)' : 'مطلوب'}
          </p>
        </div>
        {false 
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
                  accept="video/webm"
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
              accept="video/webm"
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
                absolute top-0 left-1/2 translate-x-[-50%]
                flex items-center justify-evenly p-4
              "
            >
              <div
                className="flex items-center shrink-0 gap-2 bg-body-light p-2 rounded-lg"
              >
                <MaterialSymbolsLightDataTable
                  className="
                    flex items-center justify-evenly bg-body-light text-background-light
                  "
                />
                <span className="font-bold text-background-light">2 MB</span>
              </div>
            </div>
            <div
              className="
                absolute bottom-0 left-1/2 translate-x-[-50%]
                flex items-center justify-evenly w-full p-4
              "
            >
              <div
                className="flex items-center h-10 bg-body-light p-1 rounded-lg"
              >
                <span
                  className="
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  1080p
                </span>
              </div>
              <div
                className="flex items-center gap-2 bg-body-light p-2 rounded-lg"
              >
                <TablerVideoFilled className="w-6 h-6 text-background-light" />
                <span
                  className="
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  WebM
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
            Mp4
          </p>
          <p
            className="text-sm text-body-light font-bold"
          >
            {isEn ? '(required)' : 'مطلوب'}
          </p>
        </div>
        {false 
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
                  accept="video/mp4"
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
              accept="video/mp4"
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
                absolute top-0 left-1/2 translate-x-[-50%]
                flex items-center justify-evenly p-4
              "
            >
              <div
                className="flex items-center shrink-0 gap-2 bg-body-light p-2 rounded-lg"
              >
                <MaterialSymbolsLightDataTable
                  className="
                    flex items-center justify-evenly bg-body-light text-background-light
                  "
                />
                <span className="font-bold text-background-light">2 MB</span>
              </div>
            </div>
            <div
              className="
                absolute bottom-0 left-1/2 translate-x-[-50%]
                flex items-center justify-evenly w-full p-4
              "
            >
              <div
                className="flex items-center h-10 bg-body-light p-1 rounded-lg"
              >
                <span
                  className="
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  1080p
                </span>
              </div>
              <div
                className="flex items-center gap-2 bg-body-light p-2 rounded-lg"
              >
                <TablerVideoFilled className="w-6 h-6 text-background-light" />
                <span
                  className="
                    text-base text-background-light font-bold
                    bg-body-light rounded-full
                  "
                >
                  Mp4
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
        <Switch 
          isChecked={!!data?.mute}
          isLoading={isLoading}
          onSwitchToggle={onSwitchToggle}
        />
      </div>
    </section>
  )
}