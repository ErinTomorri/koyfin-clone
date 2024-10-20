"use client";

import { useState, useEffect } from 'react';
import StockChart from './StockChart';
import StockPriceDisplay from "./StockPriceDisplay";

interface StockData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
}

const StockDisplay: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async () => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stock?symbol=${symbol}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      setStockData(data);
    } catch (err) {
      setError('Error fetching stock data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStockData();
  };

  useEffect(() => {
    if (stockData) {
      const interval = setInterval(fetchStockData, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [stockData]);

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Fetch Stock Data
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {stockData && (
        <div className="flex space-x-4">
          <div className="w-2/3">
            <StockChart symbol={symbol} />
          </div>
          <div className="w-1/3">
            <StockPriceDisplay stockData={stockData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockDisplay;
