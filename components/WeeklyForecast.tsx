import WeatherIcons from "./WeatherIcons";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import getDayOfWeek from "@/utils/dayWeekAndMonth";
import { getDayOfMonth } from "@/utils/dayWeekAndMonth";

const WeeklyForecast = () => {
    const WeatherData = useSelector((state: RootState) => state.weather.list)
   
    const dates = [...new Set(WeatherData.map(entry => new Date(entry.dt * 1000).toISOString().split("T")[0]))];
    const oneDayForecasts = dates.map(date =>
        WeatherData.find(entry => new Date(entry.dt * 1000).toISOString().split("T")[0] === date)
    );
    

    return (
        <div>
            <h2 className="text-sm text-gray-600 flex items-center justify-start mb-4 mx-4">WEEKLY FORECAST</h2>
            <div className="flex w-full flex-col gap-4 mb-10">
                {oneDayForecasts.map((d, i) => (
               <div key={i} className="w-full flex flex-wrap items-center justify-between p-5 mx-2 my-2 bg-100 rounded-lg shadow-md gap-4">
               <div className=" flex flex-wrap gap-10 items-center px-4  ">
               <div className="flex flex-col px-4">
             <p className="text-lg font-bold">{getDayOfWeek(d?.dt_txt ?? '')}</p>
             <p>{getDayOfMonth(d?.dt_txt ?? '')}</p>
             </div>
             <WeatherIcons
                 className="w-12 h-12"
                 iconname={d?.icon ?? ''}
             />
               </div>
               <div className=" overflow-x-auto flex flex-wrap justify-between w-1/2 gap-4 px-4 ">
               <p className="text-4xl font-bold">
                 {convertKelvinToCelsius(d?.temp ?? 293.82)}°
             </p>
             <div>
             <p className="">Feels like</p>
             <p>{convertKelvinToCelsius(d?.feels_like ?? 0)}°</p>
             </div>
             <div className="flex flex-col px-4">
             <p className="text-gray-600 font-bold">{d?.main}</p>
             <p className="text-gray-600">{d?.description}</p>
             </div> 
               </div>
           </div>  
                ))}
            </div>
        </div>
    )
}
export default WeeklyForecast 