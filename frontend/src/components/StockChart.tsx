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
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                    type="monotone"
                    dataKey="lowAverage"
                    name="Average Low"
                />
                <Line 
                    type="monotone"
                    dataKey="highAverage"
                    name="Average High"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default StockChart;
