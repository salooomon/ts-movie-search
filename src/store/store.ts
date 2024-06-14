import {configureStore} from "@reduxjs/toolkit";
import storage from "../redux/storage";

const store = configureStore({
    reducer: {state : storage}
})
export type AppDispatch = typeof store.dispatch;
export default store;