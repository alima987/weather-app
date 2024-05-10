import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';

interface WeatherMapProps {
  currentCity: string;
}

const WeatherMap = ({ currentCity }: WeatherMapProps) => {
  const [center, setCenter] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`);
        const data = await response.json();
        if (response.ok) {
          const { coord } = data;
          setCenter([coord.lat, coord.lon]);
        } else {
          console.error("Failed to fetch coordinates:", data.message);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (currentCity) {
      getCoordinates();
    }
  }, [currentCity]);
  useEffect(() => {
    if (currentCity && center) {
      setCenter(center);
    }
  }, [currentCity, center]);

  if (!center) {
    return null;
  }
console.log(center)
console.log(currentCity)
  return (
    <MapContainer center={center} zoom={10} className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {center && (
        <Marker position={center}>
          <Popup>{currentCity}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default WeatherMap;