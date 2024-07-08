//Fetch one TV show by ID from the database
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { showId: string } }
) {
    try {
        if (!params.showId) {
            return new NextResponse("Show ID is required", { status: 400 });
        }

        const show = await prismadb.show.findUnique({
            where: { 
                id: parseInt(params.showId), 
            },
        });
        
        return NextResponse.json(show);
    } catch (error) {
            console.log('[SHOW_GET]', error);
            return new NextResponse("Internal error", { status: 500 });
        }
} 