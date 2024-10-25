import { useEffect, useState } from 'react';
import StockChart from '../components/Chart';
import StockTerminal from '../components/Market_terminal';
import { fetchStockData } from '../services/Stock_Chart_api';

interface StockData {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

// Add these new interfaces from the API file
type TimeFrame = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

interface StockParams {
  ticker: string;
  multiplier: number;
  timeFrame: TimeFrame;
  fromDate: string;
  toDate: string;
}



const Dashboard = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Separate state for form inputs and actual search params
  const [formInputs, setFormInputs] = useState<StockParams>({
    ticker: 'AAPL',
    multiplier: 1,
    timeFrame: 'day',
    fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
  });

  const timeFrameOptions: TimeFrame[] = ['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormInputs(prev => ({
      ...prev,
      [name]: name === 'multiplier' ? Number(value) : value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const stockData = await fetchStockData(formInputs);
      setData(stockData);
    } catch (err) {
      setError('Failed to fetch stock data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-primary-cream min-h-screen">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-primary-darkBlue text-sm font-medium mb-1">Ticker</label>
          <input
            type="text"
            name="ticker"
            value={formInputs.ticker}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border rounded focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Multiplier</label>
          <input
            type="number"
            name="multiplier"
            value={formInputs.multiplier}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            min="1"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Time Frame</label>
          <select
            name="timeFrame"
            value={formInputs.timeFrame}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            {timeFrameOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={formInputs.fromDate}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">To Date</label>
          <input
            type="date"
            name="toDate"
            value={formInputs.toDate}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Add search button */}
      <div className="mb-6">
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Modified layout for chart and terminal */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          {data.length > 0 && (
            <>
              <h1 className="text-2xl font-bold mb-4">Stock Chart</h1>
              <StockChart data={data} />
            </>
          )}
        </div>
        <div className="lg:w-1/4">
          <StockTerminal />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
