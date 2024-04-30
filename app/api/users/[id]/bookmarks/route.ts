import { handleAuthToken } from "@/utils";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string
  }
}

const sql = neon(process.env.DATABASE_URL || "");

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