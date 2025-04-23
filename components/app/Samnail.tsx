import { posts_samnailType } from "@/types/prisma";
import { MobileSamnailSheetClient, SamnailClinet } from "./SamnailClient";
import { groupBy } from "lodash";

export type SamnailDataType = {
  samnailData: posts_samnailType[] | undefined;
  userId?: string;
};

export async function MobileSamnail({ samnailData, userId }: SamnailDataType) {
  const grouped = groupBy(
    samnailData,
    (e) => `${e.samnail_year}-${String(e.samnail_month).padStart(2, "0")}`
  );

  return <MobileSamnailSheetClient samnailData={grouped} userId={userId} />;
}

export async function Samnail({ samnailData, userId }: SamnailDataType) {
  //グループ化
  const grouped = groupBy(
    samnailData,
    (e) => `${e.samnail_year}-${String(e.samnail_month).padStart(2, "0")}`
  );

  return (
    <div className="p-4">
      {Object.entries(grouped).map(([month, entries]) => (
        <SamnailClinet key={month} month={month} entries={entries} userId={userId} />
      ))}
    </div>
  );
}
