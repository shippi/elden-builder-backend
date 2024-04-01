import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: {
      id: string
    }
  }
  
export async function PUT(req: NextRequest, {params: {id}}: Props) {
    const {name, build, isPublic} = await req.json();

    try {
        if (!id) NextResponse.json({"error": "Missing id"}, {status: 400});
        
        await sql`UPDATE builds SET 
                    name=COALESCE(${name}, name),
                    build=COALESCE(${build}, build),
                    is_public=COALESCE(${isPublic}, is_public)
                  WHERE id=${id}`

        return NextResponse.json({"message": "Update/Save successful"}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({error}, {status: 500});
    }
}