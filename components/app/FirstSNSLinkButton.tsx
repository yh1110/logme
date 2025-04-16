"use client";
import React from "react";
import { Button } from "../ui/button";
import { SNSDialog } from "./InputDialog";

const FirstSNSLinkButton = () => {
  const handleOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={handleOpen} className="">
        SNSアカウントと連携する
      </Button>
      <SNSDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default FirstSNSLinkButton;
