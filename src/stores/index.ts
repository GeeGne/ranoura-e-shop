import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// FIXED LAYOUTS
type CartStorePops = {
  toggle?: boolean;
  setToggle?: (value: boolean) => void;
  cart: any[];
  setCart: (value: any[]) => void;
};

const useCartStore = create<CartStorePops>(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle }),
    // cart: [{ id: 1, size: "M", quantity: 2, color: "purple" }],
    cart: [],
    setCart: (cart: any[]) => set({ cart })
  })
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
}

const useAlertMessageStore = create<AlertMessageProps>(
  (set) => ({
    toggle: 0,
    setToggle: (toggle: number) => set({ toggle }),
    type: "",
    setType: (type: string) => set({ type }),
    message: "",
    setMessage: (message: string) => set({ message })
  })
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

export { 
  useCartStore, useNavbarStore, 
  useTabNameStore, useFilterWindowStore,
  useFavouritesStore, useFavouriteConfettiToggle,
  useLayoutRefStore, useAlertMessageStore,
  useFooterListStore, useAllProductImagesStore
};