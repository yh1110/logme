// app/blog/layout.tsx
import Header from "@/components/app/Header";
import { Samnail } from "@/components/app/Samnail";
import UserBar from "@/components/app/UserBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import React from "react";

// ダミーデータ
const diaryData = {
  "2024-03": [
    {
      id: 1,
      date: "2024-03-15",
      title: "今日の出来事",
      content: "今日は友達と買い物に行きました。",
    },
    { id: 2, date: "2024-03-14", title: "楽しい一日", content: "新しいカフェを見つけました。" },
  ],
  "2024-02": [
    { id: 3, date: "2024-02-28", title: "春の訪れ", content: "桜の蕾が膨らみ始めました。" },
    {
      id: 4,
      date: "2024-02-25",
      title: "週末の過ごし方",
      content: "本を読んでリラックスした休日を過ごしました。",
    },
  ],
};

//ログインしているユーザーの情報をもとにAPI叩く
//セッションから現在連携しているSNSの情報を取得

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  // supabaseからユーザーIDを取得
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const prisma = new PrismaClient();
  const accountData = await prisma.sns_accounts.findMany({
    where: {
      user_id: user?.id,
    },
    select: {
      account_id: true,
      sns_id: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header diaryData={diaryData} />
      <UserBar accountData={accountData} />
      <div className="max-w-7xl mx-auto px-4 py-6 md:flex flex-col md:flex-row gap-6  ">
        {/* サイドバー */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm hidden md:block">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {Object.entries(diaryData).map(([month, entries]) => (
              <div key={month} className="p-4">
                <Samnail month={month} entries={entries} />
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* メインコンテンツ */}
        <main className="w-full md:w-2/3 bg-white rounded-lg shadow-sm p-6">{children}</main>
      </div>
    </div>
  );
}
