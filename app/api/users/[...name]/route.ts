import { NextRequest, NextResponse } from "next/server";
import pool from "../../../utils/db";

export async function GET(req: NextRequest, { params }) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM access_tokens;"
  );
}
