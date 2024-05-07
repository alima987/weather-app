import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import cityReducer from './slices/citySlice';
import loadingReducer from './slices/loadingSlice';
const rootReducer = combineReducers({
    weather: weatherReducer,
    city: cityReducer,
    loading: loadingReducer
})
export default rootReducer;