"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { SNSDialog } from "./InputDialog";
import Link from "next/link";

type accountDataType = {
  account_id: string;
  sns_id: string | null;
};

const UserBar = ({ accountData }: { accountData: accountDataType[] }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const snsUser = [
    {
      id: 1,
      user_name: "user1",
    },
    {
      id: 2,
      user_name: "user2",
    },
  ];

  //データフェッチ
  //#TODO ローディング中に他の表示させる
  return (
    <nav className="border p-2">
      <ScrollArea>
        <div className="max-w-7xl mx-auto flex space-x-2 py-4">
          {accountData.map((account) => (
            <div className="flex items-center" key={account.account_id}>
              <Button className=" rounded-full bg-gray-300 px-8">
                <Link href={`/${account.account_id}/`}>
                  <span className="text-xs text-muted-foreground">{account.sns_id ?? "user1"}</span>
                </Link>
              </Button>
            </div>
          ))}

          {/* ユーザー追加ボタン */}
          {/* モーダル出して入力させる */}
          <div className="flex items-center">
            <Button className=" rounded-full bg-gray-200 px-8" onClick={handleOpen}>
              <span className="text-xs text-muted-foreground flex">
                SNSのアカウントを追加 <Plus className="ml-1" />
              </span>
            </Button>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* ダイアログ */}
      <SNSDialog open={open} setOpen={setOpen} />
    </nav>
  );
};

export default UserBar;
