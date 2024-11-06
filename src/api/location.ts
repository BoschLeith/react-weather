import type { Place } from '@/types/Place';

interface SearchResponse {
  features: {
    geometry: { coordinates: number[] };
    properties: {
      place_id: number;
      display_name: string;
    };
  }[];
}

export const getLocations = async (searchTerm: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=geojson&addressdetails=1&layer=address&limit=5`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch locations data');
  }

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
