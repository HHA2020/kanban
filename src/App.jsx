import React from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import KanbanBoard from "./KanbanboardUI/Kanbanboard";
import Dashboard from "./DashboardUI/Dashboard";
import { TaskProvider } from "./context/TaskContext";

// HashRouter, not BrowserRouter: GitHub Pages serves static files and will
// 404 on a direct hit to /dashboard. The hash keeps routing client-side.

export default function App() {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded text-sm font-medium ${
      isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <TaskProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50">
          <nav className="flex gap-2 px-6 py-4 bg-white border-b">
            <NavLink to="/" end className={linkClass}>
              Board
            </NavLink>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          </nav>

          <div className="py-8">
            <Routes>
              <Route path="/" element={<KanbanBoard />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </TaskProvider>
  );
}
