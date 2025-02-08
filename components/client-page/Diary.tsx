"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import Header from "@/components/app/Header";
import UserBar from "@/components/app/UserBar";

export default function ClientDiary({ diaryData }) {
  const [selectedEntry, setSelectedEntry] = useState(diaryData["2024-03"][0]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header & ユーザーバー */}
      <Header diaryData={diaryData} />
      <UserBar />

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation（この位置はそのまま） */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {Object.entries(diaryData).map(([month, entries]) => (
              <div key={month} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">{month}</h3>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {entries.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => setSelectedEntry(entry)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedEntry.id === entry.id
                          ? "bg-[#FFB84C] text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="font-medium">{entry.title}</div>
                      <div className="text-sm opacity-80">{entry.date}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Main Diary Content */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{selectedEntry.title}</h1>
            <p className="text-gray-500">{selectedEntry.date}</p>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{selectedEntry.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
