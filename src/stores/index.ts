import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

// FIXED LAYOUTS
type CartStorePops = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  cart: any[];
  setCart: (value: any) => void;
};

const useCartStore = create<CartStorePops>()(
  persist(
    (set) => ({
      toggle: false,
      setToggle: (toggle: boolean) => set({ toggle }),
      // cart: [{ id: 1, size: "M", quantity: 2, color: "purple" }],
      cart: [],
      setCart: (cart: any) => set({ cart })
    }),
    {
      name:'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

type NavbarStoreProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  categoryToggle: boolean;
  setCategoryToggle: (value: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const useNavbarStore = create<NavbarStoreProps>(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle }),
    categoryToggle: false,
    setCategoryToggle: (categoryToggle: boolean) => set({ categoryToggle }),
    selectedCategory: '',
    setSelectedCategory: (selectedCategory: string) => set({ selectedCategory })
  })
);

type FilterWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  selectedCategories: any[];
  setSelectedCategories: (value: any[]) => void;
  clickedCategory: string;
  setClickedCategory: (value: string) => void;
};

const useFilterWindowStore = create<FilterWindowProps>(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle }),
    selectedCategories: [],
    setSelectedCategories: (selectedCategories: any[]) => set({ selectedCategories }),
    clickedCategory: '',
    setClickedCategory: (clickedCategory: string) => set({ clickedCategory }),
  })
);

type AllProductImages = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  images: string[];
  setImages: (value: string[]) => void;
};

const useAllProductImagesStore = create<AllProductImages>(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle }),
    images: [],
    setImages: (images: string[]) => set({ images })
  })
);

const useTabNameStore = create(
  (set) => ({
    tabName: 'home',
    setTabName: (tabName: string) => set({ tabName })
  })
);

type FavouritesProps = {
  favourites: number[];
  setFavourites: (value: number[]) => void;
};

const useFavouritesStore = create<FavouritesProps>(
  (set) => ({
    favourites: [],
    setFavourites: (favourites: number[]) => set({ favourites })
  })
);

type FavouriteConfettiToggleProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
};

const useFavouriteConfettiToggle = create<FavouriteConfettiToggleProps>(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle })
  })
);

type LayoutRefProps = {
  layoutRef?: any;
  setLayoutRef: (value: any) => void;
};

const useLayoutRefStore = create<LayoutRefProps>(
  (set) => ({
    layoutRef: null,
    setLayoutRef: (layoutRef: any) => set({ layoutRef })
  })
);

type AlertMessageProps = {
  toggle: number;
  setToggle: (value: number) => void;
  type: string;
  setType: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  productDetails: any;
  setProductDetails: (value: any) => void;
}

const useAlertMessageStore = create<AlertMessageProps>()(
  (set) => ({
    toggle: 0,
    setToggle: (toggle: number) => set({ toggle }),
    type: "",
    setType: (type: string) => set({ type }),
    message: "",
    setMessage: (message: string) => set({ message }),
    productDetails: {},
    setProductDetails: (productDetails) => set({ productDetails })
  }),
);

type FooterListProps = {
  toggleIndex?: number | null;
  setToggleIndex: (value: any) => void;
}

const useFooterListStore = create<FooterListProps>(
  (set) => ({
    toggleIndex: null,
    setToggleIndex: (toggleIndex: number | null) => set({ toggleIndex })
  })
);

type LanguageProps = {
  firstTime: boolean;
  setFirstTime: (value: boolean) => void;
  lang: string;
  setLang: (value: string) => void;
  isHydrated: boolean;
  setIsHydrated: (isHydrated: boolean) => void;
};

const useLanguageStore = create<LanguageProps>()(
  persist(
    (set) => ({
      firstTime: true,
      setFirstTime: (firstTime: boolean) => set({ firstTime }),
      lang: 'en',
      setLang: (lang: string) => set({ lang }),
      isHydrated: false, // Default to false
      setIsHydrated: (isHydrated: boolean) => set({ isHydrated }),
    }),
    {
      name:'language-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      }
    }
  )  
);

type AddProductWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  trigger: number;
  setTrigger: (value: number) => void;
  productData: Record<string, any> | null;
  setProductData: (value: Record<string, any | null>) => void;
};

const useAddProductWindowStore = create<AddProductWindowProps>()(
  (set) => ({
    toggle: false,
    setToggle: (toggle) => set({ toggle }),
    trigger: Date.now(),
    setTrigger: (trigger) => set({ trigger }),
    productData: null,
    setProductData: (productData) => set({ productData })
  })
);

type EditProductWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  trigger: number;
  setTrigger: (value: number) => void;
  productData: Record<string, any> | null;
  setProductData: (value: Record<string, any | null>) => void;
};

const useEditProductWindowStore = create<EditProductWindowProps>()(
  (set) => ({
    toggle: false,
    setToggle: (toggle) => set({ toggle }),
    trigger: Date.now(),
    setTrigger: (trigger) => set({ trigger }),
    productData: null,
    setProductData: (productData) => set({ productData })
  })
);

type ProductDataProps = {
  productData: Record<string, any>;
  setProductData: (value: Record<string, any | null>) => void;
};

const useProductDataStore = create<ProductDataProps>()(
  (set) => ({
    productData: {
      name: { en: "", ar: "" },
      slug: "",
      description: { "en": "", "ar": "" },
      type: "",
      categories: [],
      is_new: false,
      state: "",
      sizes: [],
      colors: [],
      images: [],
      stock: {
        XS: { "emerald": 5, "black": 3 },
        S: { "emerald": 10, "black": 8 },
        M: { "emerald": 7, "black": 6 },
        L: { "emerald": 4, "black": 2 }
      },
      price: 0,
      discount_percent: 0,
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
    },
    setProductData: (productData) => set({ productData })
  })
);

type AddProductImgWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  bucketName: string,
  setBucketName: (value: string) => void;
  filePath: string;
  setFilePath: (value: string) => void;
};

const useAddProductImgWindowStore = create<AddProductImgWindowProps>()(
  (set) => ({
    toggle: false,
    setToggle: (toggle) => set({ toggle }),
    bucketName: "",
    setBucketName: (bucketName) => set({ bucketName }),
    filePath: "",
    setFilePath: (filePath) => set({ filePath })
  })
);

type SelectImgColorWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  selectedColor: null | Record<string, any>;
  setSelectedColor: (value: null | Record<string, any>) => void;
};

const useSelectImgColorWindowStore = create<SelectImgColorWindowProps>()(
  (set) => ({
    toggle: false,
    setToggle: (toggle) => set({ toggle }),
    selectedColor: null,
    setSelectedColor: (selectedColor) => set({ selectedColor })
  })
);

type StorageProps = {
  fileData: Record<string, string>;
  setFileData: (value: Record<string, string>) => void;
};

const useStorageStore = create<StorageProps>()(
  (set) => ({
    fileData: {},
    setFileData: (fileData) => set({ fileData })
  })
)

export { 
  useCartStore, useNavbarStore, 
  useTabNameStore, useFilterWindowStore,
  useFavouritesStore, useFavouriteConfettiToggle,
  useLayoutRefStore, useAlertMessageStore,
  useFooterListStore, useAllProductImagesStore,
  useLanguageStore, useAddProductWindowStore,
  useEditProductWindowStore, useAddProductImgWindowStore, 
  useSelectImgColorWindowStore, useStorageStore,
  useProductDataStore
};