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

type EditProductWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  productData: Record<string, any> | null;
  setProductData: (value: Record<string, any | null>) => void;
}

const useEditProductWindowStore = create<EditProductWindowProps>()(
  (set) => ({
    toggle: false,
    setToggle: (toggle) => set({ toggle }),
    productData: null,
    setProductData: (productData) => set({ productData })
  })
)

type AddProductImgWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
}

const useAddProductImgWindowStore = create<AddProductImgWindowProps>()(
  (set) => ({
    toggle: false,
    setToggle: (toggle) => set({ toggle })    
  })
)

type SelectImgColorWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  selectedColor: null | Record<string, any>;
  setSelectedColor: (value: null | Record<string, any>) => void;
}

const useSelectImgColorWindowStore = create<SelectImgColorWindowProps>()(
  (set) => ({
    toggle: false,
    setToggle: (toggle) => set({ toggle }),
    selectedColor: null,
    setSelectedColor: (selectedColor) => set({ selectedColor })
  })
)

export { 
  useCartStore, useNavbarStore, 
  useTabNameStore, useFilterWindowStore,
  useFavouritesStore, useFavouriteConfettiToggle,
  useLayoutRefStore, useAlertMessageStore,
  useFooterListStore, useAllProductImagesStore,
  useLanguageStore, useEditProductWindowStore,
  useAddProductImgWindowStore, useSelectImgColorWindowStore
};