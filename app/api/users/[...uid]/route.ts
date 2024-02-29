import { NextRequest, NextResponse } from "next/server";
import pool from "../../../utils/db";

export async function GET(req: NextRequest, { params }) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM ACCESS_TOKENS WHERE USER_ID = ?;",
    [params.uid]
  );
  return NextResponse.json({ data: rows });
}

export async function POST(req: Request, { params }) {
  const conn = await pool.getConnection();
  const body = await req.json();
  const exists = await conn.query(
    "SELECT * FROM ACCESS_TOKENS WHERE USER_ID = ?",
    [params.uid]
  );
  if (!exists) {
    await conn.query("INSERT INTO ACCESS_TOKENS VALUES(?, ?, ?)", [
      params.uid,
      body.accessToken,
      body.refreshToken,
    ]);
    await conn.end();
    return NextResponse.json({ data: "POST OK" });
  } else {
    await conn.query(
      "UPDATE ACCESS_TOKENS SET ACCESS_TOKEN=?, REFRESH_TOKEN=? WHERE USER_ID=?;",
      [body.accessToken, body.refreshToken, params.uid]
    );
    await conn.end();
    return NextResponse.json({ data: "POST OK" });
  }
}
