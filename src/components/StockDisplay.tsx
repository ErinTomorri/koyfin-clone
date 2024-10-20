"use client";

import { useState, useEffect } from 'react';
import StockChart from './StockChart';
import StockPriceDisplay from "./StockPriceDisplay";
import Fortune500List from './Fortune500List';

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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
          Fetch Stock Data
        </button>
      </form>
      {loading && <div className="text-secondary">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {stockData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 bg-white shadow rounded-lg p-6">
            <StockChart symbol={symbol} />
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <StockPriceDisplay stockData={stockData} />
          </div>
        </div>
      )}
      <Fortune500List />
    </div>
  );
};

export default StockDisplay;
