import { CgSun } from "react-icons/cg"
import { LuSearch } from "react-icons/lu"
export default function Navbar() {
    return ( 
        <nav className="bg-gray-800 text-white p-4">
        <div className="flex items-center">
            <h2 className="text-lg font-bold">Weather</h2>
            <CgSun className="ml-2 w-6 h-6" />
        </div>
        <section className="mt-4 flex">
            <input 
                type="text"
                className="px-2 py-1 border rounded-l"
                placeholder="Search city"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-r">
                <LuSearch className="w-6 h-6" />
            </button>
        </section>
    </nav>
    )
}