
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
      const users = await sql`SELECT id, email, username FROM users WHERE id=${id}`; 
      return NextResponse.json(users, {status: 200});
    }
    catch (error) {
      return NextResponse.json({error}, {status: 500});
    }
}