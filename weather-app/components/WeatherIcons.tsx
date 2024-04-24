const WeatherIcons = (props: React.HTMLProps<HTMLDivElement> & { iconName: string }) => {
 return (
<div {...props}>
    <img 
    width={100}
    height={100}
    src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}/>
</div>
 )
}
export default WeatherIcons