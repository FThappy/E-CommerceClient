import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    quantity: 0,
    isFetching: "none",
  },
  reducers: {
    addWishlist: (state, action) => {
      state.quantity += 1;
      const productWithWishlist = {
        ...action.payload,
        wishlist: true,
      };
      state.products.push(productWithWishlist);
      state.isFetching = "Add"
    },
    removeWishlist: (state, action) => {
      state.quantity -= 1;
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      state.isFetching="Remove"
    },
  },
});

export const { addWishlist, removeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
