"use server";
import { Client } from "yay.js";
import { getPost } from "./getPost";
import { getPostForMock } from "./getPostForMock";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";
import { encrypt } from "@/utils/crypto";

const prisma = new PrismaClient();

interface attachment {
  uri?: string;
  thumbnail?: string;
}

interface video {
  uri?: string;
  thumbnail?: string;
}

interface postContent {
  text?: string;
  attachment?: attachment[];
  video?: video[];
}

interface postItems {
  id: number;
  postContent: postContent;
  createdAt?: string | null;
}

function toYmd(dateStr: string): string {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function addAccount(formData: { email: string; password: string }) {
  try {
    const { email, password } = formData;

    // supabaseからユーザーIDを取得
    const supabaseClient = await createClient();
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    const userId = user?.id;
    if (!user?.id) {
      throw new Error("NO_USER_SESSION");
    }

    // すでにアカウントが登録されているか確認
    const existingAccount = await prisma.sns_accounts.findFirst({
      where: {
        email,
      },
    });
    if (existingAccount) {
      return {
        result: -1,
        message: "すでにアカウントが連携されています",
      };
    }

    // const client = new Client({ saveCookie: false });
    // // // ログイン
    // try {
    //   await Promise.race([client.login({ email, password }), timeout(5000)]);

    // } catch (err: any) {
    //   if (err.message === "timeout") {
    //     throw new Error("TIMEOUT");
    //   }
    //   throw new Error("LOGIN_FAILED");
    // }

    // 投稿の取得
    let posts: postItems[];
    const grouped: Record<string, postItems[]> = {};
    try {
      // post = await getPost(client);
      posts = await getPostForMock();

      // 取得した投稿を日付ごとにグループ化
      for (const post of posts) {
        const date = toYmd(post.createdAt ?? "");
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(post);
      }
    } catch (err: any) {
      if (err.message === "timeout") {
        throw new Error("TIMEOUT");
      }
      throw new Error("POST_FETCH_FAILED");
    }

    // DB登録
    const encryptedPassword = encrypt(formData.password);
    try {
      //sns_accountsテーブル更新
      const snsAccount = await prisma.sns_accounts.create({
        data: {
          user_id: userId ?? "",
          email: formData.email,
          password: encryptedPassword,
          created_at: new Date(), // Add the required created_at field
        },
      });

      for (const [date, postList] of Object.entries(grouped)) {
        //post_samnailテーブル更新
        const postsSamnail = await prisma.posts_samnail.create({
          data: {
            account_id: snsAccount.account_id,
            samnail_name: date,
            created_at: new Date(), // 現在時刻
          },
        });

        // postsテーブル更新
        await prisma.posts.createMany({
          data: postList.map((post) => ({
            post_id: post.id.toString(),
            created_at: new Date(post.createdAt ?? new Date()),
            post_contents: JSON.stringify(post.postContent),
            samnail_id: postsSamnail.samnail_id,
          })),
        });
      }
    } catch (err: any) {
      throw new Error("DB_FAILED");
    }

    // 処理結果返却
    return {
      result: 0,
      message: "アカウント連携に成功しました",
    };
  } catch (error: any) {
    console.error("Error adding account:", error);

    let errorMessage = "アカウント連携に失敗しました。";

    switch (error.message) {
      case "TIMEOUT":
        errorMessage = "レート制限に達しました。\n5分ほど時間をおいて再度お試しください。";
        break;
      case "LOGIN_FAILED":
        errorMessage = "アカウント連携に失敗しました";
        break;
      case "POST_FETCH_FAILED":
        errorMessage = "投稿の取得に失敗しました";
        break;
      case "DB_FAILED":
        errorMessage = "DB登録に失敗しました";
    }

    return {
      result: -1,
      message: errorMessage,
    };
  }
}
