import { PayloadAction, createSlice } from '@reduxjs/toolkit';


  export interface WeatherData {
    cnt: number;
    city: string;
    lat: number;
    lon: number;
    country: string;
    sunrise: number;
    sunset: number;
    list: [{dt: number;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    main: string;
    description: string;
    icon: string;
    speed: number;
    deg: number;
    gust: number;
    visibility: number;
    dt_txt: string;}]
  }
  
const initialState: WeatherData = { 
    cnt: 0,
    city: '-',
    lat: 0,
    lon: 0,
    country: '-',
    sunrise: 0,
    sunset: 0,
    list: [{
      dt: 0,
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      main: '-',
      description: '-',
      icon: '-',
      speed: 0,
      deg: 0,
      gust: 0,
      visibility: 0,
      dt_txt: '-',
  }],
}
const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeather: (state, action: PayloadAction<WeatherData>) => {
          state.city = action.payload.city;
          state.cnt = action.payload.cnt
          state.country = action.payload.country
          state.list = action.payload.list
      }
    }
})
export const { getWeather } = weatherSlice.actions;
export default weatherSlice.reducer;

  

