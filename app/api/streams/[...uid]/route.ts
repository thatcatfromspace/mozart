import { NextRequest, NextResponse } from "next/server";
import pool from "../../../utils/db";

let currentProgress: number = 0;

export async function POST(req: Request, { params }) {
  const body: StreamData = await req.json();
  const conn = await pool.getConnection();
  // console.log(conn.info);
  // console.log(body.progress);
  
  try {
    if (currentProgress == 0) {
      currentProgress = body.progress;
    }
    if (body.progress <= currentProgress) {
      conn.query(
        `CREATE TABLE IF NOT EXISTS STREAMS (USER_ID VARCHAR(30), TIMESTAMP BIGINT PRIMARY KEY, TRACK VARCHAR(250), ALBUM VARCHAR(250), ARTIST VARCHAR(250), ALBUM_THUMBNAIL_URL VARCHAR(250));`
      );
      conn.query(`INSERT INTO STREAMS VALUES(?, ? , ? , ? , ? , ?);`, [
        params.uid,
        body.timestamp,
        body.track,
        body.album,
        body.artist,
        body.album_thumbnail_url,
      ]);
      currentProgress = body.progress;
    } else {
      // console.log("Duplicate entry.");
      return NextResponse.json({ data: "Duplicate entry. Request ignored." });
    }
  } catch (error) {
    return NextResponse.json({ data: "Request failed with error: " + error });
  }
  await conn.end();
  console.log("New entry!");
  return NextResponse.json({ data: "Request OK" });
}

export async function GET(req: NextRequest, { params }) {
  const conn = await pool.getConnection();
  const searchParams = req.nextUrl.searchParams;
  const countQuery: string = searchParams.get("count");
  try {
    const rows = await conn.query(`SELECT * FROM STREAMS WHERE USER_ID = ?`, [
      params.uid,
    ]);
    return NextResponse.json({ data: rows });
  } catch (error) {
    return NextResponse.json({ data: "Request failed with error: " + error });
  }
}
