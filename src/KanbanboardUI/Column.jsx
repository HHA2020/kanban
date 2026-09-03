import React from "react";
import Task from "./Task";

export default function Column({ title, tasks }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg min-h-[500px]">
      <h2 className="font-bold text-lg mb-4 border-b pb-2">{title}</h2>

      {tasks.length === 0 && (
        <p className="text-gray-400 text-sm italic">No tasks yet.</p>
      )}
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
