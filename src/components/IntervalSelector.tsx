import React from 'react';

export type Interval =  '1d' | '1wk' | '1mo' ;

interface IntervalSelectorProps {
  selectedInterval: Interval;
  onIntervalChange: (interval: Interval) => void;
}

const IntervalSelector: React.FC<IntervalSelectorProps> = ({ selectedInterval, onIntervalChange }) => {
  const intervals: Interval[] = ['1d', '1wk', '1mo'];

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

