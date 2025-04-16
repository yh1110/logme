import HeaderClient from "./HeaderClient";

export default function Header({ diaryData }) {
  return (
    <header className="bg-[#FFB84C] p-4">
      <HeaderClient diaryData={diaryData} />
    </header>
  );
}
