import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {

    // 🔹 ADD ITEM
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity++;
    },

    // 🔹 REMOVE ITEM
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },

    // 🔹 UPDATE QUANTITY (IMPORTANT)
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;

      const item = state.items.find(i => i.id === id);

      if (item) {
        item.quantity += amount;
        state.totalQuantity += amount;

        // remove if quantity becomes 0
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
    }
  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
