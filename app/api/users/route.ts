import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  
  if (email) {
    try {
      const users = await sql`SELECT * FROM users WHERE email=${email}`;
      const user = users.rows[0];
      
      if (user) return NextResponse.json(user);
  
      return NextResponse.json({}, {status: 200});
    }
    catch (error) {
      return NextResponse.json({error}, {status: 500});
    }
  }

  const users = await sql`SELECT * FROM users`;
  return NextResponse.json(users.rows);
}

