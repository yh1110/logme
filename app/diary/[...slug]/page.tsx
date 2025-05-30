"use server";
import { MobileSamnail, Samnail } from "@/components/app/Samnail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { posts_samnailType, postsType } from "@/types/prisma";
import { getServerCookie } from "@/utils/getServerCookie";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

// Mock data for demonstration
// const diaryData = {
//   post_title: "今日の出来事",
//   post_cotent: "今日は友達と買い物に行きました。",
//   post_date: "2025-02-08",
// };

export default async function DiaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [sns_id, samnai_slug] = slug;
  //データフェッチ
  //サムネイルIDをもとにデータを表示

  const prisma = new PrismaClient();

  let diaryData: postsType[] | null = [];
  let samnail: posts_samnailType[] | null;
  let selectedSamnail: posts_samnailType | null = null;
  let snsId: string;
  //ユーザー検証

  const cookieSnsId = await getServerCookie("sns_id");
  if (!sns_id || cookieSnsId !== sns_id) {
    redirect("/diary");
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    // ログイン中のユーザーのアカウントか確認
    const snsAccount = await prisma.sns_accounts.findUnique({
      where: {
        sns_id,
        user_id,
      },
    });

    // console.log("snsAccount", snsAccount);

    if (snsAccount) {
      snsId = snsAccount.sns_id || sns_id;

      if (samnai_slug) {
        selectedSamnail = await prisma.posts_samnail.findUnique({
          where: {
            account_id: snsAccount?.account_id,
            samnail_slug: samnai_slug, //NOTE: samnail_idのslug
          },
        });
      } else {
        selectedSamnail = await prisma.posts_samnail.findFirst({
          where: {
            account_id: snsAccount?.account_id,
          },
        });
      }

      samnail = await prisma.posts_samnail.findMany({
        where: {
          account_id: snsAccount?.account_id,
        },
        orderBy: {
          samnail_date: "desc",
        },
      });

      if (selectedSamnail) {
        diaryData = await prisma.posts.findMany({
          where: {
            samnail_id: selectedSamnail?.samnail_id,
          },
        });
      }

      // console.log(data);
    } else {
      // アカウントが見つからない場合の処理
      redirect("/diary");
    }
  } catch (error) {
    console.log("getDefaultPost error", error);
    redirect("/error");
  }

  // console.log(snsId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:flex flex-col md:flex-row gap-6  ">
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm hidden md:block">
        {/* サイドバー */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <Samnail samnailData={samnail} userId={snsId} />
          <MobileSamnail samnailData={samnail} userId={snsId} />
        </ScrollArea>
      </div>
      <main className="w-full md:w-2/3 bg-white rounded-lg shadow-sm p-6">
        {selectedSamnail?.samnail_id || diaryData?.length !== 0 ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{selectedSamnail?.samnail_name}</h1>
              <p className="text-gray-500">{selectedSamnail?.samnail_name}</p>
            </div>
            <div className="prose max-w-none space-y-8">
              {diaryData?.map((post) => {
                // console.log(JSON.parse(post.post_contents).text);
                return (
                  <p
                    className="text-gray-700 leading-relaxed whitespace-pre-line border-b pb-8"
                    key={post.post_id}
                  >
                    {typeof post.post_contents === "string"
                      ? JSON.parse(post.post_contents).text
                      : ""}
                  </p>
                );
              })}
            </div>
          </>
        ) : (
          <div className="mb-6 flex flex-col items-center space-y-12 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 20 20"
              className=" text-primary-emptyState"
            >
              <g fill="currentColor">
                <path
                  d="m11 5.79l7.314-1.27a1.5 1.5 0 0 1 .242-.02c.801 0 1.444.664 1.444 1.475v9.786c0 .72-.511 1.34-1.213 1.456l-7.705 1.276a.499.499 0 0 1-.18-.002l-7.647-1.267A1.5 1.5 0 0 1 2 15.744V6.011a1.5 1.5 0 0 1 1.756-1.478L11 5.79Z"
                  opacity=".2"
                />
                <path
                  fillRule="evenodd"
                  d="M10.08 4.304L2.244 3.019A1.5 1.5 0 0 0 .5 4.5v9.738a1.5 1.5 0 0 0 1.268 1.482l8.155 1.275a.5.5 0 0 0 .577-.494V4.797a.5.5 0 0 0-.42-.493Zm-8-.298L9.5 5.222v10.694L1.923 14.73a.5.5 0 0 1-.423-.493V4.5a.5.5 0 0 1 .58-.494Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M18 3a1.5 1.5 0 0 0-.243.02L9.92 4.303a.5.5 0 0 0-.419.493V16.5a.5.5 0 0 0 .577.494l8.155-1.275a1.5 1.5 0 0 0 1.268-1.482V4.5A1.5 1.5 0 0 0 18 3Zm.077 11.73L10.5 15.916V5.222l7.42-1.216a.501.501 0 0 1 .58.494v9.737a.5.5 0 0 1-.423.493Z"
                  clipRule="evenodd"
                />
              </g>
            </svg>
            <p className="text-muted-foreground">投稿が見つかりません</p>
          </div>
        )}
      </main>
    </div>
  );
}
