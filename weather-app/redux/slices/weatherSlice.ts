import { PayloadAction, createSlice } from '@reduxjs/toolkit';


  interface WeatherData {
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
          state.list[0].deg = action.payload.list[0].deg
          state.list[0].description = action.payload.list[0].description
          state.list[0].dt = action.payload.list[0].dt
          state.list[0].dt_txt = action.payload.list[0].dt_txt
          state.list[0].feels_like = action.payload.list[0].feels_like
          state.list[0].gust = action.payload.list[0].gust
          state.list[0].humidity = action.payload.list[0].humidity
          state.list[0].icon = action.payload.list[0].icon
          state.list[0].main = action.payload.list[0].main
          state.list[0].pressure = action.payload.list[0].pressure
          state.list[0].speed = action.payload.list[0].speed
          state.list[0].temp = action.payload.list[0].temp
          state.list[0].temp_max = action.payload.list[0].temp_max
          state.list[0].temp_min = action.payload.list[0].temp_min
          state.list[0].visibility = action.payload.list[0].visibility
      }
    }
})
export const { getWeather } = weatherSlice.actions;
export default weatherSlice.reducer;

  

