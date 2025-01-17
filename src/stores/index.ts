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
  toggle: boolean
  setToggle: (value: boolean) => void;
}
const useFilterWindowStore = create<FilterWindowProps>(
  (set) => ({
    toggle: false,
    setToggle: (toggle: boolean) => set({ toggle })
  })
);

const useTabNameStore = create(
  (set) => ({
    tabName: 'home',
    setTabName: (tabName: string) => set({ tabName })
  })
);

export { useCartStore, useTabNameStore, useFilterWindowStore };