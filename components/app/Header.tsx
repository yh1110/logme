import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

//#TODO サーバーコンポーネント化
export default function Header() {
  const session = false;
  return (
    <header className="bg-[#FFB84C] p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-3">
        {/* ロゴ */}
        <div className="flex items-center space-x-4">
          <div className="text-white font-bold text-2xl">
            <Image src={`/img/logo_black.png`} alt="" width={50} height={50} />
          </div>
        </div>

        {/* SNS切り替え */}
        <div className="flex flex-col items-center justify-center ">
          <div className="w-1/2 h-8 rounded-xl border-2 border-black bg-[#FFB84C] flex items-center justify-center mx-2">
            <span className="font-bold">YAY</span>
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="flex items-center justify-end space-x-6 text-zinc-700">
          <Link className="flex space-x-2 items-center" href="/diary">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M2 6h4m-4 4h4m-4 4h4m-4 4h4" />
                <rect width="16" height="20" x="4" y="2" rx="2" />
                <path d="M16 2v20" />
              </g>
            </svg>
            <span>ホーム</span>
          </Link>
          <Link className="flex space-x-2 items-center" href="/ai">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                color="currentColor"
              >
                <path d="M4.222 21.995v-3.55c0-1.271-.333-1.932-.987-3.037A8.888 8.888 0 0 1 10.889 2a8.89 8.89 0 0 1 8.889 8.887c0 .58 0 .87.024 1.032c.058.388.24.722.417 1.068L22 16.441l-1.4.7c-.405.202-.608.303-.749.49s-.181.399-.26.82l-.008.042c-.183.968-.384 2.036-.95 2.71c-.2.237-.448.43-.727.567c-.461.225-1.028.225-2.162.225c-.525 0-1.051.012-1.576 0c-1.243-.031-2.168-1.077-2.168-2.29" />
                <path d="M14.388 10.532c-.426 0-.815-.162-1.11-.427m1.11.426c0 1.146-.664 2.235-1.942 2.235S10.504 13.854 10.504 15m3.884-4.469c2.15 0 2.15-3.35 0-3.35q-.294.001-.557.095c.105-2.498-3.496-3.176-4.312-.836m.985 1.857c0-.774-.39-1.456-.985-1.857m0 0c-1.852-1.25-4.32.993-3.146 2.993c-1.97.295-1.76 3.333.247 3.333a1.66 1.66 0 0 0 1.362-.712" />
              </g>
            </svg>
            <span>AI分析</span>
          </Link>
          {session ? (
            <div className="grid grid-cols-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2ZM8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0Zm9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984Z"
                  />
                </g>
              </svg>
              <span>user</span>
            </div>
          ) : (
            <Link href="/signin">
              <Button
                variant="outline"
                className=" text-black border-black hover:text-zinc-600 hover:border-zinc-600 font-bold rounded-full px-6"
              >
                ログイン
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
