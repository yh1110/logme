import FirstSNSLinkButton from "@/components/app/FirstSNSLinkButton";

// Mock data for demonstration

export default async function DiaryPage() {
  //データフェッチ
  return (
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
  );
}
