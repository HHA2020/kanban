import React, { useState } from "react";
import Column from "./Column";
import TaskDisplay from "./TaskDisplay";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const todoTasks = tasks.filter((task) => task.status === "ToDo");
  const doingTasks = tasks.filter((task) => task.status === "Doing");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="To Do" tasks={todoTasks} />
        <Column title="Doing" tasks={doingTasks} />
        <Column title="Done" tasks={doneTasks} />
      </div>

      {showForm && <TaskDisplay onClose={() => setShowForm(false)} />}
    </div>
  );
}
