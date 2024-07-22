import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const topRatedShows = await prismadb.show.findMany({
      orderBy: {
        popularity: 'desc',
      },
      take: 3, // Adjust this number as needed
    });

    return NextResponse.json(topRatedShows);
  } catch (error) {
    console.error('[TOP_RATED_SHOWS_GET]', error);
    return new NextResponse('Internal Error!', { status: 500 });
  }
}
