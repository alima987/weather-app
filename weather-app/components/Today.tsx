import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import getDayOfWeek from "@/utils/dayWeekAndMonth";

const Today = () => {
  const WeatherData = useSelector((state: RootState) => state.weather.list);
  const { city, country } = useSelector((state: RootState) => state.weather);
  //const { currentCity } = useSelector((state: RootState) => state.city);
  return (
    <div>
      <div>
      <p>{city}, {country}</p>
      <p>{getDayOfWeek(WeatherData[0].dt_txt ?? '')}</p>
      <p>{WeatherData[0].dt_txt.split(' ')[0]}</p>
      </div>
    </div>
  );
};

export default Today;
