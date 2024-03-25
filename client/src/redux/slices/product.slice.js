import { createSlice } from "@reduxjs/toolkit";
import { addToDB, isDBEmpty } from "../../utils/IDB/idb.utility";

// * declare inital user stat
const initialState = {};

// * create product slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      addToDB(action.payload);
      state.productList = [...action.payload];
    },
  },
});

export const { setDataProduct } = productSlice.actions;

export default productSlice.reducer;
