import { format, fromUnixTime, parseISO } from "date-fns";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SunMoon = () => {
    const {sunrise, sunset } = useSelector((state: RootState) => state.weather)
return (
    <div>
        <h2>SUN & MOON</h2>
        <div>
        <p>Sunrise</p>
        <WiSunrise className="w-12 h-12 mx-auto"/>
        {format(fromUnixTime(sunrise ?? 1714008962),"H:mm")}
        </div>
        <div>
        <p>Sunset</p>
        <WiSunset className="w-12 h-12 mx-auto"/>
        {format(fromUnixTime(sunset ?? 1714058994),"H:mm")}
        </div>
    </div>
)
}
export default SunMoon