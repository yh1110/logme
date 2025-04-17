"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { SNSDialog } from "./InputDialog";
import { getDefaultPost } from "@/lib/actions/supabase/getDefaultPost";
import { useRouter } from "next/navigation";

type accountDataType = {
  account_id: string;
  sns_id: string | null;
};

const UserBarClient = ({ accountData }: { accountData: accountDataType[] }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickAccount = (accountId: string) => {
    startTransition(async () => {
      const url = await getDefaultPost(accountId); // ← サーバーアクション
      if (url) router.push(url); // ← クライアント遷移
    });
  };

  //データフェッチ
  //#TODO ローディング中に他の表示させる
  return (
    <>
      <ScrollArea>
        <div className="max-w-7xl mx-auto flex space-x-2 py-4">
          {accountData?.map((account) => (
            <div className="flex items-center" key={account.account_id}>
              <Button
                className=" rounded-full bg-gray-300 px-8"
                onClick={() => {
                  handleClickAccount(account.account_id);
                }}
              >
                <span className="text-xs text-muted-foreground">{account.sns_id ?? "user1"}</span>
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
    </>
  );
};

export default UserBarClient;
