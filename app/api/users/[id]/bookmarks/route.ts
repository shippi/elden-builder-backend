import { getPaginationValues, handleAuthToken } from "@/utils";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string
  }
}

const sql = neon(process.env.DATABASE_URL || "");

export async function GET(req: NextRequest, {params: {id}}: Props) {
	const search = decodeURI(req.nextUrl.searchParams.get("search")?.toLowerCase() || "");
    const authToken = req.headers.get("Authorization") || "";
    const {startIndex, limit} = getPaginationValues(req);

	try {
		if (!id || !authToken) return NextResponse.json({"error": "Missing id"}, {status: 400});
		
		if (authToken && await handleAuthToken(authToken, id)){
			const totalRecords = Number(await (await sql`
				SELECT COUNT(*) FROM builds 
				JOIN bookmarks ON builds.id = bookmarks.build_id
				WHERE builds.is_public=TRUE AND LOWER(builds.name) LIKE LOWER(${"%" + search + "%"}) AND bookmarks.user_id = ${id}`)[0].count);
			return NextResponse.json({
                totalCount: totalRecords,  
                builds: await (await sql
                    `SELECT builds.*, users.username, bookmarked_at.created_at as bookmarked_at, COALESCE(view_count.count, 0) as views, COALESCE(like_count.count, 0) as likes,
                    CAST(COUNT(DISTINCT(CASE likes.user_id WHEN ${id} THEN 1 ELSE null END)) AS bit)::int as liked, 
                    CAST(COUNT(DISTINCT(CASE bookmarks.user_id WHEN ${id} THEN 1 ELSE null END)) AS bit)::int as bookmarked FROM builds
                                        LEFT JOIN users ON builds.uid = users.id
                                        FULL JOIN likes ON builds.id = likes.build_id
                                        FULL JOIN bookmarks ON builds.id = bookmarks.build_id
                                        FULL JOIN (SELECT build_id, COUNT(build_id) FROM views GROUP by build_id) view_count ON builds.id = view_count.build_id
                                        FULL JOIN (SELECT bookmarks.build_id, bookmarks.created_at FROM bookmarks WHERE bookmarks.user_id = ${id}) bookmarked_at ON builds.id = bookmarked_at.build_id
                                        FULL JOIN (SELECT build_id, COUNT(build_id) FROM likes GROUP by build_id) like_count ON builds.id = like_count.build_id
                                        WHERE builds.is_public=TRUE AND bookmarks.user_id = ${id} AND LOWER(builds.name) LIKE LOWER(${"%" + search + "%"})
                                        GROUP BY builds.id, users.id, views, bookmarked_at, likes
                                        ORDER BY bookmarked_at DESC
                    LIMIT ${limit} OFFSET ${startIndex}`)
                }, 
                {status: 200}
			)
      	}

		return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
	}
	catch (error) {
		return NextResponse.json({error}, {status: 500});
	}
}

export async function POST(req: NextRequest, {params: {id}}: Props) {
    const { build_id } = await req.json();

    try {
    	const authToken = req.headers.get("Authorization");

      	if (!id || !authToken) return NextResponse.json({"error": "Missing id"}, {status: 400});
      
      	if (authToken && await handleAuthToken(authToken, id)){
        	await sql`INSERT INTO bookmarks (build_id, user_id, created_at) values (${build_id}, ${id}, current_timestamp)`; 
        	return NextResponse.json({"Message": "Bookmark successfully added"}, {status: 200});
      	}
        
    	return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
    }
    catch (error) {
    	return NextResponse.json({error}, {status: 500});
    }
}

export async function DELETE(req: NextRequest, {params: {id}}: Props) {
	const { build_id } = await req.json();
	try {
    	const authToken = req.headers.get("Authorization");

      	if (!id || !authToken) return NextResponse.json({"error": "Missing id"}, {status: 400});
      
      	if (authToken && await handleAuthToken(authToken, id)){
        	await sql`DELETE FROM bookmarks WHERE user_id=${id} AND build_id=${build_id}`; 
        	return NextResponse.json({"Message": "Bookmark successfully removed"}, {status: 200});
      	}
        
    	return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
    }
    catch (error) {
    	return NextResponse.json({error}, {status: 500});
    }
}