// Mock data for demonstration
const diaryData = {
  post_title: "今日の出来事",
  post_cotent: "今日は友達と買い物に行きました。",
  post_date: "2025-02-08",
};

export default async function DiaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log(slug);
  //データフェッチ
  //サムネイルIDをもとにデータを表示
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{diaryData.post_title}</h1>
        <p className="text-gray-500">{diaryData.post_date}</p>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed">{diaryData.post_cotent}</p>
      </div>
    </>
  );
}
