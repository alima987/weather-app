import WeatherIcons from "./WeatherIcons"
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius"
import convertWindSpeed from "@/utils/convertWindSpeed"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"

const CurrentWeather = () => {
   const {list} = useSelector((state: RootState) => state.weather)
   
   
   return (
<div className="bg-200 p-4 rounded-md shadow-md">
      <div className="text-center">
      <h2 className="text-xl font-bold">Current Weather</h2>
    </div>
  <div className="flex ">
    <div className="mt-4 flex flex-wrap items-center justify-start">
        <WeatherIcons
        className="w-12 h-12 mx-auto"
        iconname={list[0].icon ?? ""}
      />
      <p className="text-gray-600 w-1/2">{list[0].description}</p>
      <p className="text-4xl font-bold w-1/2">
        {convertKelvinToCelsius(list[0].temp ?? 0)}
        <span className="text-2xl">°C</span>
      </p>
      <div className="text-center w-1/2">
        <p className="font-bold">Real Feel</p>
        <p>{convertKelvinToCelsius(list[0].feels_like ?? 0)}°</p>
      </div>
        <p>
          <span className="text-sm w-1/2">Min: </span>
          {convertKelvinToCelsius(list[0].temp_min ?? 0)}°
        </p>
        <p>
          <span className="text-sm w-1/2">Max: </span>
          {convertKelvinToCelsius(list[0].temp_max ?? 0)}°
        </p>
    </div>
  <div className="mt-4 flex flex-wrap justify-end">
      <div className="text-center w-1/2">
        <p className="font-bold">Humidity</p>
        <p>{`Humidity ${list[0].humidity}%`}</p>
      </div>
      <div className="text-center w-1/2">
        <p className="font-bold">Wind</p>
        <p>{`Wind ${convertWindSpeed(list[0].speed ?? 0)} km/h`}</p>
      </div>
      <div className="text-center w-1/2">
        <p className="font-bold">Wind Gusts</p>
        <p>{`Wind Gusts ${convertWindSpeed(list[0].gust ?? 0)} km/h`}</p>
      </div>
      <div className="text-center w-1/2">
        <p className="font-bold">Air Pressure</p>
        <p>{`Air Pressure ${list[0].pressure} hPa`}</p>
      </div>
    </div>
  </div>
</div>
)
}
export default CurrentWeather  