import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Today = () => {
const {dt_txt, dt} = useSelector((state: RootState) => state.weather);
console.log(dt)
return (
    <div>
        <div>
        <p>{format(parseISO(dt_txt), "EEEE")}</p>
         <p>{format(parseISO(dt_txt), "dd.MM.yyyy")}</p>
         </div>
    </div>
)
}
export default Today