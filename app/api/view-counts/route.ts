import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

}

export async function POST(req: NextRequest) {
    const { user_id, build_id } = await req.json();
    if (!build_id) return NextResponse.json({"error": "Missing build id"}, {status: 400});

    try {
        await sql`INSERT INTO views (build_id, user_id, created_at) VALUES (${build_id}, ${user_id}, current_timestamp)`;
        return NextResponse.json({"Message": "View successfully added"}, {status: 200});
    }
    catch (error) {
        return NextResponse.json({"error": error}, {status: 500});
    }
}