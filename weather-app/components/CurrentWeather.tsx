import { HTMLProps } from "react"
import WeatherIcons from "./WeatherIcons"
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius"
import convertWindSpeed from "@/utils/convertWindSpeed"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"
import { format, parseISO } from "date-fns";

const CurrentWeather = () => {
   const {icon, description, temp, feels_like, temp_min, temp_max, humidity, speed, gust, pressure, dt_txt} = useSelector((state: RootState) => state.weather)
   
    return (
        <div className="bg-blue-200 p-4 rounded-md shadow-md">
        <div className="text-center">
          <h2 className="text-xl font-bold">Current Weather</h2>
          <WeatherIcons
            className="w-12 h-12 mx-auto"
            iconname={icon ?? ""}
          />
          <p className="text-gray-600">{description}</p>
          <p className="text-4xl font-bold">
            {convertKelvinToCelsius(temp ?? 0)}
            <span className="text-2xl">°C</span>
          </p>
        </div>
        <div className="mt-4 flex justify-around">
          <div className="text-center">
            <p className="font-bold">Real Feel</p>
            <p>{convertKelvinToCelsius(feels_like ?? 0)}°</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Temperature</p>
            <p>
              <span className="text-sm">Min: </span>
              {convertKelvinToCelsius(temp_min ?? 0)}°
            </p>
            <p>
              <span className="text-sm">Max: </span>
              {convertKelvinToCelsius(temp_max ?? 0)}°
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-around">
          <div className="text-center">
            <p className="font-bold">Humidity</p>
            <p>{`Humidity ${humidity}%`}</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Wind</p>
            <p>{`Wind ${convertWindSpeed(speed ?? 0)} km/h`}</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Wind Gusts</p>
            <p>{`Wind Gusts ${convertWindSpeed(gust ?? 0)} km/h`}</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Air Pressure</p>
            <p>{`Air Pressure ${pressure} hPa`}</p>
          </div>
        </div>
      </div>
    )
}
export default CurrentWeather