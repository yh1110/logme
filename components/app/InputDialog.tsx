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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, Controller, Form } from "react-hook-form";
import { useActionState } from "react";
import { addAccount } from "@/lib/actions/yay/addAccount";
import { getPost } from "@/lib/actions/yay/getPost";

// SNSアカウント連携
export function AccountDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  type FormData = {
    email: string;
    password: string;
  };
  const { register, control } = useForm<FormData>({});

  const [state, formAction, isPending] = useActionState(addAccount, null);
  // const [state, formAction, isPending] = useActionState(getPost, null);

  //

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

          <Form control={control} onSubmit={({ formData }) => formAction(formData)}>
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

              {/* メールアドレス */}
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

              {/* パスワード */}
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
            </DialogFooter>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

// SNS選択
export function SNSDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
        <DialogContent
          className="fixed bg-white p-6 rounded shadow-md 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-full"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">SNSアカウントを追加</DialogTitle>
            <DialogDescription>連携するSNSを選択してください</DialogDescription>
          </DialogHeader>

          <div>
            <div className="p-4 mb-4">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Button variant="outline" className="rounded-full py-6 text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="200"
                      height="200"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                      />
                    </svg>
                    <span className="text-muted-foreground text-sm">X(Twitter)で登録</span>
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <button className="w-1/2">Facebook</button>
                </div>
                <div className="flex items-center justify-center">
                  <button className="w-1/2">Instagram</button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild></DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
