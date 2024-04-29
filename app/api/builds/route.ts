import { getPaginationValues, handleAuthToken } from "@/utils";
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL || "");

export async function GET(req: NextRequest) {
    
    const uid = req.nextUrl.searchParams.get("uid");
    const name = req.nextUrl.searchParams.get("name");
    const sort = req.nextUrl.searchParams.get("sort")?.toLowerCase();
    const authToken = req.headers.get("Authorization");

    const {startIndex, limit} = getPaginationValues(req);

    try {
        if (!authToken && uid && name) return NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name}) AND is_public=TRUE ORDER BY id ASC`), {status: 200})
        if (authToken && uid && name) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name} ORDER BY id ASC)`), {status: 200});
        if (authToken && uid && !await handleAuthToken(authToken, uid)) NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
        if (authToken && uid) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} ORDER BY id ASC`), {status: 200});

        const totalRecords = Number(await (await sql`SELECT COUNT(*) FROM builds`)[0].count);

        if (sort == "mostviewed") {
            return NextResponse.json({
                totalCount: totalRecords,  
                builds: await (await sql
                    `SELECT builds.*, users.username, COUNT(views.build_id) as views, CAST(COUNT(DISTINCT likes.build_id) AS BIT) as liked FROM builds
                    LEFT JOIN users ON builds.uid = users.id
                    FULL JOIN views ON builds.id = views.build_id
                    FULL JOIN likes ON builds.id = likes.build_id
                    WHERE builds.is_public=TRUE
                    GROUP BY builds.id, users.id
                    ORDER by views DESC
                    LIMIT ${limit} OFFSET ${startIndex}`)
                }, 
                {status: 200}
            );
        }
        
        if (sort == "latest") {
            return NextResponse.json({ 
                totalCount: totalRecords, 
                builds: await (await sql
                    `SELECT builds.*, users.username, COUNT(views.build_id) as views, CAST(COUNT(DISTINCT likes.build_id) AS BIT) as liked FROM builds
                    LEFT JOIN users ON builds.uid = users.id
                    FULL JOIN views ON builds.id = views.build_id
                    FULL JOIN likes ON builds.id = likes.build_id
                    WHERE builds.is_public=TRUE
                    GROUP BY builds.id, users.id
                    ORDER by updated_at DESC, id ASC 
                    LIMIT ${limit} OFFSET ${startIndex}`)
                }, 
                {status: 200}
            );
        }

        const totalCount = Number(await(await sql`
        SELECT COUNT(*) FROM (SELECT builds.*, users.username, COUNT(views.build_id) as views, CAST(COUNT(DISTINCT likes.build_id) AS BIT)as likes FROM builds
        LEFT JOIN users ON builds.uid = users.id
        FULL JOIN views ON builds.id = views.build_id
        FULL JOIN likes ON builds.id = likes.build_id
        WHERE views.created_at >= current_timestamp - INTERVAL '7 days' AND builds.is_public is TRUE
        GROUP BY builds.id, users.id
        ORDER by views DESC)`)[0].count)

        const builds = await sql 
        `SELECT builds.*, users.username, COUNT(views.build_id)::int as views, CAST(COUNT(DISTINCT likes.build_id) AS BIT)::int as likes FROM builds
        LEFT JOIN users ON builds.uid = users.id
        FULL JOIN views ON builds.id = views.build_id
        FULL JOIN likes ON builds.id = likes.build_id
        WHERE views.created_at >= current_timestamp - INTERVAL '7 days' AND builds.is_public is TRUE
        GROUP BY builds.id, users.id
        ORDER by views DESC
        LIMIT ${limit} OFFSET ${startIndex}`

        return NextResponse.json({
            totalCount, 
            builds: builds
            }, 
            {status: 200}
        );
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
            return NextResponse.json({"message": "Build successfuly added", "id": newRow[0].id}, {status: 200});
        }
        return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
    }
    
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}

