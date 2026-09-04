import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import ChartPanel from "./ChartPanel";
import { categoryData } from "../utils/stats";

export default function CategoryBarChart({ tasks }) {
  const data = categoryData(tasks);

  return (
    <ChartPanel
      title="Tasks by category"
      isEmpty={data.length === 0}
      emptyMessage="Categories appear here once tasks have them."
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -18 }}>
          <CartesianGrid stroke="#E8EAEF" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#5C6472" }}
            tickLine={false}
            axisLine={{ stroke: "#D8DCE4" }}
            interval={0}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#5C6472" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "#F1F3F7" }}
            formatter={(value) => [`${value} tasks`, "Count"]}
          />
          <Bar dataKey="value" fill="#4A6FA5" radius={[3, 3, 0, 0]} maxBarSize={54} />
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}
