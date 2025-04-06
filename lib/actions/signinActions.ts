"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
export async function googleSignin() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL,
    },
  });
  if (error) {
    // #TODO エラー処理
    console.error("Error logging in:", error);
  } else {
    console.log(data.url);

    redirect(data.url!);
  }
}
