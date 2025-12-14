import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 text-green-400">
        TaskManager
      </h1>

      <nav className="space-y-4 flex-1">
        <Link
          to="/"
          className="block px-4 py-2 rounded hover:bg-gray-800"
        >
          Dashboard
        </Link>

        <Link
          to="/tasks"
          className="block px-4 py-2 rounded hover:bg-gray-800"
        >
          My Tasks
        </Link>
      </nav>

      
      <button
        onClick={handleLogout}
        className="mt-auto w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2"
      >
        Logout
      </button>
    </div>
  );
}
