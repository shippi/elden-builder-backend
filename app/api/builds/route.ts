import { handleAuthToken } from "@/utils/handleAuthToken";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const uid = req.nextUrl.searchParams.get("uid");
    const name = req.nextUrl.searchParams.get("name");
    const authToken = req.headers.get("Authorization");

    try {
        if (!authToken) {
            if (uid && name) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name}) AND is_public=TRUE`).rows, {status: 200})
            if (uid) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND is_public=TRUE`).rows, {status: 200})
        }

        if (authToken && uid && !await handleAuthToken(authToken, uid)) NextResponse.json({"error": "Access Token is invalid."}, {status: 403});

        if (authToken && uid && name) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name})`).rows, {status: 200});
        if (authToken && uid) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid}`).rows, {status: 200});

        return NextResponse.json(await (await sql`SELECT * FROM builds WHERE is_public=TRUE`).rows, {status: 200});
    }
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    const {uid, name, description, build, isPublic} = await req.json();
    const authToken = req.headers.get("Authorization");

    if (!uid || !name || build || isPublic || !authToken) NextResponse.json({"error": "Missing required data"}, {status: 400});

    try {
        if (authToken && await handleAuthToken(authToken, uid)) {
            const newRow = await sql`INSERT INTO builds (uid, name, description, build, is_public) VALUES (${uid}, ${name}, ${description}, ${build}, ${isPublic}) RETURNING id`
            return NextResponse.json({"message": "Build successfuly added", "id": newRow.rows[0].id}, {status: 200});
        }
        return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
    }
    
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}