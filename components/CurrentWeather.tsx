import WeatherIcons from "./WeatherIcons"
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius"
import convertWindSpeed from "@/utils/convertWindSpeed"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"

const CurrentWeather = () => {
   const {list} = useSelector((state: RootState) => state.weather)
   
   
   return (
<div className="bg-200 p-4 rounded-md shadow-md mb-10">
      <div className="text-center">
      <h2 className="text-sm text-gray-600 flex items-center justify-start mb-4">CURRENT FORECAST </h2>
    </div>
  <div className="flex flex-wrap items-center justify-around">
    <div className="mt-4 flex flex-wrap items-center justify-start">
      <div className="flex flex-col px-4">
      <WeatherIcons
        className="w-12 h-12 mx-auto"
        iconname={list[0].icon ?? ""}
      />
      <p className="text-gray-600 w-1/2">{list[0].description}</p>
      </div>
      <div className="flex flex-col px-4 ">
      <p className="text-4xl font-bold w-1/2">
        {convertKelvinToCelsius(list[0].temp ?? 0)}
        <span className="text-2xl">°C</span>
      </p>
      <div className="text-sm flex flex-wrap gap-2">
      <p className="text-gray-800">Real Feel:</p>
        <p>{convertKelvinToCelsius(list[0].feels_like ?? 0)}°</p>
      </div>
      <div className="text-sm flex flex-wrap gap-2">
      <p >
          <span className="text-sm w-1/2">Min: </span>
          {convertKelvinToCelsius(list[0].temp_min ?? 0)}°
        </p>
        <p>
          <span className="text-sm w-1/2">Max: </span>
          {convertKelvinToCelsius(list[0].temp_max ?? 0)}°
        </p>
      </div>
      </div>
    </div>
  <div className="mt-4 flex flex-wrap flex-col justify-center">
      <div className="text-center flex flex-wrap gap-12">
        <p className="text-gray-800">Humidity  </p>
        <p className="text-center font-bold text-gray-800">{`${list[0].humidity}%`}</p>
      </div>
      <div className="text-center flex flex-wrap gap-20 ">
        <p className="text-gray-800">Wind      </p>
        <p className="font-bold text-gray-800">{`${convertWindSpeed(list[0].speed ?? 0)} km/h`}</p>
      </div>
      <div className="text-center flex flex-wrap gap-8 ">
        <p className="text-gray-800">Wind Gusts</p>
        <p className="font-bold text-gray-800">{`${convertWindSpeed(list[0].gust ?? 0)} km/h`}</p>
      </div>
      <div className="text-center flex flex-wrap gap-7">
        <p className="text-gray-800">Air Pressure</p>
        <p className="font-bold text-gray-800">{`${list[0].pressure} hPa`}</p>
      </div>
    </div>
  </div>
</div>
)
}
export default CurrentWeather  