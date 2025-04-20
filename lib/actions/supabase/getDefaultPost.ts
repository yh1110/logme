"use server";
import { setSnsId } from "@/utils/setCookies";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

export async function getDefaultPost(sns_id: string) {
  try {
    const prisma = new PrismaClient();
    if (!sns_id) {
      throw new Error("Account ID is required");
    }
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    const correctedSnsAccount = await prisma.sns_accounts.findUnique({
      where: {
        sns_id,
        user_id,
      },
      select: {
        sns_id: true,
        account_id: true,
      },
    });

    // snsアカウントがログインユーザーのものであるか確認
    if (correctedSnsAccount) {
      setSnsId(correctedSnsAccount.sns_id);
      const defaultPost = await prisma.posts_samnail.findFirst({
        where: {
          account_id: correctedSnsAccount.account_id,
        },
        select: {
          samnail_slug: true,
        },
      });

      return `/diary/${correctedSnsAccount.sns_id}/${defaultPost?.samnail_slug ?? ""}`;
    }
  } catch (error) {
    console.log("getDefaultPost error", error);
    return `/error`;
  }
}
