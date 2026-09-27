import { useState } from "react";
import { getStockData } from "./services/stockApi";
import type { DailyStockData } from "./types/stock";
import StockChart from "./components/StockChart";
import "./App.css"

function App() {
    const [symbol, setSymbol] = useState("TSLA");
    const [data, setData] = useState<DailyStockData[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchedSymbol, setSearchedSymbol] = useState("");

    async function handleSearch() {
        try {
            setLoading(true)
            setError("");
            if (!symbol.trim()) {
                setError("Please enter a stock symbol.");
                return;
            }

            const result = await getStockData(symbol.trim().toUpperCase());
            setSearchedSymbol(symbol.trim().toUpperCase());

            setData(result);
        } catch {
            setError("Unable to load stock data.");
            setData([]);
        }
        finally {
          setLoading(false)
        }
    }

    return (
      <div className="container">
        <h1>Stock Market Data</h1>
        <p className="subtitle">View intraday stock data aggregated by day.</p>
        <div>
          <form className="search-container" onSubmit={(event) => {event.preventDefault(); handleSearch()}}>
            <input
                value={symbol.trim().toUpperCase()}
                onChange={(event) => setSymbol(event.target.value)}
                placeholder="Enter stock symbol"
            />

            <button type='submit' disabled={loading}>
                {loading ? "Loading..." : "Search"}
            </button>
          </form>
            {loading && <p>Loading stock data...</p>}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            {!loading && data.length > 0 && (
                <><><h2>{searchedSymbol} — Past Month</h2><table className="stock-table">
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
                    <td>{row.lowAverage.toFixed(2)}</td>
                    <td>{row.highAverage.toFixed(2)}</td>
                    <td>{row.volume.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table></><StockChart data={data} /></>
            )}

        
        </div>
      </div>
    );
}

export default App;