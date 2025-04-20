// サーバーコンポーネント or server actions 用
import { cookies } from "next/headers";

export async function getServerCookie(key: string): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  // console.log(cookie);

  return cookie?.value ?? null;
}
