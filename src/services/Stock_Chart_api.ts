import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define types for better type safety
type TimeFrame = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

interface StockDataParams {
  ticker: string;
  multiplier: number;
  timeFrame: TimeFrame;
  fromDate: string;  
  toDate: string;    
}

export const fetchStockData = async ({
  ticker,
  multiplier,
  timeFrame,
  fromDate,
  toDate
}: StockDataParams) => {
  try {
    // Ensure that POLYGON_API_KEY is properly loaded
    const apiKey = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
    
    if (!apiKey) {
      throw new Error('API key is not defined');
    }

    const POLYGON_API_URL = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${timeFrame}/${fromDate}/${toDate}`;

    const response = await axios.get(POLYGON_API_URL, {
      params: {
        adjusted: true,
        sort: 'asc',
        apiKey: apiKey,
      },
    });

    // Transform the data to match our StockData interface
    return response.data.results.map((item: any) => ({
      t: item.t, // timestamp
      o: item.o, // open
      h: item.h, // high
      l: item.l, // low
      c: item.c, // close
    }));
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
