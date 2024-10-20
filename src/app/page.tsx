import Image from "next/image";
import StockDisplay from "@/components/StockDisplay";


export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-3xl font-bold">Stock Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
          <StockDisplay symbol="AAPL" />
          <StockDisplay symbol="GOOGL" />
          <StockDisplay symbol="MSFT" />
        </div>
      </main>
    </div>
  );
}
