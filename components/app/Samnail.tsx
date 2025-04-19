import { MobileSamnailClient, SamnailClinet } from "./SamnailClient";
import { groupBy } from "lodash";

type SamnailDataType = {
  samnailData:
    | {
        samnail_year: number | null;
        samnail_day: number | null;
        account_id: string | null;
        updated_at: Date | null;
        created_at: Date;
        samnail_id: string;
        samnail_name: string | null;
        samnail_slug: string;
        samnail_date: Date | null;
      }[]
    | undefined;
};

export function MobileSamnail({ samnailData }: SamnailDataType) {
  const grouped = groupBy(
    samnailData,
    (e) => `${e.samnail_year}-${String(e.samnail_day).padStart(2, "0")}`
  );

  return (
    <div className="p-4">
      {Object.entries(grouped).map(([month, entries]) => (
        <MobileSamnailClient key={month} month={month} entries={entries} />
      ))}
    </div>
  );
}

export async function Samnail({ samnailData }: SamnailDataType) {
  //グループ化
  const grouped = groupBy(
    samnailData,
    (e) => `${e.samnail_year}-${String(e.samnail_day).padStart(2, "0")}`
  );

  return (
    <div className="p-4">
      {Object.entries(grouped).map(([month, entries]) => (
        <SamnailClinet key={month} month={month} entries={entries} />
      ))}
    </div>
  );
}
