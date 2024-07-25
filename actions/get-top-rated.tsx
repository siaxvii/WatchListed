import { Show } from '@/types';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/shows/topshow`;

interface Query {
  page?: number;
  limit?: number;
}

const getTopRatedShows = async (query: Query): Promise<Show[]> => {
  let queryString: any = { 
    page: query.page,
    limit: query.limit,
  };

  const url = qs.stringifyUrl({
    url: URL,
    query: queryString,
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch top-rated shows');
  }

  return res.json();
};

export default getTopRatedShows;
