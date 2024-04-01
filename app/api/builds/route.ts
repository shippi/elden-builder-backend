import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {uid, name, build, isPublic} = await req.json();

    if (!uid || !name || build || isPublic) NextResponse.json({"error": "Missing required data"}, {status: 400});

    try {
        const newRow = await sql`INSERT INTO builds (uid, name, build, is_public) VALUES (${uid}, ${name}, ${build}, ${isPublic}) RETURNING id`
        return NextResponse.json({"message": "Build successfult added", "id": newRow.rows[0].id}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    const {id, name, build, isPublic} = await req.json();

    try {
        if (!id) NextResponse.json({"error": "Missing id"}, {status: 400});
        
        await sql`UPDATE builds SET 
                    name=COALESCE(${name}, name),
                    build=COALESCE(${build}, build),
                    is_public=COALESCE(${isPublic}, is_public)
                  WHERE id=${id}`

        return NextResponse.json({"message": "Update/Save successful"}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}