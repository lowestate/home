import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from './authSlice'
import cartSlice from "./cartSlice";
import filtersSlice from "./filterSlice";
import reqFiltersSlice from "./reqFilterSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartSlice.reducer,
        filters: filtersSlice.reducer,
        req_filters: reqFiltersSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
