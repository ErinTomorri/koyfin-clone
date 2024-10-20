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
    <div className="bloomberg-panel">
      <h2 className="bloomberg-header">{stockData.symbol}</h2>
      <p className="bloomberg-text text-xl">${stockData.regularMarketPrice.toFixed(2)}</p>
      <p className={`bloomberg-text ${stockData.regularMarketChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {stockData.regularMarketChangePercent.toFixed(2)}%
      </p>
      <div className="mt-2">
        <p className="bloomberg-text">High: ${stockData.regularMarketDayHigh.toFixed(2)}</p>
        <p className="bloomberg-text">Low: ${stockData.regularMarketDayLow.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StockPriceDisplay;
