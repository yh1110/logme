import FirstSNSLinkButton from "@/components/app/FirstSNSLinkButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDefaultPost } from "@/lib/actions/supabase/getDefaultPost";
import { getServerCookie } from "@/utils/getServerCookie";
import { redirect } from "next/navigation";

// Mock data for demonstration

export default async function DiaryPage() {
  const cookieSnsId = await getServerCookie("sns_id");
  if (cookieSnsId) {
    const redirectUrl = await getDefaultPost(cookieSnsId); // サーバーアクションを呼び出す
    redirect(redirectUrl!); // クライアント遷移
  }
  // console.log("cookieSnsId");
  // console.log("cookieSnsId", cookieSnsId);
  //データフェッチ
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:flex flex-col md:flex-row gap-6  ">
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm hidden md:block">
        {/* サイドバー */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-4"></div>
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
