import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: {
      id: string
    }
}

export async function GET(req: NextRequest, {params: {id}}: Props) {
    

    return NextResponse.json({"Message": id}, {status: 200});
}

export async function POST(req: NextRequest, {params: {id}}: Props) {
    const { user_id } = await req.json();

    try {
        await sql`INSERT INTO views (build_id, user_id, created_at) VALUES (${id}, ${user_id}, current_timestamp)`;
        return NextResponse.json({"Message": "View successfully added"}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({"error": error}, {status: 500});
    }
}