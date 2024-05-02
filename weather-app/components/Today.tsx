import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Today = () => {
  const { list } = useSelector((state: RootState) => state.weather);

  if (!list) {
    return <div>No data available</div>;
  }

  if (!list[0].dt_txt) {
    return <div>No date and time available</div>;
  }

  let formattedDate = "";
  try {
    const date = parseISO(list[0].dt_txt);
    formattedDate = `${format(date, "EEEE")}, ${format(date, "dd.MM.yyyy")}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return <div>Error formatting date</div>;
  }

  return (
    <div>
      <div>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default Today;
