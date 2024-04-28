import { TypedUseSelectorHook } from "react-redux";
//import type { RootState, AppDispatch } from "./store";
import { useDispatch, useSelector, useStore } from 'react-redux'

//export const useAppDispatch = () => useDispatch<AppDispatch>();
//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes()
export const useAppSelector = useSelector.withTypes()
export const useAppStore = useStore.withTypes()