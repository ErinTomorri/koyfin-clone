import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

type Interval = '1d' | '1wk' | '1mo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const interval = (searchParams.get('interval') as Interval) || '1d';

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const startDate = getStartDate(interval);
    const queryOptions = { period1: startDate };

    const result = await yahooFinance.historical(symbol, queryOptions);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching stock history:', error);
    return NextResponse.json({ error: 'Failed to fetch stock history' }, { status: 500 });
  }
}

function getStartDate(interval: Interval): Date {
  const now = new Date();
  switch (interval) {
    case '1d':
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000); // 1 year ago
    case '1wk':
      return new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000); // 5 years ago
    case '1mo':
      return new Date(now.getTime() - 10 * 365 * 24 * 60 * 60 * 1000); // 10 years ago
    default:
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000); // Default to 1 year ago
  }
}
