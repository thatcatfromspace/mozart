import { NextResponse } from "next/server";
import pool from "../../../utils/db";

let latestTimeStamp = 0;

export async function POST(req: Request, { params }) {
  const body: StreamData = await req.json();
  const conn = await pool.getConnection();
  const tableName = body.username + params.uid.toString();
  try {
    if (latestTimeStamp == body.timestamp) {
      return NextResponse.json({ data: "Duplicate data. Request ignored." });
    }
    conn.query(
      `CREATE TABLE IF NOT EXISTS ${tableName} (TIMESTAMP BIGINT PRIMARY KEY, TRACK VARCHAR(250), ALBUM VARCHAR(250), ARTIST VARCHAR(250), ALBUM_THUMBNAIL_URL VARCHAR(250));`,
    );
    conn.query(`INSERT INTO ${tableName} VALUES(? , ? , ? , ? , ?);`, [
      body.timestamp,
      body.track,
      body.album,
      body.artist,
      body.album_thumbnail_url,
    ]);
    latestTimeStamp = body.timestamp;
  } catch (error) {
    return NextResponse.json({ data: "Request failed with error: " + error });
  }
  return NextResponse.json({ data: "Request OK" });
}
