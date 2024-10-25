import { useEffect, useState } from 'react';
import StockChart from '../components/Chart';
import { fetchStockData } from '../services/Stock_Chart_api';
import Dashboard from './dashboard';
import FrontPage from './frontpage';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

const HomePage = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const loadStockData = async () => {
      try {
        const data = await fetchStockData();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    loadStockData();
  }, []);

  return (
    <div>
      <FrontPage />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;
