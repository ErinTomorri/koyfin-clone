import React from 'react';

interface StockData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
}

interface StockPriceDisplayProps {
  stockData: StockData;
}

const StockPriceDisplay: React.FC<StockPriceDisplayProps> = ({ stockData }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{stockData.symbol}</h2>
      <p className="text-2xl font-semibold">${stockData.regularMarketPrice.toFixed(2)}</p>
      <p className={`text-sm ${stockData.regularMarketChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {stockData.regularMarketChangePercent.toFixed(2)}%
      </p>
      <div className="mt-2">
        <p>High: ${stockData.regularMarketDayHigh.toFixed(2)}</p>
        <p>Low: ${stockData.regularMarketDayLow.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StockPriceDisplay;
