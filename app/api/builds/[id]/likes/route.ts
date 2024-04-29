import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: {
      id: string
    }
}

export async function GET(req: NextRequest, {params: {id}}: Props) {
    try {
        const count = await sql`SELECT COUNT(build_id) FROM likes WHERE build_id=${id}`
        return NextResponse.json(count.rows[0], {status: 200});
    }
    catch (error) {
        return NextResponse.json({"error": error}, {status: 500});
    }
}