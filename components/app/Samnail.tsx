import { MobileSamnailSheetClient, SamnailClinet } from "./SamnailClient";
import { groupBy } from "lodash";

export type SamnailDataType = {
  samnailData:
    | {
        samnail_year: number | null;
        samnail_month: number | null;
        account_id: string | null;
        updated_at: Date | null;
        created_at: Date;
        samnail_id: string;
        samnail_name: string | null;
        samnail_slug: string;
        samnail_date: Date | null;
      }[]
    | undefined;
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
