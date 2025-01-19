import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// FIXED LAYOUTS
const useCartStore = create(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle })
  })
);

type FilterWindowProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  selectedCategories: any[];
  setSelectedCategories: (value: any[]) => void;
};

const useFilterWindowStore = create<FilterWindowProps>(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle }),
    selectedCategories: [],
    setSelectedCategories: (selectedCategories: any[]) => set({ selectedCategories })
  })
);

const useTabNameStore = create(
  (set) => ({
    tabName: 'home',
    setTabName: (tabName: string) => set({ tabName })
  })
);

export { useCartStore, useTabNameStore, useFilterWindowStore };