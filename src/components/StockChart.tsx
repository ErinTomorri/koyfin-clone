import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import IntervalSelector, { Interval } from './IntervalSelector';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  symbol: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<Interval>('1d');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setError(null);
      try {
        const response = await fetch(`/api/stock/history?symbol=${symbol}&interval=${selectedInterval}`);
        if (!response.ok) {
          throw new Error('Failed to fetch historical data');
        }
        const data = await response.json();
        
        if (data.length === 0) {
          setError('No historical data available for this period');
          return;
        }

        const labels = data.map((item: any) => new Date(item.date).toLocaleString());
        const prices = data.map((item: any) => item.close);

        setChartData({
          labels,
          datasets: [
            {
              label: `${symbol} Stock Price`,
              data: prices,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching historical data:', error);
        setError('Failed to fetch historical data. Please try again.');
      }
    };

    if (symbol) {
      fetchHistoricalData();
    }
  }, [symbol, selectedInterval]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${symbol} Stock Price History`,
      },
    },
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="h-[400px]">
      <IntervalSelector
        selectedInterval={selectedInterval}
        onIntervalChange={setSelectedInterval}
      />
      <Line options={options} data={chartData} />
    </div>
  );
};

export default StockChart;
