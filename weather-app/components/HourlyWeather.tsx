import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { format, parseISO } from "date-fns";
import WeatherIcons from "./WeatherIcons"
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius"
import Pagination from "./Pagination";
import { useState } from "react";
import formatTime from "@/utils/formatTime";
const HourlyWeather = () => {
  const WeatherData = useSelector((state: RootState) => state.weather.list)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const listLength = WeatherData.length || 0;
  const totalPages = Math.ceil(listLength / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = WeatherData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
    return (
        <div>
        <h2 className="flex items-center justify-center">Hourly Weather</h2>
        <div className="flex items-center justify-center">
        {currentItems ? (
                  currentItems.map((dt, i) => (
                    <div key={i}>
                      <p>{formatTime(dt.dt_txt)}</p>
                      <WeatherIcons
                        className="w-12 h-12 mx-auto"
                        iconname={dt.icon ?? ""}
                      />
                      <p>{convertKelvinToCelsius(dt?.temp ?? 0)}°</p>
                    </div>
                  ))
                ) : (
                  <p>No data available</p>
                )}
        </div>
        <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             paginate={paginate}
            />
      </div>
    )
}
export default HourlyWeather