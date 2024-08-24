// Fetch all TV shows from the database

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const IDsParam = searchParams.get('ids');
    const genre = searchParams.get('genre') || undefined;
    const search = searchParams.get('search') || undefined;

    const limit = parseInt(searchParams.get('limit') || '30');
    const page = parseInt(searchParams.get('page') || '1');

    //URL Example: api/shows?ids=1,2,3
    if (IDsParam) {
      const ids = IDsParam.split(',').map(id => parseInt(id.trim()));

      const shows = await prismadb.show.findMany({
        where: {
          id: { in: ids }
        }
      });

      return NextResponse.json(shows);
    }

    const whereClause: any = {
      ...(genre && { genres: { has: genre } }),
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
    };

    const queryOptions: any = {
      where: whereClause,
      take: limit,
      skip: (page - 1) * limit,
    };

    const shows = await prismadb.show.findMany(queryOptions);

    return NextResponse.json(shows);
  } catch (error) {
    console.error('[SHOWS_GET]', error);
    return new NextResponse('Internal Error!', { status: 500 });
  }
}
