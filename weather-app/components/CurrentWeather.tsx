import { HTMLProps } from "react"


const CurrentWeather = (props: React.HTMLProps<HTMLDivElement>) => {
return (
    <div
    {...props}/>
)
}
export default CurrentWeather