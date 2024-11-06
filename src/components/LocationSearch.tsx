import { useQuery } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

import { getLocations } from '@/api/location';
import { Input } from '@/components/ui/input';
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
    <div className="relative">
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a location"
          className="w-3/4 text-center mx-auto"
        />
        {/* <Button type="submit" className="w-full">
          Search
        </Button> */}
      </form>
      {searchTerm && (
        <div className="absolute z-10 border rounded mt-1 bg-white shadow-sm w-3/4 text-center left-1/2 transform -translate-x-1/2">
          {isLoading && <div className="text-center px-4 py-2">Loading...</div>}
          {error && (
            <div className="text-red-500 text-center px-4 py-2">
              Error: {error.message}
            </div>
          )}
          {data && (
            <ul>
              {data.map((place) => (
                <li
                  onClick={() => handleClick(place)}
                  key={place.id}
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                >
                  {place.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
