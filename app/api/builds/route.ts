import { getPaginationValues, handleAuthToken } from "@/utils";
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL || "");

export async function GET(req: NextRequest) {
    const uid = req.nextUrl.searchParams.get("uid");
    const name = req.nextUrl.searchParams.get("name");
    const sort = req.nextUrl.searchParams.get("sort")?.toLowerCase();
    const search = decodeURI(req.nextUrl.searchParams.get("search")?.toLowerCase() || "");
    
    const authToken = req.headers.get("Authorization") || "";

    const {startIndex, limit} = getPaginationValues(req);

    try {
        if (!authToken && uid && name) return NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name}) AND is_public=TRUE ORDER BY id ASC`), {status: 200})
        if (authToken && uid && name) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} AND UPPER(name)=UPPER(${name} ORDER BY id ASC)`), {status: 200});
        if (authToken && uid && !await handleAuthToken(authToken, uid)) NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
        if (authToken && uid) return  NextResponse.json(await (await sql`SELECT * FROM builds WHERE uid=${uid} ORDER BY id ASC`), {status: 200});

        const totalRecords = Number(await (await sql`SELECT COUNT(*) FROM builds WHERE builds.is_public=TRUE AND LOWER(builds.name) LIKE LOWER(${"%" + search + "%"})`)[0].count);

        const decodedUid = await handleAuthToken(authToken);

        if (sort == "mostviewed") {
            return NextResponse.json({
                totalCount: totalRecords,  
                builds: await (await sql
                    `SELECT builds.*, users.username, COALESCE(view_count.count, 0) as views, COUNT(DISTINCT likes.user_id)::int as likes, 
                    CAST(COUNT(DISTINCT(CASE likes.user_id WHEN ${decodedUid} THEN 1 ELSE null END)) AS bit)::int as liked, 
                    CAST(COUNT(DISTINCT(CASE bookmarks.user_id WHEN ${decodedUid} THEN 1 ELSE null END)) AS bit)::int as bookmarked FROM builds
                                        LEFT JOIN users ON builds.uid = users.id
                                        FULL JOIN likes ON builds.id = likes.build_id
                                        FULL JOIN bookmarks ON builds.id = bookmarks.build_id
                                        FULL JOIN (SELECT build_id, COUNT(build_id) FROM views GROUP by build_id) view_count ON builds.id = view_count.build_id
                                        WHERE builds.is_public=TRUE AND LOWER(builds.name) LIKE LOWER(${"%" + search + "%"})
                                        GROUP BY builds.id, users.id, views
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
                    `SELECT builds.*, users.username, COALESCE(view_count.count, 0)::int as views, COUNT(DISTINCT likes.user_id)::int as likes, 
                    CAST(COUNT(DISTINCT(CASE likes.user_id WHEN ${decodedUid} THEN 1 ELSE null END)) AS bit)::int as liked, 
                    CAST(COUNT(DISTINCT(CASE bookmarks.user_id WHEN ${decodedUid} THEN 1 ELSE null END)) AS bit)::int as bookmarked FROM builds
                                        LEFT JOIN users ON builds.uid = users.id
                                        FULL JOIN (SELECT build_id, COUNT(build_id) FROM views GROUP by build_id) view_count ON builds.id = view_count.build_id
                                        FULL JOIN likes ON builds.id = likes.build_id
                                        FULL JOIN bookmarks ON builds.id = bookmarks.build_id
                                        WHERE builds.is_public=TRUE AND LOWER(builds.name) LIKE LOWER(${"%" + search + "%"})
                                        GROUP BY builds.id, users.id, views
                                        ORDER by builds.updated_at DESC
                    LIMIT ${limit} OFFSET ${startIndex}`)
                }, 
                {status: 200}
            );
        }
        
        const builds = await sql 
        `SELECT builds.*, users.username, COALESCE(view_count.count, 0)::int as views, COALESCE(view_count_weekly.count, 0)::int as views_weekly, COUNT(DISTINCT likes.user_id)::int as likes,  
        CAST(COUNT(DISTINCT(CASE likes.user_id WHEN ${decodedUid} THEN 1 ELSE null END)) AS bit)::int as liked, 
        CAST(COUNT(DISTINCT(CASE bookmarks.user_id WHEN ${decodedUid} THEN 1 ELSE null END)) AS bit)::int as bookmarked FROM builds
                            LEFT JOIN users ON builds.uid = users.id
                            FULL JOIN (SELECT build_id, COUNT(build_id) FROM views GROUP by build_id) view_count ON builds.id = view_count.build_id
                            FULL JOIN (SELECT build_id, COUNT(build_id) FROM views WHERE views.created_at >= current_timestamp - INTERVAL '7 days' GROUP by build_id) view_count_weekly ON builds.id = view_count_weekly.build_id
                            FULL JOIN likes ON builds.id = likes.build_id
                            FULL JOIN bookmarks ON builds.id = bookmarks.build_id
                            WHERE builds.is_public=TRUE AND LOWER(builds.name) LIKE LOWER(${"%" + search + "%"})
                            GROUP BY builds.id, users.id, views, views_weekly
                            ORDER by views_weekly DESC
        LIMIT ${limit} OFFSET ${startIndex}`

        return NextResponse.json({
            totalCount: totalRecords, 
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

