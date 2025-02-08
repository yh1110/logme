"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";

export function AccountDialog({ open, setOpen }) {
  type FormData = {
    email: string;
    password: string;
  };
  const { register, handleSubmit } = useForm<FormData>({});
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
        <DialogContent
          className="fixed bg-white p-6 rounded shadow-md 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">アカウント追加</DialogTitle>
            <DialogDescription>新しいSNSアカウントの情報を入力してください。</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:grid gap-4 py-4 space-y-4">
              <div className="md:grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="md:text-right">
                  メールアドレス
                  <span className="text-muted-foreground">（またはID）</span>
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  autoFocus={false}
                  // register でフォーム入力を登録（必須項目として指定）
                  {...register("email", { required: "emailは必須です" })}
                />
              </div>
              <div className="md:grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="md:text-right">
                  パスワード
                </Label>
                <Input
                  id="password"
                  className="col-span-3"
                  autoFocus={false}
                  type="password"
                  {...register("password", { required: "passwordは必須です" })}
                />
              </div>
            </div>

            <DialogFooter>
              {/* Submit ボタン：フォーム送信 */}
              <DialogClose asChild>
                <Button type="submit" className="my-4 sm:my-0 hover:bg-primary-buttonHover">
                  送信
                </Button>
              </DialogClose>
              {/* 閉じるボタン */}
              {/* <DialogClose asChild>
                  <Button variant="outline">閉じる</Button>
                </DialogClose> */}
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
export function SNSDialog({ open, setOpen }) {
  type FormData = {
    email: string;
    password: string;
  };
  const { register, handleSubmit } = useForm<FormData>({});
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
        <DialogContent
          className="fixed bg-white p-6 rounded shadow-md 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">SNS連携</DialogTitle>
            <DialogDescription>連携するSNSを選択してください</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:grid gap-4 py-4 space-y-4">
              <div className="md:grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="md:text-right">
                  メールアドレス
                  <span className="text-muted-foreground">（またはID）</span>
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  autoFocus={false}
                  // register でフォーム入力を登録（必須項目として指定）
                  {...register("email", { required: "emailは必須です" })}
                />
              </div>
              <div className="md:grid md:grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="md:text-right">
                  パスワード
                </Label>
                <Input
                  id="password"
                  className="col-span-3"
                  autoFocus={false}
                  type="password"
                  {...register("password", { required: "passwordは必須です" })}
                />
              </div>
            </div>

            <DialogFooter>
              {/* Submit ボタン：フォーム送信 */}
              <DialogClose asChild>
                <Button type="submit" className="my-4 sm:my-0 hover:bg-primary-buttonHover">
                  送信
                </Button>
              </DialogClose>
              {/* 閉じるボタン */}
              {/* <DialogClose asChild>
                  <Button variant="outline">閉じる</Button>
                </DialogClose> */}
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
