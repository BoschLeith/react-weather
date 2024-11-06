import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface SearchResponse {
  features: {
    geometry: { coordinates: number[] };
    properties: {
      place_id: number;
      display_name: string;
    };
  }[];
}

export interface Place {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}

interface LocationSearchProps {
  onClick: (place: Place) => void;
}

const getLocation = async (searchTerm: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=geojson&addressdetails=1&layer=address&limit=5`,
  );
  const data: SearchResponse = await response.json();

  const places: Place[] = data.features.map((feature) => {
    return {
      id: feature.properties.place_id,
      name: feature.properties.display_name,
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
    };
  });

  return places;
};

const LocationSearch = ({ onClick }: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const { data, error, isLoading } = useQuery({
    queryKey: ['places', searchTerm],
    queryFn: () => getLocation(searchTerm),
    // The query will not execute until the searchTerm exists
    enabled: !!searchTerm,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClick = (place: Place) => {
    onClick(place);
    setSearchTerm('');
  };

  return (
    <div>
      <h2>Loaction Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a location"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {data.map((place) => (
              <li onClick={() => handleClick(place)} key={place.id}>
                {place.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
