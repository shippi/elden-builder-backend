import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, {params: {id}}: Props) {
    try {
      const users = await sql`SELECT id, email, username FROM users WHERE id=${id}`; 
      return NextResponse.json(users.rows, {status: 200});
    }
    catch (error) {
      return NextResponse.json({error}, {status: 500});
    }
  }