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
      await sql`INSERT into LIKES (build_id, user_id, created_at) values (${build_id}, ${id}, current_timestamp)`; 
      return NextResponse.json({"Message": "Like successfully added"}, {status: 200});
    }
    catch (error) {
      return NextResponse.json({error}, {status: 500});
    }
}