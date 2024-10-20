"use client";

import { useState, useEffect } from 'react';
import StockChart from './StockChart';

interface StockData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
}

const StockDisplay: React.FC<{ symbol: string }> = ({ symbol }) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`/api/stock?symbol=${symbol}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        const data = await response.json();
        setStockData(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching stock data');
        setLoading(false);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stockData) return null;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{stockData.symbol}</h2>
      <p className="text-2xl font-semibold">${stockData.regularMarketPrice.toFixed(2)}</p>
      <p className={`text-sm ${stockData.regularMarketChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {stockData.regularMarketChangePercent.toFixed(2)}%
      </p>
      <div className="mt-2">
        <p>High: ${stockData.regularMarketDayHigh.toFixed(2)}</p>
        <p>Low: ${stockData.regularMarketDayLow.toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <StockChart symbol={symbol} />
      </div>
    </div>
  );
};

export default StockDisplay;
