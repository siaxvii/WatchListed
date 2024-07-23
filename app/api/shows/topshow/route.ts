import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '30');
    const page = parseInt(searchParams.get('page') || '1');

    const topRatedShows = await prismadb.show.findMany({
      orderBy: {
        watchlistedrating: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return NextResponse.json(topRatedShows);
  } catch (error) {
    console.error('[TOP_RATED_SHOWS_GET]', error);
    return new NextResponse('Internal Error!', { status: 500 });
  }
}