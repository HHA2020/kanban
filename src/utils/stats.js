import { isOverdue, completionBucket } from "./dates";

export const STATUSES = ["ToDo", "Doing", "Done"];
export const BUCKETS = ["Early", "On Time", "Late"];

export const STATUS_LABEL = {
  ToDo: "To do",
  Doing: "Doing",
  Done: "Done",
};

// --- Summary cards -------------------------------------------------------

export function summarise(tasks) {
  const counts = { ToDo: 0, Doing: 0, Done: 0 };
  let overdue = 0;

  for (const task of tasks) {
    if (counts[task.status] !== undefined) counts[task.status] += 1;
    if (isOverdue(task)) overdue += 1;
  }

  return {
    total: tasks.length,
    todo: counts.ToDo,
    doing: counts.Doing,
    done: counts.Done,
    overdue,
  };
}

// --- Chart 1: tasks by status (doughnut) ---------------------------------

export function statusData(tasks) {
  return STATUSES.map((status) => ({
    name: STATUS_LABEL[status],
    key: status,
    value: tasks.filter((t) => t.status === status).length,
  }));
}

// --- Chart 2: tasks by category (bar) ------------------------------------
// The board stores category as free text on the task, so the category list is
// derived from the tasks themselves rather than kept separately.

export function categoryData(tasks) {
  const counts = new Map();

  for (const task of tasks) {
    const name = task.category?.trim() || "No category";
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, value]) => ({ name, key: name, value }))
    .sort((a, b) => b.value - a.value);
}

// --- Chart 3: completion performance (bar) -------------------------------

export function performanceData(tasks) {
  const tally = { Early: 0, "On Time": 0, Late: 0 };

  for (const task of tasks) {
    const bucket = completionBucket(task);
    if (bucket) tally[bucket] += 1;
  }

  return BUCKETS.map((name) => ({ name, key: name, value: tally[name] }));
}
