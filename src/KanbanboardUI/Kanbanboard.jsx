import React, { useState } from "react";
import Column from "./Column";
import TaskDisplay from "./TaskDisplay";
import { useTasks } from "../context/TaskContext";

export default function KanbanBoard() {
  const { tasks, setTasks } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  const todoTasks = tasks.filter((task) => task.status === "ToDo");
  const doingTasks = tasks.filter((task) => task.status === "Doing");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <button
          onClick={() => setEditingTask({})}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column
          title="To Do"
          tasks={todoTasks}
          onEdit={setEditingTask}
          onDelete={(taskId) => setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))}
        />
        <Column
          title="Doing"
          tasks={doingTasks}
          onEdit={setEditingTask}
          onDelete={(taskId) => setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))}
        />
        <Column
          title="Done"
          tasks={doneTasks}
          onEdit={setEditingTask}
          onDelete={(taskId) => setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))}
        />
      </div>

      {editingTask && (
        <TaskDisplay
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(task) => {
            setTasks((currentTasks) => {
              const exists = currentTasks.some((currentTask) => currentTask.id === task.id);
              return exists
                ? currentTasks.map((currentTask) =>
                    currentTask.id === task.id ? task : currentTask,
                  )
                : [...currentTasks, task];
            });
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
