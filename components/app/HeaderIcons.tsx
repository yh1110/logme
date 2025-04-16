"use client";
import Image from "next/image";
import React from "react";

export default function HeaderIcons() {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-white font-bold text-2xl">
        <Image src="/img/logo_black.png" alt="Logo" width={50} height={50} />
      </div>
    </div>
  );
}
