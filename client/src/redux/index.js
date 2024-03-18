import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import productReducer from "./slices/product.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;
