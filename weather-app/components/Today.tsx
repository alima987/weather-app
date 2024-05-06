import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import getDayOfWeek from "@/utils/dayWeekAndMonth";
import { useEffect, useState } from "react";

const Today = () => {
  const WeatherData = useSelector((state: RootState) => state.weather.list);
  const { city, country, timezone } = useSelector((state: RootState) => state.weather);
  const [localTime, setLocalTime] = useState('');
  const getLocalTime = () => {
    let d = new Date();
    let utcTime =
        d.getTime() + d.getTimezoneOffset() * 60 * 1000 + timezone * 1000;
    d.setTime(utcTime);
    setLocalTime(
        d.toLocaleTimeString('us-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
    );
};
useEffect(() => {
    getLocalTime();
}, [timezone]);


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="text-lg font-bold mb-2 text-left">{city}, {country}</div>
      <div className="text-right flex justify-between gap-5">
      <div className="text-sm text-gray-600 mb-2">{getDayOfWeek(WeatherData[0].dt_txt ?? '')}</div>
      <div className="text-sm text-gray-600 mb-2">{WeatherData[0].dt_txt.split(' ')[0]}</div>
      <div className="text-sm text-gray-600">{localTime}</div>
      </div>
    </div>
  );
};

export default Today;
