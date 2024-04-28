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
import { RootState } from '../redux/store';

//https://api.openweathermap.org/data/2.5/forecast?q=aktau&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56
/*interface WeatherDetail {
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
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}*/

export default function Home() {
  const dispatch = useDispatch()
  const weatherData = useSelector((state: RootState) => state.weather);
  console.log(weatherData)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=aktau&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`)
      .then(response => {
        const data = response.data;
        /*const { name, cnt } = data;
        const { lat, lon } = data.city.coord;
        const { country, timezone, sunrise, sunset } = data.city;
        const { temp, humidity, feels_like, temp_min, temp_max, pressure, sea_level, grnd_level } = data.list[0].main;
        const { dt, dt_txt, visibility } = data.list[0];
        const { icon, description, main } = data.list[0].weather[0];
        const { speed, deg, gust } = data.list[0].wind;
  
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
            list: {
            dt: dt,
            temp: Number(temp.toFixed(0)),
            feels_like: feels_like,
            temp_min: temp_min,
            temp_max: temp_max,
            pressure: pressure,
            sea_level: sea_level,
            grnd_level: grnd_level,
            humidity: humidity,
            main: main,
            description: description,
            icon: icon,
            speed: speed,
            deg: deg,
            gust: gust,
            visibility: visibility,
            dt_txt: dt_txt,
          }[],*/
          const weatherDetails = data.list[0];
          const weatherPayload = {
            cnt: data.cnt,
            city: data.city.name,
            lat: data.city.coord.lat,
            lon: data.city.coord.lon,
            country: data.city.country,
            timezone: data.city.timezone,
            sunrise: data.city.sunrise,
            sunset: data.city.sunset,
            list: [{
              dt: weatherDetails.dt,
              main: {
                temp: weatherDetails.main.temp,
                feels_like: weatherDetails.main.feels_like,
                temp_min: weatherDetails.main.temp_min,
                temp_max: weatherDetails.main.temp_max,
                pressure: weatherDetails.main.pressure,
                sea_level: weatherDetails.main.sea_level,
                grnd_level: weatherDetails.main.grnd_level,
                humidity: weatherDetails.main.humidity,
                temp_kf: 0,
              },
              weather: [{
                id: weatherDetails.weather[0].id,
                main: weatherDetails.weather[0].main,
                description: weatherDetails.weather[0].description,
                icon: weatherDetails.weather[0].icon,
              }],
              clouds: {
                all: weatherDetails.clouds.all,
              },
              wind: {
                speed: weatherDetails.wind.speed,
                deg: weatherDetails.wind.deg,
                gust: weatherDetails.wind.gust,
              },
              visibility: weatherDetails.visibility,
              pop: weatherDetails.pop,
              sys: {
                pod: weatherDetails.sys.pod,
              },
              dt_txt: weatherDetails.dt_txt,
            }],
          };
          
          dispatch(getWeather(weatherPayload));
          
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }, []);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  /*const listLength = weathData.length || 0;
  const totalPages = Math.ceil(listLength / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = weatherData ? [weatherData] : [];



  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };*/

  /*if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error*/
  const data = weatherData?.list[0]
  if (!weatherData) return null; 
  const lat = 51.505;
  const lon = -0.09;
  
  return (
    <div>
      <Navbar />
      <main>
        <section>
         <div>
         <p>{weatherData?.list && weatherData.list.length > 0 ? format(parseISO(weatherData.list[0].dt_txt), "EEEE") : ''}</p>
         <p>{weatherData?.list && weatherData.list.length > 0 ? format(parseISO(weatherData.list[0].dt_txt), "dd.MM.yyyy") : ''}</p>
         </div>
         <CurrentWeather className="bg-blue-200 p-4 rounded-md shadow-md">
  <div className="text-center">
    <h2 className="text-xl font-bold">Current Weather</h2>
    <WeatherIcons
      className="w-12 h-12 mx-auto"
      iconname={data.weather && data.weather.length > 0 ? data.weather[0].icon : ""}
    />
    <p className="text-gray-600">{data.weather[0].description}</p>
    <p className="text-4xl font-bold">
      {convertKelvinToCelsius(data.main.temp ?? 293.82)}
      <span className="text-2xl">°C</span>
    </p>
  </div>
  <div className="mt-4 flex justify-around">
    <div className="text-center">
      <p className="font-bold">Real Feel</p>
      <p>{convertKelvinToCelsius(data.main.feels_like ?? 0)}°</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Temperature</p>
      <p>
        <span className="text-sm">Min: </span>
        {convertKelvinToCelsius(data.main.temp_min ?? 0)}°
      </p>
      <p>
        <span className="text-sm">Max: </span>
        {convertKelvinToCelsius(data.main.temp_max ?? 0)}°
      </p>
    </div>
  </div>
  <div className="mt-4 flex justify-around">
    <div className="text-center">
      <p className="font-bold">Humidity</p>
      <p>{`Humidity ${data.main.humidity}%`}</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Wind</p>
      <p>{`Wind ${convertWindSpeed(data.wind.speed ?? 0)} km/h`}</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Wind Gusts</p>
      <p>{`Wind Gusts ${convertWindSpeed(data.wind.gust ?? 0)} km/h`}</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Air Pressure</p>
      <p>{`Air Pressure ${data.main.pressure} hPa`}</p>
    </div>
  </div>
</CurrentWeather>
<div className="flex items-center justify-center">
{weatherData ? (
  <div>
    <p>{data.dt_txt ? format(parseISO(data.dt_txt), "h:mm a") : ''}</p>
    <WeatherIcons
      className="w-12 h-12 mx-auto"
      iconname={data.weather && data.weather.length > 0 ? data.weather[0].icon : ""}
    />
    <p>{convertKelvinToCelsius(data.main.temp ?? 0)}°</p>
  </div>
) : (
  <p>No data available</p>
)}
</div>
<div>
  <WeeklyForecast />
  <SunMoon />
  <WeatherMap lat={lat} lon={lon} />
</div>
        </section>
      </main>
    </div>
  );
}