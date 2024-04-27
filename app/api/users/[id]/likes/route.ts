import { handleAuthToken } from "@/utils";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string
  }
}

export async function POST(req: NextRequest, {params: {id}}: Props) {
    const { build_id } = await req.json();

    try {
    	const authToken = req.headers.get("Authorization");

      	if (!id || !authToken) return NextResponse.json({"error": "Missing id"}, {status: 400});
      
      	if (authToken && await handleAuthToken(authToken, id)){
        	await sql`INSERT INTO likes (build_id, user_id, created_at) values (${build_id}, ${id}, current_timestamp)`; 
        	return NextResponse.json({"Message": "Like successfully added"}, {status: 200});
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
        	await sql`DELETE FROM likes WHERE user_id=${id} AND build_id=${build_id}`; 
        	return NextResponse.json({"Message": "Like successfully removed"}, {status: 200});
      	}
        
    	return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
    }
    catch (error) {
    	return NextResponse.json({error}, {status: 500});
    }
}