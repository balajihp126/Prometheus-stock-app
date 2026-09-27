import type { DailyStockData } from "../types/stock";

export async function getStockData(
    symbol: string
): Promise<DailyStockData[]> {

    const response = await fetch(
        `http://localhost:3000/api/stocks/${symbol}`
    );

    if (!response.ok) {
        throw new Error("FAiled to fetch stock data");
    }

    const data: DailyStockData[] = await response.json();

    return data;
}
