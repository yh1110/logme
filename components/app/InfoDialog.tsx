"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";

export function SNSSuccessfullyLlinked({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
        <DialogContent
          className="fixed bg-white p-6 rounded shadow-md 
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-full overflow-hidden"
          showBack={false}
        >
          <div className="flex flex-col items-center justify-center space-y-8">
            <DialogHeader>
              <DialogTitle className="flex flex-col items-center justify-center space-y-4">
                <div>
                  <svg
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="checkmark"
                  >
                    <circle
                      cx="36"
                      cy="36"
                      r="35"
                      stroke="#4ade80"
                      strokeWidth="2"
                      fill="none"
                      className="circle"
                    />
                    <path
                      d="M20 38 L30 48 L52 26"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="check"
                    />
                    <style jsx>{`
                      .circle {
                        stroke-dasharray: 220;
                        stroke-dashoffset: 220;
                        animation: draw 0.4s ease-out forwards;
                      }
                      .check {
                        stroke-dasharray: 48;
                        stroke-dashoffset: 48;
                        animation: draw 0.4s ease-out forwards;
                        animation-delay: 0.4s;
                      }

                      @keyframes draw {
                        to {
                          stroke-dashoffset: 0;
                        }
                      }
                    `}</style>
                  </svg>
                </div>
              </DialogTitle>
            </DialogHeader>
            <p className=" text-lg">SNS連携が完了しました</p>
            <Button
              className="w-32"
              onClick={() => {
                setOpen(false);
                router.replace("/diary"); // ルートに遷移
              }}
            >
              閉じる
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
