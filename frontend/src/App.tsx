import { useState } from "react";
import { getStockData } from "./services/stockApi";
import type { DailyStockData } from "./types/stock";

function App() {
    const [symbol, setSymbol] = useState("TSLA");
    const [data, setData] = useState<DailyStockData[]>([]);
    const [error, setError] = useState("");

    async function handleSearch() {
        try {
            setError("");

            const result = await getStockData(symbol);

            setData(result);
        } catch {
            setError("Unable to load stock data.");
        }
    }

    return (
        <div>
            <h1>Stock Data Viewer</h1>

            <input
                value={symbol}
                onChange={(event) => setSymbol(event.target.value)}
                placeholder="Enter stock symbol"
            />

            <button onClick={handleSearch}>
                Search
            </button>

            {error && <p>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Low Average</th>
                        <th>High Average</th>
                        <th>Volume</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((row) => (
                        <tr key={row.day}>
                            <td>{row.day}</td>
                            <td>{row.lowAverage}</td>
                            <td>{row.highAverage}</td>
                            <td>{row.volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;