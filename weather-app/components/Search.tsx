import { LuSearch } from "react-icons/lu"
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentCity } from "@/redux/slices/citySlice"
import { RootState } from "@/redux/store"

const Search = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const { currentCity } = useSelector((state: RootState) => state.city);
    console.log(currentCity)
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city && city.trim() !== '') {
            dispatch(getCurrentCity(city.trim()));
        }
          return;
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };
return (
    <form onSubmit={handleSearch} className="flex items-center justify-center mt-8">
    <div className="flex items-center border border-gray-300 rounded-md p-1">
        <LuSearch className="w-6 h-6 mr-2 text-gray-500" />
        <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Search city"
            className="outline-none"
        />
    </div>
</form>
)
}
export default Search