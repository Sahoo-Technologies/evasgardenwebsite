import { create } from 'zustand';

interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  items: Array<{ type: 'image' | 'video'; url: string; alt: string; poster?: string }>;
}

interface UIState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  lightbox: LightboxState;
  openLightbox: (items: LightboxState['items'], index: number) => void;
  closeLightbox: () => void;
  setLightboxIndex: (index: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  lightbox: { isOpen: false, currentIndex: 0, items: [] },

  openLightbox: (items, index) =>
    set({ lightbox: { isOpen: true, currentIndex: index, items } }),

  closeLightbox: () =>
    set((state) => ({ lightbox: { ...state.lightbox, isOpen: false } })),

  setLightboxIndex: (index) =>
    set((state) => ({ lightbox: { ...state.lightbox, currentIndex: index } })),
}));
