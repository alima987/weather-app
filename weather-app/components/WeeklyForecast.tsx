import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";
import WeatherIcons from "./WeatherIcons";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const WeeklyForecast = () => {
    const WeatherData = useSelector((state: RootState) => state.weather.list)
    console.log(WeatherData)
   
    /*const dates = [...new Set(list.map(entry => new Date(entry.dt * 1000).toISOString().split("T")[0]))];
    const oneDayForecasts = dates.map(date =>
        list.find(entry => new Date(entry.dt * 1000).toISOString().split("T")[0] === date)
    );*/
    if (!Array.isArray(WeatherData)) {
      return <div>Loading...</div>;
  }

    return (
        <div>
             <h2 className="flex items-center justify-center">WEEKLY WEATHER FORECAST</h2>
             <div>
                {WeatherData.map((d, i) => (
                 <div key={i}>
                  <p>{d?.dt_txt.split(" ")[0]}</p>
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