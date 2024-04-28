import { PayloadAction, createSlice } from '@reduxjs/toolkit';

  interface WeatherData {
    cnt: number;
    city: string;
    lat: number;
    lon: number;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
    list: {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
      }[];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      sys: {
        pod: string;
      };
      dt_txt: string;
    }[];
  }
  
const initialState: WeatherData = {
    cnt: 0,
    city: '',
    lat: 0,
    lon: 0,
    country: '',
    timezone: 0,
    sunrise: 0,
    sunset: 0,
    list: [],
}
const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeather: (state, action: PayloadAction<WeatherData>) => {
            state.city = action.payload.city
            state.cnt = action.payload.cnt
            state.country = action.payload.country
            state.list[0].weather[0].description = action.payload.list[0].weather[0].description
            state.list[0].dt = action.payload.list[0].dt
            state.list[0].dt_txt = action.payload.list[0].dt_txt 
            state.list[0].main.feels_like = action.payload.list[0].main.feels_like
            state.list[0].main.grnd_level = action.payload.list[0].main.grnd_level
            state.list[0].wind.gust = action.payload.list[0].wind.gust
            state.list[0].main.humidity = action.payload.list[0].main.humidity
            state.list[0].weather[0].icon = action.payload.list[0].weather[0].icon
            state.lat = action.payload.lat
            state.lon = action.payload.lon
            state.list[0].weather[0].main = action.payload.list[0].weather[0].main
            state.list[0].main.pressure = action.payload.list[0].main.pressure
            state.list[0].main.sea_level = action.payload.list[0].main.sea_level
            state.list[0].wind.speed = action.payload.list[0].wind.speed
            state.list[0].wind.deg = action.payload.list[0].wind.deg
            state.sunrise= action.payload.sunrise
            state.sunset = action.payload.sunset
            state.list[0].main.temp = action.payload.list[0].main.temp
            state.list[0].main.temp_max = action.payload.list[0].main.temp_max
            state.list[0].main.temp_min = action.payload.list[0].main.temp_min
            state.timezone = action.payload.timezone
            state.list[0].visibility = action.payload.list[0].visibility
      }
    }
})
export const { getWeather } = weatherSlice.actions;
export default weatherSlice.reducer;

