import { Button } from "@/components/ui/button";
import { MessageSquare, Brain } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // 追加

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      <nav className="pt-safe bg-white py-0 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-white font-bold text-2xl">
              <Image src={`/img/logo_yellow.png`} alt="" width={70} height={60} />
            </div>
          </div>
          <Link href="signin">
            <Button
              variant={`outline`}
              className=" text-gray-800 border-gray-800 hover:text-buttonHover hover:border-buttonHover font-bold rounded-full px-6"
            >
              ログイン
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <h1 className="text-2xl font-bold text-gray-800 my-16 leading-relaxed">
            <span className="">投稿をつなげて、</span>
            <br />
            <span className="">あなたの毎日が見えてくる。</span>
            <div className="mt-12">
              <Link href="/signup">
                <Button className="bg-primary-buttonHover hover:bg-primary-button  font-bold rounded-full px-6 py-6 text-lg">
                  Logmeを使ってみる
                </Button>
              </Link>
            </div>
          </h1>
          <div>
            <Image
              src="/img/mobile_mock.png"
              alt="Logo"
              width={500}
              height={200}
              className="w-1/2 mx-auto lg:w-full"
            />
          </div>
          <div className="space-y-16">
            {/* description1 */}
            <div>
              <div className=" space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  <span className="border-primary-header border-b">SNSを自動で整理</span>
                  <br />
                  <span className="">気づけば日記ができている</span>
                </h2>
                <p className="text-gray-600 text-sm break-words">
                  書こうと思っても、書けない日がある。でも、SNSには今日のあなたが映っている。
                  <br />
                  このアプリは、そんな日々を記録し、あとで振り返らせてくれる「書かない日記」
                </p>
              </div>
            </div>
            {/* description2 */}
            <div>
              <div className=" space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  <span className="border-primary-header border-b">AIが感情を予測</span>
                  <br />
                  <span className="">あなたの心の傾きを教えてくれる</span>
                </h2>
                <p className="text-gray-600 text-sm break-words">
                  SNSに書いた何気ない言葉も、あなたの心を映している。このアプリは投稿から気分を推定し、日記に記録。
                  <br />
                  落ち込んでいた日、前向きだった日、その変化に気づいて自分を知るきっかけを、毎日に。
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative mb-8">
            <div className="mb-8">
              <p className="text-lg font-semibold text-primary-buttonHover">Logmeの特徴</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {/* 日記作成 */}
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-black flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-black" />
                </div>
                <p className="text-sm text-gray-800 font-bold">
                  <span className="border-primary-header border-b pb-1">SNSから日記を作成</span>
                </p>
              </div>

              {/* AI予測 */}
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-black flex items-center justify-center">
                  <Brain className="w-12 h-12 text-black" />
                </div>
                <p className="text-sm text-gray-800 font-bold">
                  <span className="border-primary-header border-b pb-1">メンタルをAIが予測</span>
                </p>
              </div>
            </div>

            {/* <div className="mt-12">
              <Image
                src="/illustration.png"
                alt="App illustration"
                width={600}
                height={400}
                className="w-full"
              />
            </div> */}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white px-4 py-2">
        {/* ロゴ */}
        <div>
          <div className="text-white font-bold text-2xl">
            <Image src={`/img/logo_yellow.png`} alt="" width={70} height={60} />
          </div>
        </div>
        {/* メニュー */}
        <div className="grid grid-cols-2 gap-8">
          {/* SNS */}
          <div className="">
            <p className="text-gray-600 text-base font-bold mb-2">SNS</p>
            <ul className="flex flex-col space-y-1">
              <li>
                <Link href="https://x.com/craft_plus_0401" className="text-gray-600 text-sm">
                  - X
                </Link>
              </li>
              <li>
                <Link href="https://yay.space/user/9985857" className="text-gray-600 text-sm">
                  - yay
                </Link>
              </li>
            </ul>
          </div>

          {/* help */}
          <div className="">
            <p className="text-gray-600 text-base font-bold mb-2">ヘルプ</p>
            <ul className="flex flex-col space-y-1">
              <li>
                <Link href="/about" className="text-gray-600 text-sm">
                  - Logmeについて
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 text-sm">
                  - 使い方について
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 text-sm">
                  - ヘルプページ
                </Link>
              </li>
            </ul>
          </div>

          {/* 規約 */}
          <div className="">
            <p className="text-gray-600 text-base font-bold mb-2">規約</p>
            <ul className="flex flex-col space-y-1">
              <li>
                <Link href="/about" className="text-gray-600 text-sm">
                  - 利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 text-sm">
                  - プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>

          {/* 開発者について */}
          <div className="">
            <p className="text-gray-600 text-base font-bold mb-2">開発者について</p>
            <ul className="flex flex-col space-y-1">
              <li>
                <Link href="https://github.com/yh1110" className="text-gray-600 text-sm">
                  - Github
                </Link>
              </li>
              <li>
                <Link href="https://x.com/craft_plus_0401" className="text-gray-600 text-sm">
                  - X
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 text-sm">
                  - お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center p-6">
          <p className="text-gray-600 text-sm">© 2025 Log me. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
