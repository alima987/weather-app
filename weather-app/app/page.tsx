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
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { LuSearch } from "react-icons/lu"
import Search from '../components/Search';
import { useWeather } from "@/context/weatherContext";

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
  /*const {
    dispatch,
    currentCity
  } = useWeather();*/
  const dispatch = useDispatch()
  const {currentCity} = useSelector((state: RootState) => state.city)
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`)
    .then(response => {
      const data = response.data;
      const { cnt } = data
      const { name, country, sunrise, sunset } = data.city;
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
          sunrise: sunrise,
          sunset: sunset,
          list: weatherList,
          }))
          })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
  }, [currentCity])
  
  const lat = 51.505;
  const lon = -0.09;
  
  return (
    <div>
      <Navbar />
      <main>
        <section>
  <Search />
  <Today />
  <CurrentWeather />
  <HourlyWeather />
  <WeeklyForecast />
  <SunMoon />
  <WeatherMap lat={lat} lon={lon} />
        </section>
      </main>
    </div>
  );
}