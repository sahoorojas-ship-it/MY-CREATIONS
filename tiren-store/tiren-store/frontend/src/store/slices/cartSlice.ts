import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  weight?: string;
  stock: number;
  category: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const saveCart = (items: CartItem[]) => {
  if (typeof window !== 'undefined') localStorage.setItem('tiren_cart', JSON.stringify(items));
};

const initialState: CartState = { items: [], isOpen: false };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(i => i.productId === action.payload.productId && i.weight === action.payload.weight);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + action.payload.quantity, existing.stock);
      } else {
        state.items.push(action.payload);
      }
      saveCart(state.items);
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; weight?: string; quantity: number }>) {
      const item = state.items.find(i => i.productId === action.payload.productId && i.weight === action.payload.weight);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => !(i.productId === action.payload.productId && i.weight === action.payload.weight));
        } else {
          item.quantity = Math.min(action.payload.quantity, item.stock);
        }
      }
      saveCart(state.items);
    },
    removeFromCart(state, action: PayloadAction<{ productId: string; weight?: string }>) {
      state.items = state.items.filter(i => !(i.productId === action.payload.productId && i.weight === action.payload.weight));
      saveCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCart([]);
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, toggleCart, setCartOpen, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
