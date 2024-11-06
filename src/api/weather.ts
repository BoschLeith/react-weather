import type { Place } from '@/types/Place';

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

export const getDailyWeather = async (
  place: Place | null,
): Promise<DailyWeatherResponse | null> => {
  if (!place) {
    return null;
  }

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch daily weather data');
  }

  const data: DailyWeatherResponse = await response.json();
  return data;
};
