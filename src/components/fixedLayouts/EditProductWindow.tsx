// COMPONENTS
import RiAddLine from '@/components/svgs/RiAddLine';
import RiCheckFill from '@/components/svgs/RiCheckFill';
import LineMdImageFilled from '@/components/svgs/LineMdImageFilled';
import LineMdPlus from '@/components/svgs/LineMdPlus';

// STORES
import { useTabNameStore, useLanguageStore, useEditProductWindowStore } from '@/stores/index';

// JSON
import colorsArray from '@/json/colors.json';

// UTILS
import getColor from '@/utils/getColor';

// ASSETS
const ramdanBanner = "/assets/img/ramadan-nights.webp";
const ramdanBanner2 = "/assets/img/ramadan-nights-2.avif";
const outfit1 = "/assets/img/outfit.webp"
const outfit2 = "assets/img/outfit-2.avif"
const outfit3 = "assets/img/outfit-3.avif"

export default function EditProductWindow () {

  const lang = useLanguageStore(state => state.lang);
  const isEn = lang === 'en';
  const toggle = useEditProductWindowStore(state => state.toggle);
  const setToggle = useEditProductWindowStore(state => state.setToggle);
  const productColors = ["Sky", "Coral", "Pink", "Wine"];

  const productData = {
    id: 3,
    name: {"en": "Blossom Sweater", "ar": "سترة بلوسوم"},
    slug: "bolssom-sweater",
    description: {"en": "Cozy Floral-Embroidered Relaxed Sweater", "ar": "كنزة مريحة مطرزة بزهور"},
    type: "t-shirts",
    categories: ["clothing", "t-shirts", "new", "what's-new", "sale", "hot-deals", "latest-arrivals"],
    forced_new: true,
    sizes: ["M", "L"],
    colors: ["White", "Black"],
    images: [
      {
        main: "/assets/img/cloth-c-white.avif",
        second: "/assets/img/cloth-c-white-view-b.avif",
        color: "White"
      },{
        main: "/assets/img/cloth-c-black.avif",
        second: "/assets/img/cloth-c-black-view-b.avif",
        color: "Black"
      }
    ],
    stock: {
      XS: { "emerald": 5, "black": 3 },
      S: { "emerald": 10, "black": 8 },
      M: { "emerald": 7, "black": 6 },
      L: { "emerald": 4, "black": 2 }
    },
    price: 45000,
    discount_percent: 45,
    lists: [
      {
        title: {"en": "PRODUCT DETAILS", "ar": "تفاصيل عن القطعه"},
        descriptionLists: {
          en: [
            "Brand: Ranoura",
            "Material: Fabric",
            "Fit: Tight to boy",
            "NeckLine: None",
            "Sleeves: Yes",
            "Design: Italic"
          ],
          ar: [
            "العلامة التجارية: رانورا",
            "المادة: قماش",
            "المقاس: ضيق على الجسم",
            "خط العنق: لا يوجد",
            "الأكمام: نعم",
            "التصميم: مائل"
          ]
        }
      },{
        title: {en: "SIZE INFO", ar: "معلومات عن المقاسات"},
        descriptionLists: {
          en: [
            "True to size",
            "XXS: 0",
            "XS: 0-2",
            "MD: 2-4",
            "LG: 4-6",
            "XL: 6-9"
          ],
          ar: [
            "True to size",
            "XXS: 0",
            "XS: 0-2",
            "MD: 2-4",
            "LG: 4-6",
            "XL: 6-9"
          ]
        }
      },{
        title: {"en": "ABOUT RANOURA✧･ﾟ*", "ar": "حول رانورا*ﾟ･✧"},
        descriptionLists: {
          en: [
            "Welcome to Ranoura – where elegance meets excellence. At Ranoura, we pride ourselves on crafting garments from the finest high-end fabrics, designed for those who appreciate quality, style, and sophistication. Each piece is meticulously tailored to provide a perfect blend of comfort and luxury, ensuring you feel confident and radiant in every moment. Discover timeless designs and impeccable craftsmanship that redefine fashion, only at Ranoura."
          ],
          ar: [
            "مرحبًا بكم في رانورا – حيث تلتقي الأناقة بالتميز. في رانورا، نفخر بصناعة الملابس من أجود الأقمشة الفاخرة، مصممة لأولئك الذين يقدرون الجودة والأناقة والرقي. كل قطعة مصممة بعناية فائقة لتوفر مزيجًا مثاليًا من الراحة والفخامة، مما يضمن شعورك بالثقة والإشراق في كل لحظة. اكتشف التصاميم الخالدة والحرفية اللا مثيل لها التي تعيد تعريف الموضة، فقط في رانورا."
          ]
        }
      },{
        title: {"en": "DELIVERY", "ar": "التوصيل"},
        descriptionLists: {
          en: [
            "Get your favorite Ranoura pieces delivered straight to your doorstep! Enjoy fast and reliable shipping with options for standard delivery (three to five business days) or express delivery (one to two business days) for those last-minute style needs. We carefully package every item to ensure it arrives in perfect condition, ready to shine in your wardrobe."
          ],
          ar: [
            "احصل على قطع رانورا المفضلة لديك ويتم توصيلها مباشرة إلى عتبة بابك! استمتع بالشحن السريع والموثوق مع خيارات التوصيل القياسي (من ثلاثة إلى خمسة أيام عمل) أو التوصيل السريع (من يوم إلى يومين عمل) لتلبية احتياجات الأناقة في اللحظة الأخيرة. نحن نعبئ كل قطعة بعناية لضمان وصولها في حالة مثالية، جاهزة للتألق في خزانة ملابسك."
          ]
        }
      },{
        title: {"en": "RETURNS", "ar": "المرجوعات"},
        descriptionLists: {
          en: [
            "At Ranoura, your satisfaction is our priority. If something isn't quite right, you can easily return it within fourteen days of receiving your order. Items must be unworn, unwashed, and with original tags attached. Simply follow our hassle-free returns process, and we'll ensure you get a refund or exchange as quickly as possible."
          ], 
          ar: [
            "في رانورا، رضاكم هو أولويتنا. إذا كان هناك شيء غير مناسب تمامًا، يمكنكم إرجاعه بسهولة خلال أربعة عشر يومًا من استلام طلبكم. يجب أن تكون الأغراض غير ملبوسة وغير مغسولة ومع العلامات الأصلية مرفقة. ما عليكم سوى اتباع عملية الإرجاع السهلة لدينا، وسنضمن حصولكم على استرداد أو استبدال في أسرع وقت ممكن."
          ]
        }  
      }
    ]
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'cancel_button_is_clicked':
        setToggle(false);
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0
        w-full h-full
        bg-[var(--shade-color)] z-[3000]
        transition-all duration-300 ease-out
        ${toggle ? 'visible opacity-100 backdrop-blur-[3px]' : 'invisible opacity-0 backdrop-blur-[0px]'}
      `}
    >
      <div
        className={`
          absolute top-1/2 left-1/2
          translate-x-[-50%] translate-y-[-50%]
          h-auto rounded-lg
          bg-background overflow-hidden
          transition-all delay-200 duration-300 ease-[cubic-bezier(.24,.16,.35,1.29)]
          ${toggle ? 'scale-100' : 'scale-50'}
        `}
      >
        <section
          className="
            flex text-body-light justify-center py-4 font-bold
          "
        >
          <h2>
            {isEn ? 'EDIT PRODUCT' : 'تعديل المنتج'}
          </h2>
        </section>
        <hr className="px-2 border-inbetween"/>
        <section
          className="flex gap-4 w-full justify-center py-4"
        >
          <img 
            src={outfit1}
            className="
              w-[150px] aspect-2/3 rounded-md
            "
          />
          <div
            className="
              flex flex-col items-center justify-center w-[150px] aspect-2/3 rounded-md bg-background-light 
              border border-dashed border-inbetween border-[2px]
            "
          >
            <LineMdImageFilled 
              className="text-inbetween"
            />
            <span
              className="text-inbetween text-sm font-bold"
            >
              Add New Image
            </span>
            <LineMdPlus
              className="text-inbetween w-8 h-8 py-1"
            />
          </div>
        </section>
        <section
          className="
            flex flex-col gap-2 w-full h-full p-2
          "
        >
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="nameEn"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'NAME' : 'الاسم'}
            </h3>
            <h4 className="ml-auto">
              en:
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              value="swater very hot" 
              type="text"
              id="nameEn"
              name="nameEn"
              readOnly
            />
            <h4>
              ar:
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              value="swater very hot" 
              type="text"
              id="nameAr"
              name="nameAr"
              readOnly
            />
          </label>
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="descritpionEn"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'DESCRIPTION' : 'حول'}
            </h3>
            <h4 className="ml-auto">
              en:
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              value="swater very hot" 
              type="text"
              id="descriptionEn"
              name="descriptionEn"
              readOnly
            />
            <h4>
              ar:
            </h4>
            <input 
              className="p-2 text-heading rounded-lg"
              value="swater very hot" 
              type="text"
              id="descripionAr"
              name="descripionAr"
              readOnly
            />
          </label>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'SIZES' : 'المقاسات'}
            </h3>
            
            <form
            
            className="flex gap-4 ml-auto"
            
            >
            
              <label
            
            className="
            
                peer-checked:bg-green-500 relative flex gap-2 items-center 
            
                  border border-inbetween px-2 py-1 
            
                  rounded-lg bg-background overflow-hidden cursor-pointer
            
                  "
            
                htmlFor="sizeXSmall"
            
            >
            
                <input
            
            className="peer invisible text-heading rounded-lg" 
            
                  type="checkbox"
            
                  id="sizeXSmall"
            
                  name="sizeXSmall"
            
            />{' '}
            
                <h4
            
            className="text-heading text-sm font-bold z-[5]"
            
            >
            
                  XS
            
                </h4>
            
                <RiAddLine
            
            className="
            
                  peer-checked:invisible visible
            
                    peer-checked:opacity-0 opacity-100 
            
                    absolute left-2 w-4 h-4 z-[5]
            
                    transition-all duration-300 ease-in-out
            
                    "
            
            />
            
                <RiCheckFill
            
            className="
            
                  peer-checked:visible invisible
            
                    peer-checked:opacity-100 opacity-0 
            
                    absolute left-2 w-4 h-4 z-[5]
            
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
            
                peer-checked:bg-green-500 relative flex gap-2 items-center 
            
                  border border-inbetween px-2 py-1 
            
                  rounded-lg bg-background overflow-hidden cursor-pointer
            
                  "
            
                htmlFor="sizeSmall"
            
            >
            
                <input
            
            className="peer invisible text-heading rounded-lg" 
            
                  type="checkbox"
            
                  id="sizeSmall"
            
                  name="sizeSmall"
            
            />{' '}
            
                <h4
            
            className="text-heading text-sm font-bold z-[5]"
            
            >
            
                  S
            
                </h4>
            
                <RiAddLine
            
            className="
            
                  peer-checked:invisible visible
            
                    peer-checked:opacity-0 opacity-100 
            
                    absolute left-2 w-4 h-4 z-[5]
            
                    transition-all duration-300 ease-in-out
            
                    "
            
            />
            
                <RiCheckFill
            
            className="
            
                  peer-checked:visible invisible
            
                    peer-checked:opacity-100 opacity-0 
            
                    absolute left-2 w-4 h-4 z-[5]
            
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
            
                peer-checked:bg-green-500 relative flex gap-2 items-center 
            
                  border border-inbetween px-2 py-1 
            
                  rounded-lg bg-background overflow-hidden cursor-pointer
            
                  "
            
                htmlFor="sizeMedium"
            
            >
            
                <input
            
            className="peer invisible text-heading rounded-lg" 
            
                  type="checkbox"
            
                  id="sizeMedium"
            
                  name="sizeMedium"
            
            />{' '}
            
                <h4
            
            className="text-heading text-sm font-bold z-[5]"
            
            >
            
                  M
            
                </h4>
            
                <RiAddLine
            
            className="
            
                  peer-checked:invisible visible
            
                    peer-checked:opacity-0 opacity-100 
            
                    absolute left-2 w-4 h-4 z-[5]
            
                    transition-all duration-300 ease-in-out
            
                    "
            
            />
            
                <RiCheckFill
            
            className="
            
                  peer-checked:visible invisible
            
                    peer-checked:opacity-100 opacity-0 
            
                    absolute left-2 w-4 h-4 z-[5]
            
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
            
                peer-checked:bg-green-500 relative flex gap-2 items-center 
            
                  border border-inbetween px-2 py-1 
            
                  rounded-lg bg-background overflow-hidden cursor-pointer
            
                  "
            
                htmlFor="sizeLarge"
            
            >
            
                <input
            
            className="peer invisible text-heading rounded-lg" 
            
                  type="checkbox"
            
                  id="sizeLarge"
            
                  name="sizeLarge"
            
            />{' '}
            
                <h4
            
            className="text-heading text-sm font-bold z-[5]"
            
            >
            
                  L
            
                </h4>
            
                <RiAddLine
            
            className="
            
                  peer-checked:invisible visible
            
                    peer-checked:opacity-0 opacity-100 
            
                    absolute left-2 w-4 h-4 z-[5]
            
                    transition-all duration-300 ease-in-out
            
                    "
            
            />
            
                <RiCheckFill
            
            className="
            
                  peer-checked:visible invisible
            
                    peer-checked:opacity-100 opacity-0 
            
                    absolute left-2 w-4 h-4 z-[5]
            
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
            
                peer-checked:bg-green-500 relative flex gap-2 items-center 
            
                  border border-inbetween px-2 py-1 
            
                  rounded-lg bg-background overflow-hidden cursor-pointer
            
                  "
            
                htmlFor="sizeExtraLarge"
            
            >
            
                <input
            
            className="peer invisible text-heading rounded-lg" 
            
                  type="checkbox"
            
                  id="sizeExtraLarge"
            
                  name="sizeExtraLarge"
            
            />{' '}
            
                <h4
            
            className="text-heading text-sm font-bold z-[5]"
            
            >
            
                  XL
            
                </h4>
            
                <RiAddLine
            
            className="
            
                  peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
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
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="descritpionEn"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'COLORS' : 'الالوان'}
            </h3>
              <ul
                className="
                  flex items-center gap-2 py-2 ml-auto 
                "
              >
                {productColors.map((color: string, index: number) => 
                  <li
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: getColor(colorsArray, color).hex }}
                    key={index}
                  />  
                )}
              </ul>
          </label>
          <label
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="price"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'PRICE' : 'السعر'}
            </h3>
              <input
                className="
                  flex items-center gap-2 p-2 ml-auto rounded-lg w-20
                "
                type="text"
                name="price"
                id="price"
                value="20"
              />
          </label>
          <label
            className="
              flex gap-2 items-center w-full bg-background-light rounded-lg p-2
            "
            htmlFor="discount"
          >
            <h3 className="text-body font-bold">
              {isEn ? 'DISCOUNT' : 'التخفيض'}
            </h3>
            <input
              className="
                flex items-center gap-2 p-2 ml-auto rounded-lg w-10 text-center
              "
              type="text"
              name="discount"
              id="discount"
              value="20"
            />
            <span className="text-heading font-bold">%</span>
          </label>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'NEW' : 'جديد'}
            </h3>
            <label
              className="
                relative ml-auto w-10 h-5 
                rounded-full overflow-hidden border border-inbetween
                bg-green-500 cursor-pointer
              "
              htmlFor="new"
            >
              <input
                className="
                  peer invisible flex items-center gap-2 p-2 ml-auto rounded-lg w-10 text-center
                "
                type="checkbox"
                name="new"
                id="new"
                value="20"
              />
              <div
                className="
                  absolute peer-checked:left-[calc(100%-18px)] left-[2px] top-1/2  
                  translate-y-[-50%] w-4 h-4 aspect-1/1 
                  bg-background rounded-full border border-background-light z-[5]
                  transition-all duration-300 ease-in-out
                "
              />
              <div
                className="
                  absolute top-0 left-0   
                  w-full h-full aspect-1/1 peer-checked:bg-green-500 bg-inbetween
                  transition-all duration-300 ease-in-out
                "
              />
            </label>
          </div>
          <div
            className="
              flex gap-4 items-center w-full bg-background-light rounded-lg p-2
            "
          >
            <h3 className="text-body font-bold">
              {isEn ? 'state' : 'الحاله'}
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
                htmlFor="stateAvailable"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="stateAvailable"
                  name="productState"
                />{' '}
                <h4
                  className="text-heading text-sm font-bold z-[5]"
                >
                  {isEn ? 'available' : 'متاح'}
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
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
                htmlFor="stateOutOfStock"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="stateOutOfStock"
                  name="productState"
                />{' '}
                <h4
                  className="text-heading text-sm font-bold z-[5]"
                >
                  {isEn ? 'out of stock' : 'غير متوفر'}
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-yellow-400
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
                htmlFor="stateHidden"
              >
                <input
                  className="peer invisible text-heading rounded-lg" 
                  type="radio"
                  id="stateHidden"
                  name="productState"
                />{' '}
                <h4
                  className="text-heading text-sm font-bold z-[5]"
                >
                  {isEn ? 'hidden' : 'مخفي'}
                </h4>
                <RiAddLine
                  className="
                    peer-checked:invisible visible
                    peer-checked:opacity-0 opacity-100 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <RiCheckFill
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute left-2 w-4 h-4 z-[5]
                    transition-all duration-300 ease-in-out
                  "
                />
                <div 
                  className="
                    peer-checked:visible invisible
                    peer-checked:opacity-100 opacity-0 
                    absolute top-0 left-0 w-full h-full
                    bg-red-400
                    transition-all duration-300 ease-in-out
                  "
                />
              </label>
            </form>
          </div>
        </section>
        <hr className="px-2 border-inbetween"/>
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