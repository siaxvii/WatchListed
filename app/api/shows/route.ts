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
      orderBy: {
        rating: 'desc',
      },
    };

    //Applies pagination only if limit is specified
    if (limit) {
      queryOptions.take = parseInt(limit);
      queryOptions.skip = (page - 1) * parseInt(limit);
    }

    const shows = await prismadb.show.findMany(queryOptions);

    return NextResponse.json(shows);
  } catch (error) {
    console.error('[SHOWS_GET]', error);
    return new NextResponse('Internal Error!', { status: 500 });
  }
}