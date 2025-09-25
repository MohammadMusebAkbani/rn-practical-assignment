import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  
  addToCart: (item) =>
    set((state) => {
      // Check if item already exists in cart
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        // If item exists, increment quantity
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, qty: cartItem.qty + 1 }
              : cartItem
          ),
        };
      } else {
        // If item doesn't exist, add new item with qty 1
        return {
          cart: [...state.cart, { ...item, qty: 1 }],
        };
      }
    }),
    
  removeFromCart: (id) =>
    set((state) => ({ 
      cart: state.cart.filter((item) => item.id !== id) 
    })),
    
  updateQuantity: (id, newQty) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      ),
    })),
    
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
