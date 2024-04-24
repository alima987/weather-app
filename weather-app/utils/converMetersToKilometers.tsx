const convertMetersToKilometers = (meters: number): string => {
    const km = (meters / 1000);
    return `${km.toFixed(0)} km`
}
export default convertMetersToKilometers