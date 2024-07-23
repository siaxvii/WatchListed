import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get('genre') || undefined;
    const search = searchParams.get('search') || undefined;

    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const whereClause: any = {
      ...(genre && { genres: { has: genre } }),
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
    };

    const queryOptions: any = {
      where: whereClause,
      orderBy: {
        // Ensure consistent ordering
        watchlistedrating: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
    };

    // Fetch shows based on query options
    const shows = await prismadb.show.findMany(queryOptions);

    // Splits shows into English and non-English
    const englishShows = shows.filter(show => show.languages.includes('en'));
    const nonEnglishShows = shows.filter(show => !show.languages.includes('en'));

    // Concatenates English shows first
    const sortedShows = [...englishShows, ...nonEnglishShows];

    return NextResponse.json(sortedShows);
  } catch (error) {
    console.error('[SHOWS_GET]', error);
    return new NextResponse('Internal Error!', { status: 500 });
  }
}