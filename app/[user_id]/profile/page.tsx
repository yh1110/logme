"use server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getServerCookie } from "@/utils/getServerCookie";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
import { CalendarDays, MessageSquare, Brain, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ user_id: string }> }) {
  const { user_id } = await params;
  const prisma = new PrismaClient();

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/signin");
    }

    // ユーザーのSNSアカウント情報を取得
    const snsAccounts = await prisma.sns_accounts.findMany({
      where: {
        user_id: user_id,
      },
    });

    if (snsAccounts.length === 0) {
      redirect("/diary");
    }

    // 投稿の統計情報を取得
    const postStats = await Promise.all(
      snsAccounts.map(async (account) => {
        const postCount = await prisma.posts_samnail.count({
          where: {
            account_id: account.account_id,
          },
        });

        const posts = await prisma.posts_samnail.findMany({
          where: {
            account_id: account.account_id,
          },
          orderBy: {
            samnail_date: "desc",
          },
          take: 1,
        });

        return {
          sns_id: account.sns_id,
          sns_name: account.sns_name,
          post_count: postCount,
          last_post_date: posts[0]?.samnail_date || null,
        };
      })
    );

    // ユーザー情報
    const userInfo = {
      user_id: user_id,
      email: user.email,
      created_at: user.created_at,
    };

    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* プロフィールカード */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-600">
                      {userInfo.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{userInfo.email}</h2>
                    <p className="text-sm text-gray-500">ユーザーID: {userInfo.user_id}</p>
                  </div>
                  <Separator />
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">登録日</span>
                      <span className="text-sm font-medium">
                        {new Date(userInfo.created_at).toLocaleDateString("ja-JP")}
                      </span>
                    </div>
                  </div>
                  <Link href="/settings" className="w-full">
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      設定
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 統計情報 */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">アカウント統計</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {postStats.map((stat) => (
                    <div
                      key={stat.sns_id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{stat.sns_name}</h4>
                          <p className="text-sm text-gray-500">@{stat.sns_id}</p>
                        </div>
                        <Link href={`/diary/${stat.sns_id}`}>
                          <Button variant="ghost" size="sm">
                            表示
                          </Button>
                        </Link>
                      </div>
                      <Separator className="my-3" />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            投稿数
                          </span>
                          <span className="text-sm font-medium">{stat.post_count}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 flex items-center">
                            <CalendarDays className="w-4 h-4 mr-1" />
                            最終投稿
                          </span>
                          <span className="text-sm font-medium">
                            {stat.last_post_date
                              ? new Date(stat.last_post_date).toLocaleDateString("ja-JP")
                              : "なし"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* アクティビティ */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">最近のアクティビティ</h3>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {postStats.length > 0 ? (
                      postStats.map((stat) => (
                        <div key={stat.sns_id} className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-primary-buttonHover rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{stat.sns_name}</span>で
                              {stat.post_count}件の投稿
                            </p>
                            <p className="text-xs text-gray-500">
                              {stat.last_post_date
                                ? new Date(stat.last_post_date).toLocaleDateString("ja-JP")
                                : "投稿なし"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">アクティビティはありません</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log("Profile page error:", error);
    redirect("/error");
  }
}