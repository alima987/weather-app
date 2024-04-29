import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Today = () => {
const {list} = useSelector((state: RootState) => state.weather);
console.log(list)
return (
    <div>
        <div>
        <p>{format(parseISO(list[0].dt_txt), "EEEE")}</p>
         <p>{format(parseISO(list[0].dt_txt), "dd.MM.yyyy")}</p>
         </div>
    </div>
)
}
export default Today