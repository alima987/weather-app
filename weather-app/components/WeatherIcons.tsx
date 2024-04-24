
const WeatherIcons = (props: React.HTMLProps<HTMLDivElement> & { iconname: string }) => {
 return (
<div {...props}>
    <img
    width={100}
    height={100}
    alt="icon"
    src={`https://openweathermap.org/img/wn/${props.iconname}@4x.png`}/>
</div>
 )
}
export default WeatherIcons