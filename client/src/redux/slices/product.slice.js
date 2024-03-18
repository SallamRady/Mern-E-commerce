import { createSlice } from "@reduxjs/toolkit";

// * declare inital user stat
const initialState = {};

// * create product slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
  },
});

export const { setDataProduct } = productSlice.actions;

export default productSlice.reducer;
