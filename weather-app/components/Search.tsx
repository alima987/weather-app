import { LuSearch } from "react-icons/lu"
import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { getCurrentCity } from "@/redux/slices/citySlice"
type Props = {
    onSubmit: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
const Search = (props: Props) => {
    const [input, setInput] = useState('')

    
return (
    <form onSubmit={props.onSubmit}>
    <input
        type="search"
        value={props.value}
        onChange={(e) => props.onChange(e)}
        className="px-2 py-1 border rounded-l"
        placeholder="Search city"
    />
    <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-r"
    >
        <LuSearch className="w-6 h-6" />
    </button>
</form>
 
)
}
export default Search