import {
  WiDayCloudy,
  WiDayRain,
  WiDaySnow,
  WiDaySunny,
  WiDayThunderstorm,
} from 'react-icons/wi';

const weatherDescriptions = [
  { code: 0, description: 'Clear sky', icon: <WiDaySunny /> },
  { code: 1, description: 'Mainly clear', icon: <WiDaySunny /> },
  { code: 2, description: 'Partly cloudy', icon: <WiDayCloudy /> },
  { code: 3, description: 'Overcast', icon: <WiDayCloudy /> },
  {
    code: 45,
    description: 'Fog and depositing rime fog',
    icon: <WiDayCloudy />,
  },
  {
    code: 48,
    description: 'Fog and depositing rime fog',
    icon: <WiDayCloudy />,
  },
  { code: 51, description: 'Drizzle: Light intensity', icon: <WiDayRain /> },
  { code: 53, description: 'Drizzle: Moderate intensity', icon: <WiDayRain /> },
  { code: 55, description: 'Drizzle: Dense intensity', icon: <WiDayRain /> },
  {
    code: 56,
    description: 'Freezing Drizzle: Light intensity',
    icon: <WiDayRain />,
  },
  {
    code: 57,
    description: 'Freezing Drizzle: Dense intensity',
    icon: <WiDayRain />,
  },
  { code: 61, description: 'Rain: Slight intensity', icon: <WiDayRain /> },
  { code: 63, description: 'Rain: Moderate intensity', icon: <WiDayRain /> },
  { code: 65, description: 'Rain: Heavy intensity', icon: <WiDayRain /> },
  {
    code: 66,
    description: 'Freezing Rain: Light intensity',
    icon: <WiDayRain />,
  },
  {
    code: 67,
    description: 'Freezing Rain: Heavy intensity',
    icon: <WiDayRain />,
  },
  { code: 71, description: 'Snow fall: Slight intensity', icon: <WiDaySnow /> },
  {
    code: 73,
    description: 'Snow fall: Moderate intensity',
    icon: <WiDaySnow />,
  },
  { code: 75, description: 'Snow fall: Heavy intensity', icon: <WiDaySnow /> },
  { code: 77, description: 'Snow grains', icon: <WiDaySnow /> },
  {
    code: 80,
    description: 'Rain showers: Slight intensity',
    icon: <WiDayRain />,
  },
  {
    code: 81,
    description: 'Rain showers: Moderate intensity',
    icon: <WiDayRain />,
  },
  {
    code: 82,
    description: 'Rain showers: Violent intensity',
    icon: <WiDayRain />,
  },
  {
    code: 85,
    description: 'Snow showers: Slight intensity',
    icon: <WiDaySnow />,
  },
  {
    code: 86,
    description: 'Snow showers: Heavy intensity',
    icon: <WiDaySnow />,
  },
  {
    code: 95,
    description: 'Thunderstorm: Slight or moderate',
    icon: <WiDayThunderstorm />,
  },
  {
    code: 96,
    description: 'Thunderstorm with slight hail',
    icon: <WiDayThunderstorm />,
  },
  {
    code: 99,
    description: 'Thunderstorm with heavy hail',
    icon: <WiDayThunderstorm />,
  },
];

interface WeatherIconProps {
  code: number;
}

function getWeatherInfo(code: number) {
  const weather = weatherDescriptions.find((item) => item.code === code);
  return weather ? weather : { description: 'Unknown code', icon: null };
}

export const WeatherIcon = ({ code }: WeatherIconProps) => {
  const { icon } = getWeatherInfo(code);
  return <div className="flex justify-center text-5xl">{icon}</div>;
};
