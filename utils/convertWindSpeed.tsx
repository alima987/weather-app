export default function convertWindSpeed(metersPerSecond: number): string {
      const kmH = metersPerSecond * 3.6;
    return `${kmH.toFixed(0)} km/h`
}