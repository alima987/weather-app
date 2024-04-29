'use client'
import CurrentWeather from "@/components/CurrentWeather";
import Navbar from "@/components/Navbar";
import WeatherIcons from "@/components/WeatherIcons";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import convertWindSpeed from "@/utils/convertWindSpeed";
import { format, parseISO } from "date-fns";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from 'react';
import WeeklyForecast from "@/components/WeeklyForecast";
import SunMoon from "@/components/SunMoon";
import 'leaflet/dist/leaflet.css';
import WeatherMap from "@/components/WeatherMap";
import axios from 'axios';
import { getWeather } from "@/redux/slices/weatherSlice";
import { useDispatch, useSelector } from "../redux/store"
import Today from "@/components/Today";

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=aktau&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`)
    .then(response => {
      const data = response.data;
      const { cnt } = data
      const { name, country, sunrise, sunset } = data.city;
      const { lat, lon } = data.city.coord
      const { icon, description, main } = data.list[0].weather[0];
      const { temp, humidity, feels_like, temp_min, temp_max, pressure} = data.list[0].main;
      const { speed, deg, gust } = data.list[0].wind;
      const { dt } = data.list[0]
      const { visibility } = data.list[0]
      const { dt_txt } = data.list[0]

      dispatch(
        getWeather({
          cnt: cnt,
          city: name,
          lat: lat,
          lon: lon,
          country: country,
          sunrise: sunrise,
          sunset: sunset,
          list: [{
          dt: dt,
          temp: Number(temp.toFixed(0)),
          feels_like: feels_like,
          temp_min: temp_min,
          temp_max: temp_max,
          pressure: pressure,
          humidity: humidity,
          main: main,
          description: description,
          icon: icon,
          speed: speed,
          deg: deg,
          gust: gust,
          visibility: visibility,
          dt_txt: dt_txt ,
        }],
          }))
          })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
  }, [])
  const lat = 51.505;
  const lon = -0.09;
  
  return (
    <div>
      <Navbar />
      <main>
        <section>
  <Today />
  <CurrentWeather />
  
  <SunMoon />
  <WeatherMap lat={lat} lon={lon} />
        </section>
      </main>
    </div>
  );
}