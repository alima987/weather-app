'use client';
import { LuSearch } from "react-icons/lu"
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { getCurrentCity } from "@/redux/slices/citySlice"

  
const Search = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
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
    <form onSubmit={handleSearch} className="flex items-center justify-end">
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