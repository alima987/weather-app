'use client'
import { Suspense } from 'react';
import dynamic from 'next/dynamic'
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { getWeather } from "@/redux/slices/weatherSlice";
import { useDispatch, useSelector } from "../redux/store"
import { RootState } from "../redux/store";
import { getLoading } from "@/redux/slices/loadingSlice";

const CurrentWeather = dynamic(() => import('@/components/CurrentWeather'), { ssr: false })
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })
const WeeklyForecast = dynamic(() => import('@/components/WeeklyForecast'), { ssr: false })
const SunMoon = dynamic(() => import('@/components/SunMoon'), { ssr: false })
const WeatherMap = dynamic(() => import('@/components/WeatherMap'), { ssr: false })
const Today = dynamic(() => import('@/components/Today'), { ssr: false })
const HourlyWeather = dynamic(() => import('@/components/HourlyWeather'), { ssr: false })
const Search = dynamic(() => import('../components/Search'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })
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
      dispatch(getLoading(false));
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
  <Suspense fallback={<div>Loading...</div>}>
  <Navbar />
    <main className="p-4">
      <section className="max-w-4xl mx-auto bg-blue-gray-100">
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
  </Suspense>
  </div>
  );
}