import { useQuery } from '@tanstack/react-query';

import { getDailyWeather } from '@/api/weather';
import type { Place } from '@/types/Place';

interface MapProps {
  place: Place | null;
}

const DailyWeather = ({ place }: MapProps) => {
  const { data, error, isLoading } = useQuery({
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
