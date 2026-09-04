import React from "react";

export default function Task({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-3 rounded shadow mb-3 border border-gray-200">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-bold text-md">{task.title}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Delete task \"${task.title}\"?`)) {
                onDelete(task.id);
              }
            }}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
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
