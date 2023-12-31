import { NextResponse } from "next/server";
import { masterDatabasePool } from "../../../utils/db";

export async function GET(req: Request, { params }) {
  const conn = await masterDatabasePool.getConnection();
  /**
   * Decide on schema, ERD and then 
   * work on API
   */
  return NextResponse.json({ data: `Hello ${params.name}` });
}
