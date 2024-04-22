'use client'
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useQuery } from "react-query";

//https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=3cda6a55122315a33e6821040c4177e9&cnt=56
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
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`).then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error
  console.log(data)
  return (
    <div>
      <Navbar />
    </div>
  );
}
