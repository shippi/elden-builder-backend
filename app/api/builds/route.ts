import { getPaginationValues, handleAuthToken } from "@/utils";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const uid = req.nextUrl.searchParams.get("uid");
    const name = req.nextUrl.searchParams.get("name");
    const sort = req.nextUrl.searchParams.get("sort")?.toLowerCase();
    const authToken = req.headers.get("Authorization");

    const {startIndex, limit} = getPaginationValues(req);

    try {
        if (!authToken && uid && name) return NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name}) AND is_public=TRUE ORDER BY id ASC`).rows, {status: 200})
        if (authToken && uid && name) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name} ORDER BY id ASC)`).rows, {status: 200});
        if (authToken && uid && !await handleAuthToken(authToken, uid)) NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
        if (authToken && uid) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} ORDER BY id ASC`).rows, {status: 200});

        const totalRecords = Number(await (await sql`SELECT COUNT(*) FROM builds`).rows[0].count);

        if (sort == "mostviewed") {
            return NextResponse.json({
                totalCount: totalRecords, 
                builds: await (await sql
                    `SELECT builds.*, COUNT(build_id) FROM builds
                    FULL JOIN views ON builds.id = views.build_id
                    WHERE builds.is_public=TRUE 
                    GROUP BY id
                    ORDER by count DESC
                    LIMIT ${limit} OFFSET ${startIndex}`).rows
                }, 
                {status: 200});
        }
        
        if (sort == "latest") {
            return NextResponse.json({ 
                totalCount: totalRecords, 
                builds: await (await sql
                    `SELECT * FROM builds WHERE is_public=TRUE 
                    ORDER BY updated_at DESC, id ASC 
                    LIMIT ${limit} OFFSET ${startIndex}`).rows
                }, 
                {status: 200});
        }

        const builds = await sql 
        `SELECT id, uid, name, description, build, is_public, updated_at, COUNT(build_id) FROM builds
        FULL JOIN views ON builds.id = views.build_id
        WHERE views.created_at >= current_timestamp - INTERVAL '7 days' AND builds.is_public is TRUE
        GROUP BY id
        ORDER by count DESC 
        LIMIT ${limit} OFFSET ${startIndex}`

        console.log()

        return NextResponse.json({
            totalCount: builds.rowCount, 
            builds: builds.rows.slice(startIndex, startIndex + limit)
            }, 
            {status: 200});
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
            const newRow = await sql`INSERT INTO builds (uid, name, description, build, is_public, updated_at) VALUES (${uid}, ${name}, ${description}, ${build}, ${isPublic}, current_timestamp) RETURNING id`
            return NextResponse.json({"message": "Build successfuly added", "id": newRow.rows[0].id}, {status: 200});
        }
        return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
    }
    
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

