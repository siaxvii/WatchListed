import { Show } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/shows`;

interface Query {
    search?: string;
    sortBy?: 'asc' | 'desc';
    genre?: string;
    limit?: number;
    page?: number;
}

const getShows = async (query: Query): Promise<Show[]> => {
    let url: string = URL;
    let queryString: any = { 
        search: query.search,
        sortBy: query.sortBy,
        genre: query.genre,
        limit: query.limit,
        page: query.page,
    };

    url = qs.stringifyUrl({
        url,
        query: queryString,
    });

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch shows');
    }

    return res.json();
};

export default getShows;