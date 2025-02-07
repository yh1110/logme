import { Button } from "@/components/ui/button";
import { MessageSquare, Brain } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // 追加

export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#FFB84C] p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-white font-bold text-2xl">
              <Image src={`/img/logo_black.png`} alt="" width={50} height={50} />
            </div>
            <a href="#" className="text-black hover:text-gray-700 font-bold">
              About Us
            </a>
          </div>
          <Link href="signin">
            <Button
              variant={`outline`}
              className=" text-black border-black hover:text-zinc-600 hover:border-zinc-600 font-bold rounded-full px-6"
            >
              ログイン
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-16">
            {/* タイトル */}
            <div>
              <div className="text-5xl font-bold text-[#FFB84C] flex flex-col items-center">
                <Image src={`/img/logo_yellow.png`} alt="" width={500} height={50} />
              </div>
              <div className=" space-y-6 mx-8">
                <h2 className="text-2xl font-semibold text-gray-800">SubTitle</h2>
                <p className="text-gray-600 text-lg break-words">
                  texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Link href="/signup">
                <Button className="bg-primary-buttonHover hover:bg-primary-button  font-bold rounded-full px-8 py-6 text-lg">
                  さっそく使う！
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-8">
              {/* 日記作成 */}
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-black flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-black" />
                </div>
                <p className="text-sm text-primary-button font-bold">SNSから日記を作成</p>
              </div>

              {/* AI予測 */}
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-black flex items-center justify-center">
                  <Brain className="w-12 h-12 text-black" />
                </div>
                <p className="text-sm text-primary-button font-bold">メンタルをAIで予測</p>
              </div>
            </div>

            <div className="mt-12">
              <Image
                src="/illustration.png"
                alt="App illustration"
                width={600}
                height={400}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
