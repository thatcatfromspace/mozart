import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../utils/db";

export async function GET(req: NextRequest, { params }) {
  const conn = await pool.getConnection();
  const searchParams = req.nextUrl.searchParams;
  const countQuery: string = searchParams.get("count");
  const rows: Array<GetArtist> = await conn.query(
    "SELECT ARTIST AS artist, COUNT(ARTIST) AS artistCount FROM STREAMS WHERE USER_ID = ? GROUP BY ARTIST LIMIT ? OFFSET 1",
    [params.uid, Number(countQuery)]
  );
  // console.log(rows);
  
  const topArtists = new Array<GetArtist>();
  rows.forEach((individualArtist) => {
    topArtists.push({
      artist: individualArtist.artist,
      artistCount: Number(individualArtist.artistCount),
    });
  });
  await conn.end();
  // fix: implement system to fetch artist image URL
  return NextResponse.json(topArtists);
}
