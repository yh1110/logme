"use server";

import { cookies } from "next/headers";

export async function setSnsId(snsId: string) {
  const cookieStore = await cookies();

  cookieStore.set("sns_id", snsId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
