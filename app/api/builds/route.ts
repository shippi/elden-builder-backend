import { handleAuthToken } from "@/utils/handleAuthToken";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const uid = req.nextUrl.searchParams.get("uid");
    const name = req.nextUrl.searchParams.get("name");

    try {
        let rows
        if (uid && name) {
            rows = await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name})`
        }
        else if (uid) {
            rows = await sql`SELECT * FROM builds WHERE uid=${uid}`
        }
        else {
            rows = await sql`SELECT * FROM builds WHERE`
        }
        return NextResponse.json(rows.rows, {status: 200})
    }
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    const {uid, name, build, isPublic} = await req.json();
    const authToken = req.headers.get("Authorization");

    if (!uid || !name || build || isPublic || !authToken) NextResponse.json({"error": "Missing required data"}, {status: 400});

    try {
        if (authToken && await handleAuthToken(authToken, uid)) {
            const newRow = await sql`INSERT INTO builds (uid, name, build, is_public) VALUES (${uid}, ${name}, ${build}, ${isPublic}) RETURNING id`
            return NextResponse.json({"message": "Build successfuly added", "id": newRow.rows[0].id}, {status: 200});
        }
        return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
    }
    
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}