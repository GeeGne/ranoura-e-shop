import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// FIXED LAYOUTS
const useCartStore = create(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle })
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

type layoutRefProps = {
  layoutRef?: any;
  setLayoutRef: (value: any) => void;
};

const useLayoutRefStore = create<layoutRefProps>(
  (set) => ({
    layoutRef: null,
    setLayoutRef: (layoutRef: any) => set({ layoutRef })
  })
);

type alertMessageProps = {
  toggle: number;
  setToggle: (value: number) => void;
  type: string;
  setType: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
}
const useAlertMessageStore = create<alertMessageProps>(
  (set) => ({
    toggle: 0,
    setToggle: (toggle: number) => set({ toggle }),
    type: "",
    setType: (type: string) => set({ type }),
    message: "",
    setMessage: (message: string) => set({ message })
  })
);

export { 
  useCartStore, useNavbarStore, 
  useTabNameStore, useFilterWindowStore,
  useFavouritesStore, useFavouriteConfettiToggle,
  useLayoutRefStore, useAlertMessageStore
};