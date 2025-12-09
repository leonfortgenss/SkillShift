import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/mock-auth";

function readToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (header?.toLowerCase().startsWith("bearer ")) {
    return header.slice(7);
  }
  const fromQuery = request.nextUrl.searchParams.get("token");
  return fromQuery;
}

export async function GET(request: NextRequest) {
  const token = readToken(request);
  const session = getSession(token);

  if (!session) {
    return NextResponse.json({ error: "Invalid or expired session." }, { status: 401 });
  }

  return NextResponse.json({
    token: session.token,
    profile: session.profile,
    expiresAt: session.expiresAt,
  });
}
