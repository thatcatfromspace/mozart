import { NextRequest, NextResponse } from "next/server";
import pool from '../../../../utils/db';

export async function GET(req: NextRequest, res: NextResponse) {
    const conn = await pool.getConnection();
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("count");
    const rows = await conn.query('SELECT ') // add table query
    return NextResponse.json({});
}