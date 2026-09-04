import React from "react";

const Persons = [
  { id: 1, name: "Paing" },
  { id: 2, name: "Htet" },
  { id: 3, name: "Than" },
];

export default function TaskDisplay({ task, onClose, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave({
      id: task.id ?? crypto.randomUUID(),
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      startDate: formData.get("startDate"),
      dueDate: formData.get("dueDate"),
      responsible: formData.get("responsible"),
      status: formData.get("status"),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {task.id ? "Edit Task" : "Create New Task"}
        </h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="title"
            placeholder="Task Title"
            defaultValue={task.title ?? ""}
            className="w-full border p-2 rounded"
          />
          <textarea
            required
            name="description"
            placeholder="Description"
            defaultValue={task.description ?? ""}
            className="w-full border p-2 rounded"
          />
          <input
            required
            type="text"
            name="category"
            placeholder="Category"
            defaultValue={task.category ?? ""}
            className="w-full border p-2 rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Start Date</label>
              <input
                required
                type="date"
                name="startDate"
                defaultValue={task.startDate ?? ""}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Due Date</label>
              <input
                required
                type="date"
                name="dueDate"
                defaultValue={task.dueDate ?? ""}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <select
            required
            name="responsible"
            defaultValue={task.responsible ?? ""}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Responsible Person</option>
            {Persons.map((person) => (
              <option key={person.id} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>

          <select
            required
            name="status"
            defaultValue={task.status ?? "ToDo"}
            className="w-full border p-2 rounded"
          >
            <option value="ToDo">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
