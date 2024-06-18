import {AnyAction, configureStore, Store, ThunkDispatch} from "@reduxjs/toolkit";
import storage from "../redux/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
    dispatch: AppThunkDispatch;
};

export const store: AppStore = configureStore({
    reducer: {state : storage}
});

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export default store;

