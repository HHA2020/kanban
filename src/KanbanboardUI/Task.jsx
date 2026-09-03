import React from "react";

export default function Task({ task }) {
  return (
    <div className="bg-white p-3 rounded shadow mb-3 border border-gray-200">
      <h3 className="font-bold text-md">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{task.description}</p>

      <div className="text-xs text-grey-500 flex justify-between mt-2 pt-2 border-t">
        <span>{task.responsible}</span>
        <span>{task.dueDate}</span>
      </div>
      <div className="text-xs text-grey-500 mt-1">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {task.category}
        </span>
      </div>
    </div>
  );
}
