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

    const timestamp = data["chart"]["result"][0]["timestamp"];
    const low = data["chart"]["result"][0]["indicators"]["quote"][0]["low"];
    const high = data["chart"]["result"][0]["indicators"]["quote"][0]["high"];
    const volume = data["chart"]["result"][0]["indicators"]["quote"][0]["volume"];

    const lowMap: Record<string, number[]> = {};
    const highMap: Record<string, number[]> = {};
    const volumeMap: Record<string, number[]> = {};
    const stockData: DailyStockData[] = [];

    for (let i: number = 0; i < timestamp.length; i++) {
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
        lowMap[date].push(low[i]);
        highMap[date].push(high[i]);
        volumeMap[date].push(volume[i]);

    }

    const getAverage = (arr: number[]): number => 
            arr.reduce((sum, val) => sum + val, 0) / arr.length;

    for (const [day, values] of Object.entries(lowMap)) {
        stockData.push({
            day: day,
            lowAverage: getAverage(values),
            highAverage: getAverage(highMap[day]),
            volume: volumeMap[day].reduce((sum, val) => sum + val, 0)
        })


    }

    return stockData
    

}