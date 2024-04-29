import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import WeatherIcons from "./WeatherIcons";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
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

const WeeklyForecast = () => {
    /*const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () =>
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=aktau&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`).then(res =>
          res.json()
        )
      )
    const date = data?.list[0]*/
    const {list} = useSelector((state: RootState) => state.weather)
   
    const dates = [...new Set(list.map(entry => new Date(entry.dt * 1000).toISOString().split("T")[0]))];
    const oneDayForecasts = dates.map(date =>
        list.find(entry => new Date(entry.dt * 1000).toISOString().split("T")[0] === date)
    );
    return (
        <div>
             <h2 className="flex items-center justify-center">WEEKLY WEATHER FORECAST</h2>
             <div>
                {oneDayForecasts.map((d, i) => (
                  <div key={d?.dt}>
                  <p>{format(parseISO(d?.dt_txt ?? ""), "EEEE")}</p>
                  <p>{format(parseISO(d?.dt_txt ?? ""), "dd.MM")}</p>
                  <WeatherIcons
                  className="w-12 h-12 "
                  iconname={d?.icon ?? ''}
                />
                <p className="text-4xl font-bold">
                 {convertKelvinToCelsius(d?.temp ?? 293.82)}
                  </p>
                  <p>{convertKelvinToCelsius(d?.feels_like ?? 0)}°</p>
                  <p className="text-gray-600">{d?.description}</p>
                  </div>
                ))}
            </div>
        </div>
    )
}
export default WeeklyForecast