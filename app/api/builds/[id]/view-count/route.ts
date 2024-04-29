import { NextRequest, NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || "");

interface Props {
    params: {
      id: string
    }
}

export async function GET(req: NextRequest, {params: {id}}: Props) {
    try {
        const count = await(await sql`SELECT COUNT(build_id) FROM views WHERE build_id=${id}`)[0];
        return NextResponse.json(count, {status: 200});
    }
    catch (error) {
        return NextResponse.json({"error": error}, {status: 500});
    }
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