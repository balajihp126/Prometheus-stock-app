import type { DailyStockData } from "../types/stock.js";

export async function getStockData(symbol: string): Promise<DailyStockData[]> {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=15m&range=1mo`

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    if (!response.ok) {
        throw new Error(`Yahoo request failed: ${response.status}`);
    }

    const data = await response.json();
    const result = data?.chart?.result?.[0];

    if (!result) {
        throw new Error(`No stock data found for symbol: ${symbol}`);
    }

    const timestamp = result.timestamp;
    const quote = result.indicators?.quote?.[0];

    if (!timestamp || !quote) {
        throw new Error(`Incomplete stock data returned for symbol: ${symbol}`);
    }

    return aggregateStockData(timestamp, quote.low, quote.high, quote.volume);
    

}

function roundToDecimals(num: number, places: number): number {
  const factor = Math.pow(10, places);
  return Math.round(num * factor) / factor;
}

export function aggregateStockData(
    timestamp: number[],
    low: (number | null)[],
    high: (number | null)[],
    volume: (number | null)[]
): DailyStockData[] {

    if (!low || !high || !volume) {
        throw new Error(`Missing quote data for symbol`);
    }

    const lowMap: Record<string, number[]> = {};
    const highMap: Record<string, number[]> = {};
    const volumeMap: Record<string, number[]> = {};
    const stockData: DailyStockData[] = [];

    for (let i: number = 0; i < timestamp.length; i++) {
        const currentTime = timestamp[i];
        const currentLow = low[i];
        const currentHigh = high[i];
        const currentVolume = volume[i]; 
        if (
                currentTime == null ||
                currentLow == null ||
                currentHigh == null ||
                currentVolume == null
            ) {
                continue;
            }

        let date = new Date(timestamp[i] * 1000).toLocaleDateString("en-CA", {
            timeZone: "America/New_York",
            month: "short",
            day: "numeric",
            year: "numeric"
        });
        if (!lowMap[date]) {
            lowMap[date] = [];
            highMap[date] = [];
            volumeMap[date] = [];
        }
        lowMap[date].push(currentLow);
        highMap[date].push(currentHigh);
        volumeMap[date].push(currentVolume);

    }

    const getAverage = (arr: number[]): number => 
            arr.reduce((sum, val) => sum + val, 0) / arr.length;

    for (const [day, values] of Object.entries(lowMap)) {
        stockData.push({
            day: day,
            lowAverage: roundToDecimals(getAverage(values), 4),
            highAverage: roundToDecimals(getAverage(highMap[day]), 4),
            volume: volumeMap[day].reduce((sum, val) => sum + val, 0)
        })


    }

    if (stockData.length === 0) {
        throw new Error(`No usable stock data found for symbol`);
    }

    return stockData
}