import FirstSNSLinkButton from "@/components/app/FirstSNSLinkButton";
import { Samnail } from "@/components/app/Samnail";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for demonstration

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

export default async function DiaryPage() {
  //データフェッチ
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:flex flex-col md:flex-row gap-6  ">
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm hidden md:block">
        {/* サイドバー */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {Object.entries(diaryData).map(([month, entries]) => (
            <div key={month} className="p-4">
              <Samnail month={month} entries={entries} />
            </div>
          ))}
        </ScrollArea>
      </div>
      <main className="w-full md:w-2/3 bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6 flex flex-col items-center space-y-12 pt-10">
          <div className=" space-y-4">
            <h1 className="text-xl text-gray-700">表示できる投稿がありません</h1>
            <p className="text-muted-foreground">SNSアカウントを連携してください</p>
          </div>
          <FirstSNSLinkButton />
        </div>
        <div className="prose max-w-none"></div>
      </main>
    </div>
  );
}
