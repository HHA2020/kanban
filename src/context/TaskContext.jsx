import { createContext, useContext, useEffect, useState } from "react";
import { today } from "../utils/dates";

const STORAGE_KEY = "kanban.tasks";

const TaskContext = createContext(null);

// The board never sets completeDate, so it's stamped here instead: any task
// that lands in Done gets today's date, and any task that leaves Done loses it.
// Doing it in one place means no call site can forget.
function stampCompletion(task) {
  if (task.status === "Done") {
    return task.completeDate ? task : { ...task, completeDate: today() };
  }
  return task.completeDate ? { ...task, completeDate: null } : task;
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(stampCompletion) : [];
  } catch {
    return [];
  }
}

export function TaskProvider({ children }) {
  const [tasks, setRawTasks] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Same signature the board already uses, so its calls need no changes.
  const setTasks = (updater) => {
    setRawTasks((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return next.map(stampCompletion);
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const value = useContext(TaskContext);
  if (!value) throw new Error("useTasks must be used inside a TaskProvider");
  return value;
}
