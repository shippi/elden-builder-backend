import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {uid, name, build, isPublic} = await req.json();

    if (!uid || !name || build || isPublic) NextResponse.json({"error": "Missing required data"}, {status: 400});

    try {
        const newRow = await sql`INSERT INTO builds (uid, name, build, is_public) VALUES (${uid}, ${name}, ${build}, ${isPublic})`
        return NextResponse.json({"message": "Build successfully added"}, {status: 200});
      }
      catch (error) {
        return NextResponse.json({error}, {status: 500});
      }
}