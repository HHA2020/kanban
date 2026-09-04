import { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import SummaryCard from "./SummaryCard";
import StatusPieChart from "./StatusPieChart";
import CategoryBarChart from "./CategoryBarChart";
import PerformanceChart from "./PerformanceChart";
import { summarise } from "../utils/stats";
import "./dashboard.css";

export default function Dashboard() {
  const { tasks } = useTasks();
  const stats = useMemo(() => summarise(tasks), [tasks]);

  return (
    <main className="dashboard">
      <header className="dashboard__head">
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__subtitle">
          A live summary of everything on the board.
        </p>
      </header>

      <div className="summary-grid">
        <SummaryCard label="Total tasks" value={stats.total} />
        <SummaryCard label="To do" value={stats.todo} tone="todo" />
        <SummaryCard label="Doing" value={stats.doing} tone="doing" />
        <SummaryCard label="Done" value={stats.done} tone="done" />
        <SummaryCard
          label="Overdue"
          value={stats.overdue}
          tone={stats.overdue > 0 ? "alert" : "neutral"}
        />
      </div>

      <div className="chart-grid">
        <StatusPieChart tasks={tasks} />
        <CategoryBarChart tasks={tasks} />
        <div className="chart-grid__wide">
          <PerformanceChart tasks={tasks} />
        </div>
      </div>
    </main>
  );
}
