import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ data: "User data API" });
}
