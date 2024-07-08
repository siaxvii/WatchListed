//Fetch all TV shows from the database
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
) {
    try {
        const { searchParams } = new URL(req.url)
        const genre = searchParams.get('genre') || undefined;
        const search = searchParams.get('search') || undefined;

        const whereClause: any = {
            ...(genre && { genres: { has: genre } }),
            ...(search && { name: { contains: search, mode: 'insensitive' } }),
          };
      

        const shows = await prismadb.show.findMany({
          where: whereClause,
          orderBy: {
            rating: 'desc',
          },
        });

        return NextResponse.json(shows);
    } catch (error) {
        console.error('[SHOWS_GET]', error);
        return new NextResponse('Internal Error!', { status: 500 });
    }
};