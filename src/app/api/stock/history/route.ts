import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';
import type { HistoricalResult } from 'yahoo-finance2';

type Interval = '1d' | '1wk' | '1mo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const interval = (searchParams.get('interval') as Interval) || '1d';

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const queryOptions: HistoricalOptions = {
      period1: getStartDate(interval),
      period2: new Date(),
      interval: interval,
    };

    const result: HistoricalResult = await yahooFinance.historical(symbol, queryOptions);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message.includes('Not Found')) {
      return NextResponse.json({ error: 'Symbol not found or stock may be delisted' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to fetch stock historical data' }, { status: 500 });
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
