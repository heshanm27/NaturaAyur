import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Replace 'your-types' with the appropriate path to your types

export interface IItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  totalPrice: number;
}
interface CartState {
  items: IItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const { productID, productName, productPrice, productImg } = action.payload;
      console.log("add to cart", productID, productName, productPrice, productImg);
      const existingItem = state.items.find((item) => item._id === productID);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * productPrice;
      } else {
        state.items.push({
          _id: productID,
          name: productName,
          price: productPrice,
          image: productImg,
          quantity: 1,
          totalPrice: productPrice,
        });
      }
      state.total += productPrice;
    },
    increaceQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item._id === itemId);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        state.total += existingItem.price;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
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
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item._id === itemId);
      if (existingItem) {
        state.items = state.items.filter((item) => item._id !== itemId);
        state.total -= existingItem.quantity * existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart, decreaseQuantity, increaceQuantity } = cartSlice.actions;
