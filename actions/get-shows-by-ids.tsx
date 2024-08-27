// Queries all shows endpoint with a list of show IDs
import { Show } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/shows`;

const getShowsByIDs = async (IDs: number[]): Promise<Show[]> => {
  
  const res = await fetch(`${URL}?ids=${IDs}`);
  
  if (!res.ok) {
    console.error('Failed to fetch shows: ' + res.statusText);
  }

  return res.json();
};

export default getShowsByIDs;