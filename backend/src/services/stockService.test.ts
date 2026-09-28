import { describe, expect, test } from "vitest";
import { aggregateStockData } from "./stockService.js";

describe("aggregateStockData", () => {
    test("groups multiple observations from the same day", () => {
        const timestamps = [
            1758893400,
            1758894300
        ];

        const low = [100, 102];
        const high = [110, 114];
        const volume = [1000, 2000];

        const result = aggregateStockData(
            timestamps,
            low,
            high,
            volume
        );

        expect(result).toHaveLength(1);

        expect(result[0].lowAverage).toBe(101);
        expect(result[0].highAverage).toBe(112);
        expect(result[0].volume).toBe(3000);
    });

    test("keeps different trading days separate", () => {
        const timestamps = [
            1758893400,
            1758979800
        ];

        const low = [100, 120];
        const high = [110, 130];
        const volume = [1000, 2000];

        const result = aggregateStockData(
            timestamps,
            low,
            high,
            volume
        );

        expect(result).toHaveLength(2);
    });
    test("skips observations with null values", () => {
        const timestamps = [
            1758893400,
            1758894300
        ];

        const low = [100, null];
        const high = [110, 115];
        const volume = [1000, 2000];

        const result = aggregateStockData(
            timestamps,
            low,
            high,
            volume
        );

        expect(result).toHaveLength(1);
        expect(result[0].lowAverage).toBe(100);
        expect(result[0].highAverage).toBe(110);
        expect(result[0].volume).toBe(1000);
    });
});