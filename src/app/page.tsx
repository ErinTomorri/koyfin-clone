import Image from "next/image";
import StockDisplay from "../components/StockDisplay";


export default function Home() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Stock Dashboard</h1>
        <StockDisplay />
        
      </main>
    </div>
  );
}
