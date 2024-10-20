import React from 'react';
import StockChart from './components/StockChart';

function App() {
  // Example data - replace with your actual data
  const stockData = [
    { x: new Date(2021, 0, 1).getTime(), y: [51.98, 56.29, 51.59, 53.85] },
    { x: new Date(2021, 0, 2).getTime(), y: [53.66, 54.99, 51.35, 52.95] },
    // ... more data points ...
  ];

  return (
    <div className="App">
      <h1>Stock Chart App</h1>
      <StockChart data={stockData} />
    </div>
  );
}

export default App;
