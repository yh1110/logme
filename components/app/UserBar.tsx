"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { SNSDialog } from "./InputDialog";
import { getDefaultPost } from "@/lib/actions/supabase/getDefaultPost";

type accountDataType = {
  account_id: string;
  sns_id: string | null;
};

const UserBar = ({ accountData }: { accountData: accountDataType[] }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  //データフェッチ
  //#TODO ローディング中に他の表示させる
  return (
    <nav className="border p-2">
      <ScrollArea>
        <div className="max-w-7xl mx-auto flex space-x-2 py-4">
          {accountData.map((account) => (
            <form className="flex items-center" key={account.account_id} action={getDefaultPost}>
              <Button className=" rounded-full bg-gray-300 px-8">
                <span className="text-xs text-muted-foreground">{account.sns_id ?? "user1"}</span>
                <input type="hidden" name="id" value={account.account_id} />
              </Button>
            </form>
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
