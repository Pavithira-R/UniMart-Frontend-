import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
    items: number[]; // Array of product IDs
}

const storedWishlist = localStorage.getItem("unimart_wishlist");
const initialState: WishlistState = {
    items: storedWishlist ? JSON.parse(storedWishlist) : [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<number>) => {
            const index = state.items.indexOf(action.payload);
            if (index >= 0) {
                state.items.splice(index, 1); // remove
            } else {
                state.items.push(action.payload); // add
            }
            localStorage.setItem("unimart_wishlist", JSON.stringify(state.items));
        },
        addToWishlist: (state, action: PayloadAction<number>) => {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
                localStorage.setItem("unimart_wishlist", JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((id) => id !== action.payload);
            localStorage.setItem("unimart_wishlist", JSON.stringify(state.items));
        },
        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem("unimart_wishlist");
        }
    },
});

export const { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
