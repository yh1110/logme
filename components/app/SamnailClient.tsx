"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { usePathname } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Dictionary } from "lodash";
import { SamnailDataType } from "./Samnail";
import { handleOpenSamnailStore } from "@/lib/store/handleSamnail";

type SamnailClientDataType = {
  month: string;
  entries: SamnailDataType["samnailData"];
  open?: boolean;
  setOpen?: (open: boolean) => void;
  userId?: string;
};

type MobileSamnailSheetType = {
  samnailData: Dictionary<SamnailDataType["samnailData"]>;
  userId?: string;
};

// NOTE: シートのみのイベントを設けないと二重でレンダリングされる
export function MobileSamnailSheetClient({ samnailData, userId }: MobileSamnailSheetType) {
  const close = handleOpenSamnailStore((state) => state.close);
  const isOpen = handleOpenSamnailStore((state) => state.isOpen);

  // console.log("userid", userId);

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      {/* <SheetOverlay /> */}
      <SheetContent side="left" className="w-1/2 p-4 bg-gray-50" forceMount>
        <ScrollArea className="h-full">
          {Object.entries(samnailData).map(([month, entries]) => (
            <div key={month} className="">
              {/* <SheetHeader key={month}>
              <SheetTitle className="text-md font-bold ">
                <span className="font-bold text-[#EE9D00]">{month}</span>
              </SheetTitle>
            </SheetHeader> */}
              <MobileSamnailClient month={month} entries={entries} userId={userId} />
            </div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// モバイル版サムネイル本体
export function MobileSamnailClient({ month, entries, userId }: SamnailClientDataType) {
  const [show, setShow] = useState(true);

  // console.log("userId", userId);

  const pathname = usePathname();

  return (
    <div className="py-2">
      {/* ヘッダー部分：クリックで開閉 */}
      <div
        className="flex items-center justify-between mb-2 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <SheetHeader>
          <SheetTitle className="text-md font-bold ">
            <span className="font-bold text-[#EE9D00]">{month}</span>
          </SheetTitle>
          {/* <SheetDescription>各種リンクを選択してください</SheetDescription> */}
        </SheetHeader>
        <div
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            show ? "" : "rotate-90"
          }`}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* show が true のときのみエントリ一覧を表示 */}
      {show && (
        <div className="space-y-2">
          {entries?.map((entry) => {
            const isActive = pathname === `/diary/${userId}/${entry.samnail_slug}`;
            return (
              // #TODO ドロワーが閉じてからページ更新する仕組みを作りたい
              // サムネイルを押したら閉じる処理->APIが呼ばれる->画面更新の流れでいける？
              <SheetClose asChild key={entry.samnail_id} className="hover:bg-gray-200">
                <Link
                  key={entry.samnail_id}
                  href={`/diary/${userId}/${entry.samnail_slug}`}
                  className={`block w-full text-left p-2 rounded-lg transition-colors ${
                    isActive ? "bg-[#FFB84C] text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{entry.samnail_name}</div>
                  <div className="text-sm opacity-80">{entry.samnail_name}</div>
                </Link>
              </SheetClose>
            );
          })}
        </div>
      )}
    </div>
    // <Sheet open={open} onOpenChange={setOpen}>
    // {/* <SheetOverlay /> */}
    // <SheetContent side="left" className="w-1/2 p-4 bg-gray-50" forceMount>
    // </SheetContent>
    // </Sheet>
  );
}

// デスクトップ版サムネイル本体
export function SamnailClinet({ month, entries, userId }: SamnailClientDataType) {
  const [show, setShow] = useState(true);

  const pathname = usePathname();

  return (
    <>
      {/* ヘッダー部分：クリックで開閉 */}
      <div
        className="flex items-center justify-between mb-2 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h3 className="font-semibold text-[#EE9D00]">{month}</h3>
        <div
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            show ? "" : "rotate-90"
          }`}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* show が true のときのみエントリ一覧を表示 */}
      {show && (
        <div className="space-y-2">
          {entries?.map((entry) => {
            const isActive = pathname === `/diary/${userId}/${entry.samnail_id}`;
            return (
              <Link
                key={entry.samnail_id}
                href={`/diary/${userId}/${entry.samnail_slug}`}
                className={`block w-full text-left p-3 rounded-lg transition-colors ${
                  isActive ? "bg-[#FFB84C] text-white" : "hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{entry.samnail_name}</div>
                <div className="text-sm opacity-80">{entry.samnail_name}</div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
