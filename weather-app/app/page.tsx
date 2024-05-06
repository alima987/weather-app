'use client'
import CurrentWeather from "@/components/CurrentWeather";
import Navbar from "@/components/Navbar";
import { useEffect } from 'react';
import WeeklyForecast from "@/components/WeeklyForecast";
import SunMoon from "@/components/SunMoon";
import 'leaflet/dist/leaflet.css';
import WeatherMap from "@/components/WeatherMap";
import axios from 'axios';
import { getWeather } from "@/redux/slices/weatherSlice";
import { useDispatch, useSelector } from "../redux/store"
import Today from "@/components/Today";
import HourlyWeather from "@/components/HourlyWeather";
import { RootState } from "../redux/store";
import Search from '../components/Search';
import { getLoading } from "@/redux/slices/loadingSlice";
import Footer from "@/components/Footer";

interface WeatherListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  dt_txt: string;
}
export default function Home() {
  const dispatch = useDispatch()
  const {currentCity} = useSelector((state: RootState) => state.city)
  useEffect(() => {
    dispatch(getLoading(true));
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`)
    .then(response => {
      dispatch(getLoading(true));
      const data = response.data;
      const { cnt } = data
      const { name, country, sunrise, sunset, timezone } = data.city;
      const { lat, lon } = data.city.coord
      const weatherList = data.list.map((item: WeatherListItem) => ({
        dt: item.dt,
        temp: Number(item.main.temp.toFixed(0)),
        feels_like: item.main.feels_like,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        main: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        speed: item.wind.speed,
        deg: item.wind.deg,
        gust: item.wind.gust,
        visibility: item.visibility,
        dt_txt: item.dt_txt,
      }));
  

      dispatch(
        getWeather({
          cnt: cnt,
          city: name,
          lat: lat,
          lon: lon,
          country: country,
          timezone: timezone,
          sunrise: sunrise,
          sunset: sunset,
          list: weatherList,
          }))
          })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
  }, [currentCity])
  
  return (
  <div>
  <Navbar />
    <main className="p-4">
      <section className="max-w-4xl mx-auto">
  <Search />
  <Today />
  <CurrentWeather />
  <HourlyWeather />
  <WeeklyForecast />
  <SunMoon />
  <WeatherMap currentCity={currentCity ?? ''} />
      </section>
    </main>
  <Footer />
  </div>
  );
}