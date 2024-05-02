import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface CityData {
    currentCity?: string,
    isAccurate?: boolean
}
const initialState: CityData = {
    currentCity: 'Aktau',
    isAccurate: true
}
const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
       getCurrentCity: (state, action: PayloadAction<string>) => {
         state.currentCity = action.payload
       },
       getAccurate: (state, action: PayloadAction<boolean>) => {
         state.isAccurate = action.payload
       }
    }
})
export const { getCurrentCity, getAccurate } = citySlice.actions;
export default citySlice.reducer; 