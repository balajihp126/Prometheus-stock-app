import { Router } from "express";
import type { DailyStockData } from "../types/stock.js";
import { getStockData } from "../services/stockService.js";

const router = Router()

router.get("/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol;

        const data = await getStockData(symbol);

        console.log(`Stock requested: ${symbol}`);

        res.json(data);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve stock data"
        });
    }
    
});

export default router;

