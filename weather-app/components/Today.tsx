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
    <div>
      <div>
      <p>{city}, {country}</p>
      <p>{getDayOfWeek(WeatherData[0].dt_txt ?? '')}</p>
      <p>{WeatherData[0].dt_txt.split(' ')[0]}</p>
      {`${localTime}`}
      </div>
    </div>
  );
};

export default Today;
