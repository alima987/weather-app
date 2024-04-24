'use client'
import CurrentWearther from "@/components/CurrentWeather";
import Navbar from "@/components/Navbar";
import WeatherIcons from "@/components/WeatherIcons";
import convertMetersToKilometers from "@/utils/converMetersToKilometers";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import convertWindSpeed from "@/utils/convertWindSpeed";
import { format, parseISO } from "date-fns";
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
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=aktau&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`).then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error
  console.log(data)
  const date = data?.list[0]
  return (
    <div>
      <Navbar />
      <main>
        <section>
         <div>
         <p>{format(parseISO(date?.dt_txt ?? ""), "EEEE")}</p>
         <p>{format(parseISO(date?.dt_txt ?? ""), "dd.MM.yyyy")}</p>
         </div>
       <CurrentWearther>
        <div>
        <h2>Current Weather</h2>
        <WeatherIcons iconName={data?.list[0].weather[0].icon ?? ''} />
        {convertKelvinToCelsius(date?.main.temp ?? 293.82)}°
        <span>C</span>
        </div>
        <div>
          <p>Real Feel</p>
          {convertKelvinToCelsius(date?.main.feels_like ?? 0)}°
        </div>
        <div>
          <span>{convertKelvinToCelsius(date?.main.temp_min ?? 0)}°↓</span>
          <span>{convertKelvinToCelsius(date?.main.temp_max ?? 0)}°↑</span>
        </div>
        <div>
          <span>{`Humidity ${date?.main.humidity}%`}</span>
          <span>{`Wind ${convertWindSpeed(date?.wind.speed ?? 0)}km/h`}</span>
          <span>{`Wind Gusts ${convertWindSpeed(date?.wind.gust ?? 0)}km/h`}</span>
          <span>{`Air Pressure ${date?.main.pressure} hPa`}</span>
        </div>
       </CurrentWearther>
        </section>
      </main>
    </div>
  );
}
