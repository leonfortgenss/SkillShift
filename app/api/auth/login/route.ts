import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/mock-auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = body?.email as string | undefined;
  const pin = body?.pin as string | undefined;

  if (!email || !pin) {
    return NextResponse.json({ error: "Email and access code are required." }, { status: 400 });
  }

  const session = createSession(email, pin);
  if (!session) {
    return NextResponse.json({ error: "Invalid email or access code." }, { status: 401 });
  }

  return NextResponse.json({
    token: session.token,
    profile: session.profile,
    expiresAt: session.expiresAt,
  });
}
