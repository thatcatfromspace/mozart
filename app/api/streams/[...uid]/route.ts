import { NextRequest, NextResponse } from "next/server";
import pool from "../../../utils/db";
import axios from "axios";

let currentProgress: number = 0;

export async function POST(req: Request, { params }) {
  const body: StreamData = await req.json();
  const conn = await pool.getConnection();
  // console.log(conn.info);
  // console.log(body.progress);
  
  try {
    let artistImage: string = "",
      albumImage: string = "";
    if (currentProgress == 0) {
      currentProgress = body.progress;
    }
    if (body.progress <= currentProgress) {
      await conn.query(
        `CREATE TABLE IF NOT EXISTS STREAMS (USER_ID VARCHAR(30), TIMESTAMP BIGINT PRIMARY KEY, TRACK VARCHAR(250), ALBUM VARCHAR(250), ARTIST VARCHAR(250), ALBUM_THUMBNAIL_URL VARCHAR(250), ARTIST_IMAGE_URL VARCHAR(250), ALBUM_IMAGE_URL VARCHAR(250));`
      );
      let accessToken = await conn.query(
        "SELECT ACCESS_TOKEN AS accessToken FROM ACCESS_TOKENS WHERE USER_ID=?",
        [params.uid]
      );
      let serializedAccessToken = accessToken[0].accessToken;
      // upon fetching token, get artist and album image URL
      await axios
        .get(`https://api.spotify.com/v1/artists/${body.artist_uid}`, {
          headers: { Authorization: `Bearer ${serializedAccessToken}` },
        })
        .then((res) => {
          artistImage = res.data.images[0].url;
        });
      await axios
        .get(`https://api.spotify.com/v1/albums/${body.album_uid}`, {
          headers: { Authorization: `Bearer ${serializedAccessToken}` },
        })
        .then((res) => {
          albumImage = res.data.images[0].url;
        });
      await conn.query(`INSERT INTO STREAMS VALUES(?, ? , ? , ? , ? , ?, ?, ?);`, [
        params.uid,
        body.timestamp,
        body.track,
        body.album,
        body.artist,
        body.album_thumbnail_url,
        artistImage,
        albumImage,
      ]);
      currentProgress = body.progress;
      await conn.end();
    } else {
      // console.log("Duplicate entry.");
      return NextResponse.json({ data: "Duplicate entry. Request ignored." });
    }
  } catch (error) {
    return NextResponse.json({ data: "Request failed with error: " + error });
  }
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
