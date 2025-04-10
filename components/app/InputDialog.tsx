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
import { useActionState, useState, useTransition } from "react";
import { addAccount } from "@/lib/actions/yay/addAccount";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// SNSアカウント連携
export function AccountDialog({ onSuccess }: { onSuccess: () => void }) {
  type FormData = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({});

  const [state, formAction, isPending] = useActionState(addAccount, null);
  const [isTransPending, startTransition] = useTransition();

  const onSubmit = (data: FormData) => {
    startTransition(() => {
      formAction(data);
      if (!isPending && !isTransPending) {
        onSuccess(); // 処理完了後にダイアログを閉じる
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-64">
      <div className="md:grid gap-4 py-4 space-y-6 mb-4">
        {/* メールアドレス */}
        <div className="md:grid md:grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="md:text-right">
            メールアドレス
          </Label>
          <Input
            id="email"
            className="col-span-3"
            autoFocus={false}
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
        {/* <DialogClose asChild> */}
        <Button
          type="submit"
          className="my-4 sm:my-0 hover:bg-primary-buttonHover"
          disabled={!isValid || isPending || isTransPending}
        >
          {isPending || isTransPending ? "送信中..." : "追加する"}
        </Button>
        {/* </DialogClose> */}
      </DialogFooter>
    </form>
  );
}

// SNS選択
export function SNSDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [mode, setMode] = useState<"select" | "yay-login">("select");
  const [initial, setInitial] = useState(true);
  const variants = {
    enter: { x: 150, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -150, opacity: 0 },
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setInitial(true);
        setMode("select");
        setOpen(false);
      }}
    >
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
        <DialogContent
          className="fixed bg-white p-6 rounded shadow-md 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-full overflow-hidden"
          showBack={mode === "yay-login"}
          backActions={() => {
            setInitial(false);
            setMode("select");
          }}
        >
          <AnimatePresence mode="wait">
            {mode === "select" && (
              <motion.div
                key="select"
                initial={initial ? "center" : "exit"}
                animate={initial ? "center" : "center"}
                exit={initial ? "exit" : "exit"}
                variants={variants}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">SNSアカウントを追加</DialogTitle>
                  <DialogDescription>連携するSNSを選択してください</DialogDescription>
                </DialogHeader>

                <div className="h-64">
                  <div className="md:grid gap-4 py-4 space-y-6 mb-4">
                    {/* x(twitter)連携 */}
                    <div className="flex flex-col items-center justify-center">
                      <Button
                        variant="outline"
                        className="rounded-full py-6 text-lg px-16 w-4/5"
                        disabled
                      >
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
                        <span className="text-muted-foreground text-sm">X(Twitter)を連携</span>
                      </Button>
                    </div>

                    {/* facebook連携 */}
                    <div className="flex items-center justify-center">
                      <Button
                        variant="outline"
                        className="rounded-full py-6 text-lg px-16 w-4/5"
                        disabled
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="#1877F2"
                            d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                          />
                          <path
                            fill="#FFF"
                            d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
                          />
                        </svg>
                        <span className="text-muted-foreground text-sm">Facebookを連携</span>
                      </Button>
                    </div>

                    {/* yay連携 */}
                    <div className="flex items-center justify-center">
                      <Button
                        variant="outline"
                        className="rounded-full py-6 text-lg px-16 w-4/5"
                        onClick={() => setMode("yay-login")}
                      >
                        <Image src={`/img/yay.png`} width={24} height={24} alt="yay.image" />
                        <span className="text-muted-foreground text-sm">yayを連携</span>
                      </Button>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild></DialogClose>
                  </DialogFooter>
                </div>
              </motion.div>
            )}
            {mode === "yay-login" && (
              <motion.div
                key="yay-login"
                initial={initial ? "enter" : "enter"}
                animate={initial ? "center" : "center"}
                exit={initial ? "enter" : "enter"}
                variants={variants}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">アカウント追加</DialogTitle>
                  <DialogDescription>連携するsnsにログインしてください</DialogDescription>
                </DialogHeader>

                {/* 入力画面 */}
                <AccountDialog
                  onSuccess={() => {
                    setInitial(true);
                    setMode("select");
                    setOpen(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
