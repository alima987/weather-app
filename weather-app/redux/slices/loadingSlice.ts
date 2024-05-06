import { createSlice } from "@reduxjs/toolkit"

export interface LoadingData {
    isLoading: boolean;
}
const initialState: LoadingData = {
    isLoading: false,
}
const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
       getLoading: (state, { payload }) => {
         state.isLoading = payload
       },
    }
})
export const { getLoading } = loadingSlice.actions;
export default loadingSlice.reducer; 