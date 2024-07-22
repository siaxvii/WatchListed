import { Show } from '@/types';

const getTopRatedShows = async (): Promise<Show[]> => {
  const res = await fetch('api/shows/topshow');
  
  if (!res.ok) {
    throw new Error('Failed to fetch top-rated shows');
  }

  return res.json();
};

export default getTopRatedShows;
