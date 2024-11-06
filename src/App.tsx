import { useState } from 'react';

import DailyWeather from '@/components/DailyWeather';
import LocationSearch from '@/components/LocationSearch';
import type { Place } from '@/types/Place';

function App() {
  const [place, setPlace] = useState<Place | null>(null);

  return (
    <div>
      <h1>Weather App</h1>
      <LocationSearch onClick={(place) => setPlace(place)} />
      <DailyWeather place={place} />
    </div>
  );
}

export default App;
