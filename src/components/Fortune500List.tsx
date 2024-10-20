import React, { useState, useEffect } from 'react';

interface Company {
  rank: number;
  name: string;
  symbol: string;
}

const Fortune500List: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const sampleCompanies: Company[] = [
      { rank: 1, name: "Walmart", symbol: "WMT" },
      { rank: 2, name: "Amazon", symbol: "AMZN" },
      { rank: 3, name: "Apple", symbol: "AAPL" },
      { rank: 4, name: "CVS Health", symbol: "CVS" },
      { rank: 5, name: "UnitedHealth Group", symbol: "UNH" },
    ];
    setCompanies(sampleCompanies);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 transition-all">
      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
        Fortune 500 Companies
        <span>{isExpanded ? '▼' : '▶'}</span>
      </h2>
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {companies.map((company) => (
            <div key={company.rank} className="bg-gray-100 hover:bg-gray-200 transition-colors p-3 rounded-lg flex justify-between items-center">
              <span className="font-medium">{company.rank}.</span>
              <span>{company.name}</span>
              <span className="text-sm text-gray-500">{company.symbol}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fortune500List;
