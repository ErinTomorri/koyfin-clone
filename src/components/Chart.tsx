import { useEffect, useRef } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';

interface ChartProps {
  data: {
    t: number; // timestamp
    o: number; // open
    h: number; // high
    l: number; // low
    c: number; // close
  }[];
}

const StockChart: React.FC<ChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data.length) return;

    // Initialize chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
    });

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Format and clean the data
    const formattedData = data
      // Convert milliseconds to seconds if needed
      .map(item => ({
        time: Math.floor(item.t / 1000), // Convert milliseconds to seconds
        open: item.o,
        high: item.h,
        low: item.l,
        close: item.c,
      }))
      // Remove duplicates
      .filter((item, index, self) => 
        index === self.findIndex(t => t.time === item.time)
      )
      // Sort by time
      .sort((a, b) => a.time - b.time);

    // Set the data only if we have valid entries
    if (formattedData.length > 0) {
      candlestickSeries.setData(formattedData);
      // Fit content
      chart.timeScale().fitContent();
    }

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    chartRef.current = chart;

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="w-full">
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
};

export default StockChart;
