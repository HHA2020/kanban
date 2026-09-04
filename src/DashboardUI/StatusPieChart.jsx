import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ChartPanel from "./ChartPanel";
import { statusData } from "../utils/stats";

const FILL = {
  ToDo: "#5B6C8F",
  Doing: "#C98A2B",
  Done: "#3F8F6B",
};

export default function StatusPieChart({ tasks }) {
  const data = statusData(tasks);
  const isEmpty = data.every((d) => d.value === 0);

  return (
    <ChartPanel
      title="Tasks by status"
      isEmpty={isEmpty}
      emptyMessage="Add a task on the board to see the split."
    >
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={92}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.key} fill={FILL[entry.key]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} tasks`, name]} />
          <Legend verticalAlign="bottom" iconType="circle" iconSize={9} />
        </PieChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}
