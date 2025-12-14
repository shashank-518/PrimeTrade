import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, ListChecks, LogOut } from 'lucide-react';
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition duration-150"
    >
      {children}
    </Link>
  );

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop for Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 
          w-64 min-h-screen bg-gray-900 text-white p-6 flex flex-col 
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 
          ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
        `}
      >
        <h1 className="text-3xl font-extrabold mb-10 text-green-400">
          TaskManager
        </h1>

        <nav className="space-y-2 flex-1">
          <NavLink to="/">
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/tasks">
            <ListChecks size={20} />
            My Tasks
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );
}