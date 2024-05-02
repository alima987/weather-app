import WeatherIcons from "./WeatherIcons";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import getDayOfWeek from "@/utils/dayWeekAndMonth";
import { getDayOfMonth } from "@/utils/dayWeekAndMonth";

const WeeklyForecast = () => {
    const WeatherData = useSelector((state: RootState) => state.weather.list)
    console.log(WeatherData)
   
    const dates = [...new Set(WeatherData.map(entry => new Date(entry.dt * 1000).toISOString().split("T")[0]))];
    const oneDayForecasts = dates.map(date =>
        WeatherData.find(entry => new Date(entry.dt * 1000).toISOString().split("T")[0] === date)
    );
    

    return (
        <div>
             <h2 className="flex items-center justify-center">WEEKLY WEATHER FORECAST</h2>
             <div>
                {oneDayForecasts.map((d, i) => (
                 <div key={i}>
                  <p>{getDayOfWeek(d?.dt_txt ?? '')}</p>
                  <p>{getDayOfMonth(d?.dt_txt ?? '')}</p>
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