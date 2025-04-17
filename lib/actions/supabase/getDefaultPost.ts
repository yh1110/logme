"use server";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

export async function getDefaultPost(accountId: string) {
  const prisma = new PrismaClient();
  const account_id = accountId as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  const correctedSnsAccount = await prisma.sns_accounts.findUnique({
    where: {
      account_id,
      user_id,
    },
    select: {
      sns_id: true,
    },
  });

  if (correctedSnsAccount) {
    const defaultPost = await prisma.posts_samnail.findFirst({
      where: {
        account_id,
      },
      select: {
        samnail_slug: true,
      },
    });

    return `/diary/${correctedSnsAccount.sns_id}/${defaultPost?.samnail_slug}`;
  }
}
