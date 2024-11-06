import { useQuery } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

import { getLocations } from '@/api/location';
import type { Place } from '@/types/Place';

interface LocationSearchProps {
  onClick: (place: Place) => void;
}

const LocationSearch = ({ onClick }: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading } = useQuery({
    queryKey: ['places', searchTerm],
    queryFn: () => getLocations(searchTerm),
    // The query will not execute until the searchTerm exists
    enabled: !!searchTerm,
  });

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
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
