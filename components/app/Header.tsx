import HeaderClient from "./HeaderClient";
import HeaderIcons from "./HeaderIcons";

export default async function Header({ diaryData }) {
  return (
    <header className="bg-[#FFB84C] p-4">
      <HeaderClient diaryData={diaryData}>
        <HeaderIcons />
      </HeaderClient>
    </header>
  );
}
