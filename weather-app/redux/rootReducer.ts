import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import cityReducer from './slices/citySlice';
const rootReducer = combineReducers({
    weather: weatherReducer,
    city: cityReducer,
})
export default rootReducer;