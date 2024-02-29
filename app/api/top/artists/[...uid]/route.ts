import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../utils/db";

export async function GET(req: NextRequest, { params }) : Promise<NextResponse> {
  const conn = await pool.getConnection();
  const searchParams = req.nextUrl.searchParams;
  const countQuery: string = searchParams.get("count");
  const rows: Array<GetArtist> = await conn.query(
    "SELECT ARTIST AS artist, COUNT(ARTIST) AS artistCount, ARTIST_IMAGE_URL as image FROM STREAMS WHERE USER_ID = ? GROUP BY ARTIST ORDER BY COUNT(ARTIST) DESC LIMIT ? OFFSET 1",
    [params.uid, Number(countQuery)]
  );
  // console.log(rows);
  
  const topArtists = new Array<GetArtist>();
  rows.forEach((individualArtist) => {
    topArtists.push({
      artist: individualArtist.artist,
      artistCount: Number(individualArtist.artistCount),
      image: individualArtist.image
    });
  });
  conn.end();
  // fix: implement system to fetch artist image URL
  return NextResponse.json(topArtists);
}
