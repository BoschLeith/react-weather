import { useQuery } from '@tanstack/react-query';

import { getDailyWeather } from '@/api/weather';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WeatherIcon } from '@/components/WeatherIcon';
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
    <div className="space-y-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">7-Day Weather Forecast</h2>
        <div>{place?.name}</div>
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-[230px] w-full" />
          ))}
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {data.daily.time.map((date, index) => (
            <Card key={date} className="shadow-lg p-4">
              <CardHeader>
                <h3 className="text-lg font-bold text-center">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </h3>
              </CardHeader>
              <CardContent>
                <WeatherIcon code={data.daily.weather_code[index]} />
              </CardContent>
              <CardFooter className="flex-row justify-center gap-4">
                <div className="font-semibold">
                  {data.daily.temperature_2m_max[index]}{' '}
                  {data.daily_units.temperature_2m_max}
                </div>
                <div className="text-gray-500">
                  {data.daily.temperature_2m_min[index]}{' '}
                  {data.daily_units.temperature_2m_min}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {!data && !isLoading && (
        <div className="text-center text-gray-500">
          <p className="text-lg">Please enter a location to see the forecast</p>
        </div>
      )}
    </div>
  );
};

export default DailyWeather;
