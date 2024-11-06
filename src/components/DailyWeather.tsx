import { useQuery } from '@tanstack/react-query';

import { Place } from '@/components/LocationSearch';

interface DailyWeatherResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
}

interface MapProps {
  place: Place | null;
}

export const getDailyWeather = async (place: Place | null) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place?.latitude}&longitude=${place?.longitude}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`,
  );
  return await response.json();
};

const DailyWeather = ({ place }: MapProps) => {
  const { data, error, isLoading } = useQuery<DailyWeatherResponse>({
    queryKey: ['weather', place],
    queryFn: () => getDailyWeather(place),
    // The query will not execute until the place exists
    enabled: !!place,
  });

  return (
    <div>
      <h2>Daily Weather</h2>
      {place?.name}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <ul>
          {data.daily.time.map((date, index) => (
            <li key={date}>
              {date}: Max Temp: {data.daily.temperature_2m_max[index]}
              {data.daily_units.temperature_2m_max}, Min Temp:{' '}
              {data.daily.temperature_2m_min[index]}
              {data.daily_units.temperature_2m_min}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyWeather;
