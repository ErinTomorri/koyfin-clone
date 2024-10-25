//https://api.polygon.io/vX/reference/financials?ticker=AAPL&order=asc&limit=10&sort=filing_date&apiKey=_pgp7rgrd1oSaMR82QQ5ooccP4EPprBS

import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
const BASE_URL = 'https://api.polygon.io/vX/reference/financials';

export const fetchFinancials = async (ticker: string) => {
    try {
        const response = await axios.get(`${BASE_URL}?ticker=${ticker}&apiKey=${API_KEY}&order=asc&limit=10&sort=filing_date`);
        return response.data;
    } catch (error) {
        console.error('Error fetching financials:', error);
        return [];
    }
}