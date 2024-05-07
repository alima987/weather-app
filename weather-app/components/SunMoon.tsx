import { format, fromUnixTime, parseISO } from "date-fns";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SunMoon = () => {
    const {sunrise, sunset } = useSelector((state: RootState) => state.weather)
    return (
        <div className="text-center">
            <h2 className="text-sm text-gray-600 flex items-center justify-start mb-4">SUN & MOON</h2>
            <div className="flex items-center justify-center gap-20 p-5 mx-2 my-2 bg-100 rounded-lg shadow-md">
            <div className="flex justify-center">
                <div className="mr-2">
                    <WiSunrise className="w-12 h-12" />
                </div>
                <div>
                    <p className="text-sm font-semibold">Sunrise</p>
                    <p>{format(fromUnixTime(sunrise ?? 0), "H:mm")}</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="mr-2">
                    <WiSunset className="w-12 h-12" />
                </div>
                <div>
                    <p className="text-sm font-semibold">Sunset</p>
                    <p>{format(fromUnixTime(sunset ?? 0), "H:mm")}</p>
                </div>
            </div>
            </div>
        </div>
    );
}
export default SunMoon