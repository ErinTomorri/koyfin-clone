import React from 'react';

export type Interval = '5m' | '30m' | '1h' | '5h' | '1d' | '1wk' | '1mo' | '1y' | 'max';

interface IntervalSelectorProps {
  selectedInterval: Interval;
  onIntervalChange: (interval: Interval) => void;
}

const IntervalSelector: React.FC<IntervalSelectorProps> = ({ selectedInterval, onIntervalChange }) => {
  const intervals: Interval[] = ['5m', '30m', '1h', '5h', '1d', '1wk', '1mo', '1y', 'max'];

  return (
    <div className="flex gap-2 mb-4">
      {intervals.map((interval) => (
        <button
          key={interval}
          className={`px-2 py-1 rounded ${
            selectedInterval === interval ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => onIntervalChange(interval)}
        >
          {interval}
        </button>
      ))}
    </div>
  );
};

export default IntervalSelector;

