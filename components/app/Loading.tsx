"use client";
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle } from "../ui/dialog";
import "../css/svgLoader.css";

export default function LoadingSpinner({ open }: { open: boolean }) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogPortal>
        <DialogContent className=" bg-transparent border-none shadow-none p-0" showClose={false}>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center h-full p-4 ">
            <div className="absolute inset-0 flex items-center justify-center bg-transparent">
              <svg
                version="1.1"
                id="wrapper"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="273px"
                height="125.2px"
                viewBox="0 0 273 125.2"
                xmlSpace="preserve"
              >
                <path
                  className="path"
                  fill="none"
                  stroke="#FFA726"
                  strokeWidth="4"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2,65.7C49.2,3.8,29.8,2.1,27.4,2c-2.4-0.1-4.4,2.2-6.6,5.3c-10.2,14.8-10.4,40.3-8.7,45s4.6,15.3,11.7,16.5
          c5.5,0.9,10.8-2.9,14.3-7.4c3.5-4.4,6-9.7,10.2-13.4c4.2-3.7,11.1-5.4,15.4-1.7c-5-0.4-10.3-0.4-14.9,1.7s-8.2,7.1-7.3,12.1
          c1.1,5.9,8.5,9.2,14.2,7.3s9.5-7.6,10.8-13.5c0.6-3,0.5-6.5-1.7-8.5c-2.2-2-6.9-0.7-6.7,2.3c0.2,2.1,2.4,3.3,4.4,3.8
          c5.5,1.2,11.2-0.7,16.5-2.7c5.3-1.9,11-3.8,16.5-2.4c5.5,1.4,10,7.7,7.5,12.8c-0.6-7.2-7.3-13.4-14.5-13.3
          c-7.2,0.2-13.7,7.1-13,14.3s8.6,12.9,15.6,10.8c7.5-2.2,11-11.3,10-19.1c-1.8,3.2-1.5,13.5,0.8,16.3c2.3,2.8,6.5,4,9.9,2.8
          c4.4-1.5,6.9-12.1,9.5-16s6.5-7.9,11.1-7.2c5.2,0.8,7.6,6.8,9.1,11.9c0.3-6.2-5.6-12-11.8-11.6c-6.2,0.4-11.3,6.9-10.2,13.1
          c1.1,6.1,8.2,10.5,14.2,8.7c7.4-2.2,10.3-11.1,11.3-18.8c1.9-14.6,0.9-29.5-2.8-43.7c-3,16.8-3.3,34-0.9,50.9
          c0.8,5.7,2.6,12.3,7.8,14.8c5.8,2.8,12.9-1.2,16-6.8c3-5.6,3-12.4,2.8-18.8c-1.5,5.8-3.1,11.9-1.4,17.7c1.6,5.8,7.7,10.8,13.4,8.9
          c5-1.6,7.4-7.5,7.7-12.8s-0.9-10.6,0.1-15.8c-1.8,10.2-0.9,20.9,2.5,30.7c0.5-7.1,1.1-14.3,1.6-21.4c0.2-2.5,0.5-5.4,2.4-7
          c3.6-3.1,9.5,0.6,10.8,5.2c1.3,4.6-0.1,9.5,0,14.2c0.1,4,1.8,8.7,5.7,9.7c3.7,1,7.5-2,9.2-5.4c1.8-3.4,2.2-7.4,3.6-11
          c1.9-4.7,5.6-8.8,10.4-10.4s10.6-0.3,13.8,3.7s2.9,10.4-1.1,13.6c4.4-4.6,4.4-12.7,0.1-17.5s-12.2-5.5-17.5-1.9s-7.3,11.2-4.8,17.1
          c3.1,7.2,12.7,10.8,19.7,7.3c7-3.5,10.1-13.3,6.2-20.1c1.1,20,2.2,40,3.3,60c0.2,3.7,0,8.2-3.3,10c-4.1,2.3-8.9-2.1-10.7-6.5
          c-4.6-11-1.6-24.8,7.3-32.9c4.7-4.3,10.8-6.9,15.8-10.9c5-4,9.2-10.1,7.9-16.4"
                />
                <path
                  className="path2"
                  fill="none"
                  stroke="#FFA726"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  d="M177.7,20.2c-2.3-2.5-7-2.1-8.8,0.8c-1.8,2.9,0,7.3,3.3,8.2c2.3,0.6,4.9-0.4,6.2-2.4S179.3,22,177.7,20.2z"
                />
              </svg>
            </div>

            <p className="mt-36 text-muted-foreground text-sm">
              アカウントを追加して投稿を取得しています
              <span className="dot-ellipsis" />
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
