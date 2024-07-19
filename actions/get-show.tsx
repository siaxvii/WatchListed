import { Show } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/shows`;

const getShow = async (id: number): Promise<Show> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getShow;