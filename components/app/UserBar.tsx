import { getServerCookie } from "@/utils/getServerCookie";
import UserBarClient from "./UserBarClient";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";
const UserBar = async () => {
  //データフェッチ
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const prisma = new PrismaClient();
  const accountData = await prisma.sns_accounts.findMany({
    where: {
      user_id: user?.id,
    },
    select: {
      account_id: true,
      sns_id: true,
    },
  });
  const cookieSnsId = await getServerCookie("sns_id");
  // console.log("cookieSnsId", cookieSnsId);

  return (
    <nav className="border p-2">
      <UserBarClient accountData={accountData} cookieSnsId={cookieSnsId ?? ""} />
    </nav>
  );
};

export default UserBar;
