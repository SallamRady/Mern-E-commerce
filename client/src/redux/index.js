import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import productReducer from "./slices/product.slice";
import cartReducer from "./slices/cart.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
