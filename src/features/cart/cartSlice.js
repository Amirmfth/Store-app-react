import { createSlice } from "@reduxjs/toolkit";
import { sumPrice, sumQuantity } from "../../helpers/helper";
// helpers

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  totalPrice: 0,
  checkout: false,
};

const actions = {
  addItem: (state, { payload }) => {
    if (!state.selectedItems.find((item) => item.id === payload.id)) {
      state.selectedItems.push({ ...payload, quantity: 1 });
      state.totalPrice = sumPrice(state.selectedItems);
      state.itemsCounter = sumQuantity(state.selectedItems);
      state.checkout = false;
    }
  },
  removeItem: (state, { payload }) => {
    const newSelectedItem = state.selectedItems.filter(
      (item) => item.id !== payload.id
    );
    state.selectedItems = newSelectedItem;
    state.totalPrice = sumPrice(state.selectedItems);
    state.itemsCounter = sumQuantity(state.selectedItems);
  },
  increase: (state, { payload }) => {
    const index = state.selectedItems.findIndex(
      (item) => item.id === payload.id
    );
    state.selectedItems[index].quantity++;
    state.totalPrice = sumPrice(state.selectedItems);
    state.itemsCounter = sumQuantity(state.selectedItems);
  },
  decrease: (state, { payload }) => {
    const index = state.selectedItems.findIndex(
      (item) => item.id === payload.id
    );
    state.selectedItems[index].quantity--;
    state.totalPrice = sumPrice(state.selectedItems);
    state.itemsCounter = sumQuantity(state.selectedItems);
  },
  checkout: (state) => {
    state.selectedItems = [];
    state.itemsCounter = 0;
    state.totalPrice = 0;
    state.checkout = false;
  },
};



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: actions,
});

export default cartSlice.reducer;

export const { addItem, removeItem, increase, decrease, checkout } =
  cartSlice.actions;
