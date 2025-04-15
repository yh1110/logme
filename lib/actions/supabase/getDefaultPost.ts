"use server";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getDefaultPost(FormData: FormData) {
  const prisma = new PrismaClient();
  const account_id = FormData.get("id") as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  const hasId = await prisma.sns_accounts.count({
    where: {
      account_id,
      user_id,
    },
  });

  if (hasId > 0) {
    const defaultPost = await prisma.posts_samnail.findFirst({
      where: {
        account_id,
      },
      select: {
        samnail_id: true,
      },
    });

    redirect(`/diary/${account_id}/${defaultPost?.samnail_id}`);
  }
}
