//https://api.polygon.io/v1/open-close/AAPL/2024-10-23?adjusted=true&apiKey=_pgp7rgrd1oSaMR82QQ5ooccP4EPprBS

import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
const BASE_URL = 'https://api.polygon.io/v1/open-close';

export const fetchOpenCloseData = async (symbol: string, date: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${symbol}/${date}`, {
            params: {
                adjusted: true,
                apiKey: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching open-close data:', error);
        return null;
    }
}

export default fetchOpenCloseData;