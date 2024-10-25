import axios from 'axios';


const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
const BASE_URL = 'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks';

export const fetchStockData = async (date: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${date}`, {
      params: {
        adjusted: true,
        include_otc: false,
        apiKey: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};
