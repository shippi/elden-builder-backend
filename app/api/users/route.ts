import app from "@/lib/firebase";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const username = req.nextUrl.searchParams.get("username");

  try {
    let users;

    if (email) users = await sql`SELECT * FROM users WHERE UPPER(email)=UPPER(${email})`;
    else if (username) users = await sql`SELECT * FROM users WHERE UPPER(username)=UPPER(${username})`;
    else users = await sql`SELECT * FROM users`;

    return NextResponse.json(users.rows, {status: 200});
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({error}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  const {username, email, password} = await req.json();

  if (!username || !email || !password) return NextResponse.json({"error": "Missing required data"}, {status: 400});
  

  try {
    const newUser = await app.auth().createUser({
      email: email,
      password: password
    })

    await sql`INSERT INTO users (id, username, email) VALUES (${newUser.uid}, ${username}, ${email})`
    return NextResponse.json({"message": "User successfully added"}, {status: 200});
  }
  catch (error) {

    return NextResponse.json({error}, {status: 500});
  }
}