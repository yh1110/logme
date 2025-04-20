// app/blog/layout.tsx
import Header from "@/components/app/Header";
import UserBar from "@/components/app/UserBar";
import React from "react";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#FFB84C] p-4">
        <Header />
      </header>

      <UserBar />

      {/* メインコンテンツ */}
      {children}
    </div>
  );
}
