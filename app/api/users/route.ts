import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const username = req.nextUrl.searchParams.get("username");

  try {
    let users;

    if (email) users = await sql`SELECT * FROM users WHERE email=${email}`;
    else if (username) users = await sql`SELECT * FROM users WHERE username=${username}`;
    else users = await sql`SELECT * FROM users`;

    return NextResponse.json(users.rows, {status: 200});
  }
  catch (error) {
    return NextResponse.json({error}, {status: 500});
  }
}
