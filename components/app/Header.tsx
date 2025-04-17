import HeaderClient from "./HeaderClient";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
export default async function Header() {
  // supabaseからユーザーIDを取得
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
  return <HeaderClient diaryData={diaryData} />;
}
