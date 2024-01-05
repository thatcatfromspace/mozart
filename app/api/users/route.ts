import { NextRequest, NextResponse } from "next/server";
import pool from "../../utils/db";

export async function GET(req: NextRequest, { params }) {
	const searchParams = req.nextUrl.searchParams;
	const query = searchParams.get("count");
	/*  use count to specify number of records */
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT USER_ID FROM access_tokens;");
  const userData = new Array();
  for (let user = 0; user < rows.length; user++) {
    userData.push({ id: rows[user] });
  }
  return NextResponse.json(userData);
}
