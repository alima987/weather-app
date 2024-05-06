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
        if (city && city !== '') {
            dispatch(getCurrentCity(city));
          }
          return;
    };
    console.log(dispatch(getCurrentCity(city)))
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };
return (
    <form 
    onSubmit={handleSearch}>
    <div>
    <LuSearch className="w-6 h-6" />
    </div>
    <input
        type="text"
        value={city} 
        onChange={handleChange}
        placeholder="Search city"
    />
</form>
)
}
export default Search