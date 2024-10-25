import React, { useEffect, useState } from 'react';
import { fetchStockData } from "../services/Market_Overall";  

interface Stock {
  T: string; // Ticker symbol
  o: number; // Open price
  c: number; // Close price
  v: number; // Volume
}

const StockTerminal: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const getStocks = async () => {
      const data = await fetchStockData('2023-01-09');
      setStocks(data);
    };

    getStocks();
  }, []);

  return (
    <div className="w-full h-500px bg-gray-900 text-white p-2.5 rounded-lg">
      <div className="font-bold text-lg pb-2.5 border-b border-gray-800">Quote Monitor</div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left font-bold bg-gray-800 border-b border-gray-800">Ticker</th>
            <th className="p-2 text-left font-bold bg-gray-800 border-b border-gray-800">Open</th>
            <th className="p-2 text-left font-bold bg-gray-800 border-b border-gray-800">Closed</th>
            <th className="p-2 text-left font-bold bg-gray-800 border-b border-gray-800">Volume</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.T} className="text-center">
              <td className="p-2 bg-gray-700">{stock.T}</td>
              <td className={`p-2 ${stock.o < 0 ? 'text-red-500' : 'text-green-500'} bg-gray-800`}>{formatVolume(stock.o)}</td>
              <td className={`p-2 ${stock.c < 0 ? 'text-red-500' : 'text-green-500'} bg-gray-800`}>{formatVolume(stock.c)}</td>
              <td className="p-2 bg-gray-800">{formatVolume(stock.v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2.5 p-2.5 border border-gray-800 bg-gray-800 text-center cursor-pointer">Add a ticker</div>
    </div>
  );
};

const formatVolume = (volume: number) => {
  if (volume > 1000000) {
    return (volume / 1000000).toFixed(1) + 'M';
  } else if (volume > 1000) {
    return (volume / 1000).toFixed(1) + 'K';
  }
  return volume;
};

export default StockTerminal;
