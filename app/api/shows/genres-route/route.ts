import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const genres = await prismadb.show.findMany({
      select: {
        genres: true,
      },
      distinct: ['genres'],
    });

    return NextResponse.json(genres);
  } catch (error) {
    console.error('[GENRES_GET]', error);
    return new NextResponse('Internal Error!', { status: 500 });
  }
}
