// Dates are plain "YYYY-MM-DD" strings, which is what <input type="date">
// already produces. They compare correctly with < and === because ISO dates
// sort lexicographically, so there are no timezone bugs to worry about.

export function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Overdue is derived, never stored: past due and not finished.
export function isOverdue(task, ref = today()) {
  return task.status !== "Done" && Boolean(task.dueDate) && task.dueDate < ref;
}

// Returns "Early" | "On Time" | "Late", or null if the task can't be judged.
export function completionBucket(task) {
  if (task.status !== "Done") return null;
  if (!task.completeDate || !task.dueDate) return null;
  if (task.completeDate < task.dueDate) return "Early";
  if (task.completeDate === task.dueDate) return "On Time";
  return "Late";
}
