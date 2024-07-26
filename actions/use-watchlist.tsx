import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Show } from '@/types';

interface WatchList {
  items: Show[];
  addItem: (data: Show) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

const useWatchList = create(
  persist<WatchList>((set, get) => ({
  items: [],
  addItem: (data: Show) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    if (existingItem) {
      return toast('Item already in WatchList.');
    }

    set({ items: [...get().items, data] });
    toast.success('Item saved to WatchList.');
  },
  removeItem: (id: number) => {
    set({ items: [...get().items.filter((item) => item.id !== id)] });
    toast.success('Item removed from WatchList.');
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'watchlist-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useWatchList;