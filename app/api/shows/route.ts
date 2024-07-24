// Fetch all TV shows from the database

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get('genre') || undefined;
    const search = searchParams.get('search') || undefined;

    const limit = searchParams.get('limit');
    const page = parseInt(searchParams.get('page') || '1');

    const whereClause: any = {
      ...(genre && { genres: { has: genre } }),
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
    };

    const queryOptions: any = {
      where: whereClause,
    };

    //Applies pagination only if limit is specified
    if (limit) {
      queryOptions.take = parseInt(limit);
      queryOptions.skip = (page - 1) * parseInt(limit);
    }

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
