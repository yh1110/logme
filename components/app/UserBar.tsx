"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { SNSDialog } from "./InputDialog";

const UserBar = () => {
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
    {
      id: 3,
      user_name: "user3",
    },
    {
      id: 4,
      user_name: "user4",
    },
  ];

  //データフェッチ
  return (
    <nav className="border p-2">
      <ScrollArea>
        <div className="max-w-7xl mx-auto flex space-x-2 py-4">
          {snsUser.map((user) => (
            <div className="flex items-center" key={user.id}>
              <Button className=" rounded-full bg-gray-300 px-8">
                <span className="text-xs text-muted-foreground">{user.user_name}</span>
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
