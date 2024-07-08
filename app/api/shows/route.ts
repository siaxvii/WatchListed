//Fetch all TV shows from the database
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const shows = await prismadb.show.findMany();

        return NextResponse.json(shows);
    } catch (error) {
        console.error('[SHOWS_GET]', error);
        return new NextResponse('Internal Error!', { status: 500 });
    }
};