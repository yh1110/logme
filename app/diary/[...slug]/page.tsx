"use server";
import { PrismaClient } from "@prisma/client";

// Mock data for demonstration
// const diaryData = {
//   post_title: "今日の出来事",
//   post_cotent: "今日は友達と買い物に行きました。",
//   post_date: "2025-02-08",
// };

export default async function DiaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [userId, postId] = slug;
  console.log(slug);
  //データフェッチ
  //サムネイルIDをもとにデータを表示

  const prisma = new PrismaClient();

  let diaryData;
  let samnail;
  if (userId.length > 32 && postId.length > 32) {
    //ユーザー検証

    samnail = await prisma.posts_samnail.findFirst({
      where: {
        samnail_id: slug,
      },
    });

    diaryData = await prisma.posts.findMany({
      where: {
        samnail_id: slug,
      },
    });
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{samnail?.samnail_name}</h1>
        <p className="text-gray-500">{samnail?.samnail_name}</p>
      </div>
      <div className="prose max-w-none">
        {diaryData?.map((post) => {
          console.log(post.post_contents);
          return (
            <p className="text-gray-700 leading-relaxed" key={post.post_id}>
              {typeof post.post_contents === "string" ? JSON.parse(post.post_contents).text : ""}
            </p>
          );
        })}
      </div>
    </>
  );
}
