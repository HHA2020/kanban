import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import ChartPanel from "./ChartPanel";
import { performanceData } from "../utils/stats";

const FILL = {
  Early: "#3F8F6B",
  "On Time": "#4A6FA5",
  Late: "#C0503F",
};

export default function PerformanceChart({ tasks }) {
  const data = performanceData(tasks);
  const isEmpty = data.every((d) => d.value === 0);

  return (
    <ChartPanel
      title="Completion performance"
      note="Finished tasks, compared against their due date."
      isEmpty={isEmpty}
      emptyMessage="Move a task to Done to start tracking this."
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -18 }}>
          <CartesianGrid stroke="#E8EAEF" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#5C6472" }}
            tickLine={false}
            axisLine={{ stroke: "#D8DCE4" }}
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
          <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={64}>
            {data.map((entry) => (
              <Cell key={entry.key} fill={FILL[entry.key]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}
