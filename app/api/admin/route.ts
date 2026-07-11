import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ message: "Admin API — utilise POST pour sauvegarder." });
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as Record<string, unknown>;
  return NextResponse.json({ success: true, data: body });
}
