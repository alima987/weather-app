import { CgSun } from "react-icons/cg"
import Search from "./Search"
import { ChangeEvent, useState } from "react"
import { getCurrentCity } from "@/redux/slices/citySlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from 'axios';
export default function Navbar() {
    const [city, setCity] = useState('')
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (city.trim() === '') {
            console.error('City is empty');
            return;
        }
    
        dispatch(getCurrentCity(city));
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    }
    console.log(handleChange)
    return ( 
        <nav className="bg-gray-800 text-white p-4">
        <div className="flex items-center">
            <h2 className="text-lg font-bold">Weather</h2>
            <CgSun className="ml-2 w-6 h-6" />
        </div>
        <Search 
        value={city}
        onSubmit={handleSearch} 
        onChange={handleChange}
        />
    </nav>
    )
}