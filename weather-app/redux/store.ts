import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'
import {
    TypedUseSelectorHook,
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
  } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
})

const { dispatch } = store;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export const useDispatch = () => useAppDispatch<AppDispatch>();

export default store;
