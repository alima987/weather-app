import { CgSun } from "react-icons/cg"
export default function Navbar() {
    return ( 
        <nav className="bg-gray-800 text-white p-4">
        <div className="flex items-center">
            <h2 className="text-lg font-bold">Weather</h2>
            <CgSun className="ml-2 w-6 h-6" />
        </div>
    </nav>
    )
}