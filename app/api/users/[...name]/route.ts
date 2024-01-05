import { NextRequest, NextResponse } from "next/server";
import pool from "../../../utils/db";

export async function GET(req: NextRequest, { params }) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM access_tokens;"
  );
  console.log(typeof rows);
  
  const userData = [];
  for (let user = 0; user < rows.length; user++) {
    userData.push({ id: rows[user] });
  }
  return NextResponse.json({ data: userData });
}
