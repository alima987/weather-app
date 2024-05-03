import { CgSun } from "react-icons/cg"
import Search from "./Search"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { getCurrentCity } from "@/redux/slices/citySlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from 'axios';
export default function Navbar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('')
    const { currentCity } = useSelector((state: RootState) => state.city);
    const handleSearch = ()=> {
        dispatch(getCurrentCity(input));
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    return ( 
        <nav className="bg-gray-800 text-white p-4">
        <div className="flex items-center">
            <h2 className="text-lg font-bold">Weather</h2>
            <CgSun className="ml-2 w-6 h-6" />
        </div>
        <form onSubmit={handleSearch}>
    <input
        type="search"
        value={currentCity}
        onChange={handleChange}
        placeholder="Search city"
    />
    <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-r"
    >
        <LuSearch className="w-6 h-6" />
    </button>
</form>
    </nav>
    )
}