import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { DailyStockData } from "../types/stock";

interface StockChartProps {
    data: DailyStockData[]
}

function StockChart({ data }: StockChartProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="day"
                    tickFormatter={(day) =>
                        new Date(day).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric"
                        })
                    }
                />
                <YAxis domain={["auto", "auto"]}/>
                <Tooltip />
                <Legend />
                <Line 
                    type="monotone"
                    dataKey="lowAverage"
                    name="Average Low"
                    stroke="#eb5325"
                    strokeWidth={2}
                />
                <Line 
                    type="monotone"
                    dataKey="highAverage"
                    name="Average High"
                    stroke="#17a926"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default StockChart;
