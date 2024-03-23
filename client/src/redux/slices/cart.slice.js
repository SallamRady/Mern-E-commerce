import { createSlice } from "@reduxjs/toolkit";

// * declare inital user stat
const initialState = {
  items: [],
  amount: 0,
  quantity: 0,
};

// * create product slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let newProduct = action.payload;
      // TODO::check if product already in cart
      let indexOfPro = state.items.findIndex((ele) => ele.id == newProduct.id);
      console.log("indexOfPro", indexOfPro);
      if (indexOfPro == -1) {
        // * Not Exist add it
        newProduct = { ...newProduct, quantity: 1 };
      } else {
        // * Exist increase its quantity
        newProduct = {
          ...newProduct,
          quantity: state.items[indexOfPro].quantity + 1,
        };
      }
      let arr = state.items;
      if (indexOfPro != -1) {
        arr[indexOfPro] = newProduct;
      } else {
        arr.push(newProduct);
      }

      state.items = arr;
      state.quantity = +state.quantity + 1;
      state.amount = +state.amount + +newProduct.price;
    },
    decreaseItemFromCart: (state, action) => {
      let ProductId = action.payload;
      let price = 0;
      // TODO::check if product already in cart
      let indexOfPro = state.items.findIndex((ele) => ele.id == ProductId);

      let arr = state.items;
      if (indexOfPro != -1) {
        price = +arr[indexOfPro].price;
        if (arr[indexOfPro].quantity == 1) {
          arr = arr.filter((ele) => ele.id != ProductId);
        } else {
          arr[indexOfPro].quantity = +arr[indexOfPro].quantity - 1;
        }
      }

      state.items = arr;
      state.quantity = +state.quantity - 1;
      state.amount = +state.amount - price;
    },
    removeItemFromCart: (state, action) => {
      let ProductId = action.payload;
      let price = 0,
        Qut = 0;
      // TODO::check if product already in cart
      let indexOfPro = state.items.findIndex((ele) => ele.id == ProductId);

      let arr = state.items;
      if (indexOfPro != -1) {
        price = +arr[indexOfPro].price * +arr[indexOfPro].quantity;
        Qut = +arr[indexOfPro].quantity;
        arr = arr.filter((ele) => ele.id != ProductId);
      }

      state.items = arr;
      state.quantity = +state.quantity - Qut;
      state.amount = +state.amount - price;
    },
  },
});

export const { addToCart, decreaseItemFromCart,removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
