"use server";
import { Client, LoginUserResponse } from "yay.js";
import { getPost } from "./getPost";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";
import { encrypt } from "@/utils/crypto";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { sns_accountsType } from "@/types/prisma";

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

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
}

function toYmd(dateStr: string): string {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function generateUniqueSlug(): Promise<string> {
  let slug: string;
  let exists: boolean;

  do {
    slug = nanoid(10); // 10〜12文字推奨（Qiitaっぽく）
    const existing = await prisma.posts_samnail.findUnique({
      where: { samnail_slug: slug },
      select: { samnail_id: true },
    });
    exists = !!existing;
  } while (exists);

  return slug;
}

export async function addAccount(formData: { email: string; password: string }) {
  try {
    const { email, password } = formData;

    // バリデーションチェック
    if (!email || !password) {
      throw new Error("VALIDATION_FAILED");
    }

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

    const client = new Client({ saveCookie: false, debugMode: false, disableLog: true });
    let loginData: LoginUserResponse | null = null;
    // yayログイン userId取得
    try {
      loginData = await Promise.race([client.login({ email, password }), timeout(5000)]);
    } catch (e: unknown) {
      const error = e as Error;
      console.log("err", error);
      if (error.message === "timeout") {
        throw new Error("TIMEOUT");
      }
      throw new Error("LOGIN_FAILED");
    }

    // console.log("loginData", loginData);

    // 投稿の取得
    let posts: postItems[];
    const grouped: Record<string, postItems[]> = {};
    let snsAccount: sns_accountsType | null = null;
    try {
      posts = await getPost(client);
      // posts = await getPostForMock();

      // 取得した投稿を日付ごとにグループ化
      for (const post of posts) {
        const date = toYmd(post.createdAt ?? "");
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(post);
      }
    } catch (e: unknown) {
      console.log("getPost error", e);

      throw new Error("POST_FETCH_FAILED");
    }

    // DB登録
    const encryptedPassword = encrypt(formData.password);
    try {
      //sns_accountsテーブル更新
      snsAccount = await prisma.sns_accounts.create({
        data: {
          user_id: userId ?? "",
          sns_id: String(loginData.userId),
          email: formData.email,
          password: encryptedPassword,
          created_at: new Date(), // Add the required created_at field
        },
      });

      for (const [date, postList] of Object.entries(grouped)) {
        // ユニークなスラグを生成
        const uniqueSlug = await generateUniqueSlug();
        //post_samnailテーブル更新
        const postsSamnail = await prisma.posts_samnail.create({
          data: {
            account_id: snsAccount.account_id,
            samnail_name: date,
            samnail_date: new Date(date),
            samnail_month: new Date(date).getMonth() + 1,
            samnail_year: new Date(date).getFullYear(),
            created_at: new Date(), // 現在時刻
            samnail_slug: uniqueSlug, // Add a unique slug
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
    } catch (e: unknown) {
      console.log("DB error", e);
      throw new Error("DB_FAILED");
    }

    // 処理結果返却
    // setSnsId(snsAccount.sns_id);
    (await cookies()).set("sns_id", snsAccount.sns_id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: "lax",
    });
    return {
      result: 0,
      message: "アカウント連携に成功しました",
    };
  } catch (e: unknown) {
    console.error("Error adding account:", e);
    const error = e as Error;

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
      case "VALIDATION_FAILED":
        errorMessage = "メールアドレスとパスワードは必須です";
    }

    return {
      result: -1,
      message: errorMessage,
    };
  }
}
