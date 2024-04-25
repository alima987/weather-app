import { format, fromUnixTime, parseISO } from "date-fns";
import { useQuery } from "react-query";
import WeatherIcons from "./WeatherIcons";
import { WiSunrise, WiSunset } from "react-icons/wi";
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
const SunMoon = () => {
    const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () =>
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=aktau&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&cnt=56`).then(res =>
          res.json()
        )
      )
    const date = data?.list[0]    
return (
    <div>
        <h2>SUN & MOON</h2>
        <div>
        <p>Sunrise</p>
        <WiSunrise className="w-12 h-12 mx-auto"/>
        {format(fromUnixTime(data?.city.sunrise ?? 1714008962),"H:mm")}
        </div>
        <div>
        <p>Sunset</p>
        <WiSunset className="w-12 h-12 mx-auto"/>
        {format(fromUnixTime(data?.city.sunset ?? 1714058994),"H:mm")}
        </div>
    </div>
)
}
export default SunMoon