import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Replace 'your-types' with the appropriate path to your types

interface CartState {
  items: any[];
  total: number;
}

const initialState: CartState = {
  items: [
    {
      _id: "5f9f1b0b0b5b8c0b5c0b5c0b",
    },
    {
      _id: "5f9f1b0b0b5b8c0b5c0b5c0b",
    },
    {
      _id: "5f9f1b0b0b5b8c0b5c0b5c0b",
    },
    {
      _id: "5f9f1b0b0b5b8c0b5c0b5c0b",
    },
  ],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const { _id, name, price } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * price;
      } else {
        state.items.push({
          _id,
          name,
          price,
          quantity: 1,
          totalPrice: price,
        });
      }
      state.total += price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item._id === itemId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item._id !== itemId);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }
        state.total -= existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
