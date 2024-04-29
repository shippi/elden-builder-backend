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
        const count = await sql`SELECT COUNT(build_id) FROM likes WHERE build_id=${id}`
        return NextResponse.json(count[0], {status: 200});
    }
    catch (error) {
        return NextResponse.json({"error": error}, {status: 500});
    }
}