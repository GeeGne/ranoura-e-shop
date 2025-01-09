import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
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

export { useCartStore, useTabNameStore };