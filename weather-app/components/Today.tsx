import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import getDayOfWeek from "@/utils/dayWeekAndMonth";

const Today = () => {
  const WeatherData = useSelector((state: RootState) => state.weather.list);

  return (
    <div>
      <div>
      <p>{getDayOfWeek(WeatherData[0].dt_txt ?? '')}</p>
      <p>{WeatherData[0].dt_txt.split(' ')[0]}</p>
      </div>
    </div>
  );
};

export default Today;
