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

const UserBarClient = ({
  accountData,
  cookieSnsId,
}: {
  accountData: accountDataType[];
  cookieSnsId: string;
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClickAccount = (sns_id: string) => {
    startTransition(async () => {
      const url = await getDefaultPost(sns_id); // サーバーアクション
      if (url) router.push(url); // クライアント遷移
    });
  };

  //データフェッチ
  //#TODO ローディング中に他の表示させる
  return (
    <>
      <ScrollArea>
        <div className="max-w-7xl mx-auto flex space-x-2 py-4">
          {accountData?.map((account) => {
            const isSelected = cookieSnsId === account.sns_id; // 選択中のアカウントかどうか
            // console.log(cookieSnsId);

            return (
              <div className="flex items-center" key={account.sns_id}>
                <Button
                  className={`rounded-full bg-gray-200 px-8 ${
                    isSelected ? " disabled:bg-black disabled:opacity-80 " : ""
                  }`}
                  onClick={() => {
                    handleClickAccount(account.sns_id ?? ""); // SNSのアカウントIDを渡す
                  }}
                  disabled={isPending || isSelected}
                >
                  <span
                    className={`text-xs  ${isSelected ? "text-gray-100" : "text-muted-foreground"}`}
                  >
                    {account.sns_id ?? "user1"}
                  </span>
                </Button>
              </div>
            );
          })}

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
