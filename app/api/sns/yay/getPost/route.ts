import { NextResponse } from "next/server";
import { getPost } from "@/utils/yay/getPost";

export async function POST() {
  try {
    console.log("getPost called");
    const data = await getPost();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
