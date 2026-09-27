import { Router } from "express";
import { DailyStockData } from "../types/stock.js";

const router = Router()

router.get("/:symbol", (req, res) => {
    const symbol = req.params.symbol;

    const fakeData: DailyStockData[] = [
        {
            day: "2026-09-24",
            lowAverage: 100.1234,
            highAverage: 110.5678,
            volume: 5000000
        },
        {
            day: "2026-09-25",
            lowAverage: 102.4321,
            highAverage: 112.8765,
            volume: 6200000
        }
    ];

    console.log(`Stock requested: ${symbol}`);

    res.json(fakeData);
});

export default router;
