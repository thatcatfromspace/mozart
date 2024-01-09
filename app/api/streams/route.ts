import { NextResponse } from "next/server";

export function GET(req: Request, res: NextResponse) {
  return NextResponse.json({ data: "Router handler for api/streams/" });
}

