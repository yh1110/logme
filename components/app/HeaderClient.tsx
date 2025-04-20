"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"; // shadcn/ui の Sheet コンポーネント群
import { SNSDialog } from "./InputDialog";
import HeaderIcons from "./HeaderIcons";
// import { MobileSamnail } from "./SamnailClient";
// import { MobileSamnail } from "./SamnailClient";
import { handleOpenSamnailStore } from "@/lib/store/handleSamnail";

function HeaderClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [snsOpen, setSnsOpen] = useState(false);
  const open = handleOpenSamnailStore((state) => state.open);

  // console.log(params);

  return (
    <>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* 日記ハンバーガーアイコン */}
        <div className="md:hidden">
          {/* <button onClick={handleClickSamnail}> */}
          <button
            onClick={() => {
              open();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20">
              <path
                fill="currentColor"
                d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
              />
            </svg>
          </button>
        </div>

        {/* ロゴ  */}
        <HeaderIcons />

        {/* PC用ナビゲーション */}
        <div className="hidden md:flex space-x-6 items-center text-zinc-700">
          {/* ホーム */}
          <Link href="/diary" className="flex space-x-2 items-center">
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

          {/* SNS選択 */}
          <div className="">
            <button className=" flex space-x-2 items-center" onClick={() => setSnsOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 685 717">
                <path
                  fill="currentColor"
                  d="m271 392l173 97c25-29 62-47 104-47c76 0 137 62 137 138s-61 137-137 137c-77 0-138-61-138-137c0-8 1-17 2-25l-178-99c-25 25-59 40-97 40C61 496 0 435 0 359s61-137 137-137c39 0 75 16 100 42l177-96c-2-10-4-20-4-30C410 62 471 0 548 0c76 0 137 62 137 138s-61 137-137 137c-39 0-74-15-99-42l-178 95c2 10 3 21 3 31c0 11-1 23-3 33z"
                />
              </svg>
              <span className="">SNS選択</span>
            </button>
          </div>

          {/* AI分析 */}
          <Link href="/ai" className="flex space-x-2 items-center">
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

          {/* ユーザー情報 */}
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
        </div>

        {/* モバイル用ハンバーガーアイコン */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)} className="text-black focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* モバイル用メニュードロワー */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        {/* ドロワーを開くトリガー */}
        {/* SheetContent でドロワーの内容を定義。side="right" で右側から表示 */}
        <SheetContent
          side="right"
          className="w-1/2 p-4 bg-gray-50"
          // 必要に応じて、下記のようなカスタムクラスでアニメーションやスタイルを調整できます
          // e.g., transition, shadow, 背景色など
        >
          <SheetHeader>
            <SheetTitle className="text-md font-bold text-primary-header">メニュー</SheetTitle>
            {/* <SheetDescription>各種リンクを選択してください</SheetDescription> */}
          </SheetHeader>

          <nav className="mt-4 space-y-8 font-bold">
            {/* ホーム */}
            {/* 問答無用でホームに戻す */}
            <SheetClose asChild>
              <Link
                href="/diary"
                className="text-gray-800 hover:underline flex space-x-2 items-center"
              >
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
            </SheetClose>

            {/* SNS選択 */}
            <SheetClose asChild>
              <button className="flex space-x-2 items-center" onClick={() => setSnsOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 685 717"
                >
                  <path
                    fill="currentColor"
                    d="m271 392l173 97c25-29 62-47 104-47c76 0 137 62 137 138s-61 137-137 137c-77 0-138-61-138-137c0-8 1-17 2-25l-178-99c-25 25-59 40-97 40C61 496 0 435 0 359s61-137 137-137c39 0 75 16 100 42l177-96c-2-10-4-20-4-30C410 62 471 0 548 0c76 0 137 62 137 138s-61 137-137 137c-39 0-74-15-99-42l-178 95c2 10 3 21 3 31c0 11-1 23-3 33z"
                  />
                </svg>
                <span className="">SNS選択</span>
              </button>
            </SheetClose>
            {/* AI分析 */}
            <SheetClose asChild>
              <Link
                href="/ai"
                className="text-gray-800 hover:underline flex space-x-2 items-center"
              >
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
            </SheetClose>
            {/* ユーザ―情報 */}
            <SheetClose asChild>
              <Link
                href="/signin"
                className="text-gray-800 hover:underline flex space-x-2 items-center"
              >
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
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
      {/* SNS選択ダイアログ */}
      <SNSDialog open={snsOpen} setOpen={setSnsOpen} />
    </>
  );
}

export default HeaderClient;
