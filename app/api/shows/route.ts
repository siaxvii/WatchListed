// Fetch all TV shows from the database
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get('genre') || undefined;
    const search = searchParams.get('search') || undefined;

    //Limits the number of shows per page
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const whereClause: any = {
      ...(genre && { genres: { has: genre } }),
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
    };

    const shows = await prismadb.show.findMany({
      where: whereClause,
      orderBy: {
        rating: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return NextResponse.json(shows);
  } catch (error) {
    console.error('[SHOWS_GET]', error);
    return new NextResponse('Internal Error!', { status: 500 });
  }
}