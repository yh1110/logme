import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // console.log(await req.json());

  const { sns_id } = await req.json();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("sns_id", sns_id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  // console.log("cookie set", sns_id);

  return res;
}
