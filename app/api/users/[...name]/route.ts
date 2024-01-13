import { NextRequest, NextResponse } from "next/server";
import pool from "../../../utils/db";

export async function GET(req: NextRequest, { params }) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT USER_ID FROM ACCESS_TOKENS;"
  );
  return NextResponse.json({ data: rows});
}
