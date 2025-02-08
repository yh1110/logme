// app/diary/components/MonthAccordion.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SheetClose, SheetHeader, SheetTitle } from "../ui/sheet";
import { usePathname } from "next/navigation";

// type Entry = {
//   id: string;
//   title: string;
//   date: string;
//   // その他必要なプロパティ
// };

// type MonthAccordionProps = {
//   month: string;
//   entries: Entry[];
// };

export function MobileSamnail({ month, entries }) {
  const [open, setOpen] = useState(true);

  const pathname = usePathname();

  return (
    <>
      {/* ヘッダー部分：クリックで開閉 */}
      <div
        className="flex items-center justify-between mb-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <SheetHeader>
          <SheetTitle className="text-md font-bold ">
            <span className="font-bold text-[#EE9D00]">{month}</span>
          </SheetTitle>
          {/* <SheetDescription>各種リンクを選択してください</SheetDescription> */}
        </SheetHeader>
        <div
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            open ? "" : "rotate-90"
          }`}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* open が true のときのみエントリ一覧を表示 */}
      {open && (
        <div className="space-y-2">
          {entries.map((entry) => {
            const isActive = pathname === `/diary/${entry.id}`;
            return (
              // #TODO ドロワーが閉じてからページ更新する仕組みを作りたい
              // サムネイルを押したら閉じる処理->APIが呼ばれる->画面更新の流れでいける？
              <SheetClose asChild key={entry.id} className="hover:bg-gray-200">
                <Link
                  key={entry.id}
                  href={`/diary/${entry.id}`}
                  className={`block w-full text-left p-2 rounded-lg transition-colors ${
                    isActive ? "bg-[#FFB84C] text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{entry.title}</div>
                  <div className="text-sm opacity-80">{entry.date}</div>
                </Link>
              </SheetClose>
            );
          })}
        </div>
      )}
    </>
  );
}

export function Samnail({ month, entries }) {
  const [open, setOpen] = useState(true);

  const pathname = usePathname();

  return (
    <>
      {/* ヘッダー部分：クリックで開閉 */}
      <div
        className="flex items-center justify-between mb-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-semibold text-[#EE9D00]">{month}</h3>
        <div
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            open ? "" : "rotate-90"
          }`}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* open が true のときのみエントリ一覧を表示 */}
      {open && (
        <div className="space-y-2">
          {entries.map((entry) => {
            const isActive = pathname === `/diary/${entry.id}`;
            return (
              <Link
                key={entry.id}
                href={`/diary/${entry.id}`}
                className={`block w-full text-left p-3 rounded-lg transition-colors ${
                  isActive ? "bg-[#FFB84C] text-white" : "hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{entry.title}</div>
                <div className="text-sm opacity-80">{entry.date}</div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
