
//////--> cart actions <--//////
////////////// add/remove items ///////////////// 

import { Product } from "../payload-types";
import { create } from "zustand";
import { createJSONStorage, persist} from "zustand/middleware";

export type CartItem = {
  product: Product
}


// tracking cart state 
type CartState = {
  items: CartItem[],
  addItem: (product: Product) => void 
  //remove by product id
  removeItem: (productId: string) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  //middleware params: set + config
  //state setter + config
  //////// --> append to empty items array


  persist(
    (set)=>({
      items: [],
      addItem: (product) => set((state)=> { 
        const exists = state.items.find((item) => item.product.id === product.id);
        if (exists) return state;
        return { items: [...state.items, {product}]}}),
      removeItem: (id) => set((state) => ({ items: state.items.filter(item => item.product.id !== id)})),
      clear: () => set({items: []}),
    }),
    //storage
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
