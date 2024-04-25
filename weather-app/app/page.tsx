'use client'
import CurrentWeather from "@/components/CurrentWeather";
import Navbar from "@/components/Navbar";
import WeatherIcons from "@/components/WeatherIcons";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import convertWindSpeed from "@/utils/convertWindSpeed";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useQuery } from "react-query";
import Pagination from "@/components/Pagination";
import { useState } from 'react';
import WeeklyForecast from "@/components/WeeklyForecast";
import SunMoon from "@/components/SunMoon";
import 'leaflet/dist/leaflet.css';
import WeatherMap from "@/components/WeatherMap";


//https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=3cda6a55122315a33e6821040c4177e9&cnt=56
//https://api.openweathermap.org/data/2.5/forecast?q=aktau&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56
interface WeatherDetail {
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
}
export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () =>
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=aktau&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`).then(res =>
      res.json()
    )
  )
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const listLength = data?.list.length || 0;
  const totalPages = Math.ceil(listLength / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.list.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error
  console.log(data)
  if (!data) return null; 
  const date = data?.list[0]
  const lat = 51.505;
  const lon = -0.09;
  
  return (
    <div>
      <Navbar />
      <main>
        <section>
         <div>
         <p>{format(parseISO(date?.dt_txt ?? ""), "EEEE")}</p>
         <p>{format(parseISO(date?.dt_txt ?? ""), "dd.MM.yyyy")}</p>
         </div>
         <CurrentWeather className="bg-blue-200 p-4 rounded-md shadow-md">
  <div className="text-center">
    <h2 className="text-xl font-bold">Current Weather</h2>
    <WeatherIcons
      className="w-12 h-12 mx-auto"
      iconname={data?.list[0].weather[0].icon ?? ""}
    />
    <p className="text-gray-600">{date?.weather[0].description}</p>
    <p className="text-4xl font-bold">
      {convertKelvinToCelsius(date?.main.temp ?? 293.82)}
      <span className="text-2xl">°C</span>
    </p>
  </div>
  <div className="mt-4 flex justify-around">
    <div className="text-center">
      <p className="font-bold">Real Feel</p>
      <p>{convertKelvinToCelsius(date?.main.feels_like ?? 0)}°</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Temperature</p>
      <p>
        <span className="text-sm">Min: </span>
        {convertKelvinToCelsius(date?.main.temp_min ?? 0)}°
      </p>
      <p>
        <span className="text-sm">Max: </span>
        {convertKelvinToCelsius(date?.main.temp_max ?? 0)}°
      </p>
    </div>
  </div>
  <div className="mt-4 flex justify-around">
    <div className="text-center">
      <p className="font-bold">Humidity</p>
      <p>{`Humidity ${date?.main.humidity}%`}</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Wind</p>
      <p>{`Wind ${convertWindSpeed(date?.wind.speed ?? 0)} km/h`}</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Wind Gusts</p>
      <p>{`Wind Gusts ${convertWindSpeed(date?.wind.gust ?? 0)} km/h`}</p>
    </div>
    <div className="text-center">
      <p className="font-bold">Air Pressure</p>
      <p>{`Air Pressure ${date?.main.pressure} hPa`}</p>
    </div>
  </div>
</CurrentWeather>
<div>
  <h2 className="flex items-center justify-center">Hourly Weather</h2>
  <div className="flex items-center justify-center">
  {currentItems ? (
            currentItems.map((dt, i) => (
              <div key={i}>
                <p>{format(parseISO(dt?.dt_txt), "h:mm a")}</p>
                <WeatherIcons
                  className="w-12 h-12 mx-auto"
                  iconname={dt.weather[0].icon ?? ""}
                />
                <p>{convertKelvinToCelsius(dt?.main.temp ?? 0)}°</p>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
  </div>
  <Pagination
       currentPage={currentPage}
       totalPages={totalPages}
       paginate={paginate}
      />
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
