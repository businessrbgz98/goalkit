import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      lang: 'nl',

      setLang: (lang) => set({ lang }),

      addItem: (product, size, quantity = 1) => {
        const items = get().items;
        const key = `${product.id}-${size}`;
        const existing = items.find(i => i.key === key);
        if (existing) {
          set({
            items: items.map(i =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            )
          });
        } else {
          set({ items: [...items, { key, product, size, quantity }] });
        }
      },

      removeItem: (key) => {
        set({ items: get().items.filter(i => i.key !== key) });
      },

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set({
          items: get().items.map(i => i.key === key ? { ...i, quantity } : i)
        });
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      }
    }),
    { name: 'football-cart' }
  )
);
