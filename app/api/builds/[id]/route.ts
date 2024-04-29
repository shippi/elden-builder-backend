import { handleAuthToken } from "@/utils/handleAuthToken";
import { neon } from "@neondatabase/serverless";

import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string
  }
}
const sql = neon(process.env.DATABASE_URL || "");

export async function GET(req: NextRequest, {params: {id}}: Props) {
  try {
    if (!id) return NextResponse.json({"error": "Missing id"}, {status: 400});

    const row = await sql`SELECT * FROM builds WHERE id=${id}`
    if (row.length < 1) return NextResponse.json({"error": "Build does not exist."}, {status: 404});
    
    const authToken = req.headers.get("Authorization");

    if ((!row[0].is_public && authToken && await handleAuthToken(authToken, row[0].uid)) || row[0].is_public) 
      return NextResponse.json(row[0], {status: 200});
    
    return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
  }
  catch (error) {
    return NextResponse.json({error}, {status: 500});
  }
}

export async function PUT(req: NextRequest, {params: {id}}: Props) {
    const {name, description, build, isPublic} = await req.json();

    try {
      const authToken = req.headers.get("Authorization");
      
      if (!id || !authToken) return NextResponse.json({"error": "Missing id"}, {status: 400});
      
      const uid = await (await sql`SELECT uid FROM builds WHERE id=${id}`)[0].uid

      if (authToken && await handleAuthToken(authToken, uid)) {
        await sql`UPDATE builds SET 
                    name=COALESCE(${name}, name),
                    description=COALESCE(${description}, name),
                    build=COALESCE(${build}, build),
                    is_public=COALESCE(${isPublic}, is_public),
                    updated_at=current_timestamp
                  WHERE id=${id}`
        return NextResponse.json({"message": "Update/Save successful"}, {status: 200});
      }
      
      return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
    }
    catch (error) {
      return NextResponse.json({error}, {status: 500});
    }
}

export async function DELETE(req: NextRequest, {params: {id}}: Props) {
  try {
    const authToken = req.headers.get("Authorization");
    if (!id || !authToken) return NextResponse.json({"error": "Missing id or access token"}, {status: 400});

    const uid = await (await sql`SELECT uid FROM builds WHERE id=${id}`)[0].uid

    if (authToken && await handleAuthToken(authToken, uid)) {
      await sql`DELETE FROM builds WHERE id=${id}`
      return NextResponse.json({"message": "Delete successful"}, {status: 200});
    }
    
    return NextResponse.json({"error": "Access Token is invalid."}, {status: 403});
  }
  catch (error) {
    return NextResponse.json({error}, {status: 500});
  }
}