import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Plus, Check, Edit, Save, Trash2, X, AlertCircle } from "lucide-react"; 

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:4000/api/tasks";

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tasks.");
      }

      const data = await res.json();
      setTasks(data.data || []); 
    } catch (err) {
      setError(err.message || "Could not load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to create task.");
      }

      setTitle("");
      fetchTasks();
    } catch (err) {
        setError("Creation failed. Please try again.");
    }
  };

  // 🔄 Toggle completed
  const toggleTask = async (task) => {
    try {
      await fetch(`${BASE_URL}/update/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: !task.completed,
          title: task.title, 
        }),
      });
      
      setTasks(tasks.map(t => 
        t._id === task._id ? { ...t, completed: !t.completed } : t
      ));
    } catch (err) {
      alert("Failed to toggle task status.");
      fetchTasks(); 
    }
  };

 
  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  
  const saveEdit = async (task) => {
    if (!editTitle.trim()) return;
    
    try {
      await fetch(`${BASE_URL}/update/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          completed: task.completed,
        }),
      });

      
      setTasks(tasks.map(t => 
        t._id === task._id ? { ...t, title: editTitle } : t
      ));
      
      setEditId(null);
      setEditTitle("");
    } catch (err) {
      alert("Failed to save edit.");
      fetchTasks(); 
    }
  };

  
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
  };

 
  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      alert("Failed to delete task.");
      fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 lg:p-12 max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
          Task Manager
        </h2>

        
        <form onSubmit={createTask} className="flex gap-4 mb-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Add a new task, e.g., 'Deploy the final code.'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <button 
            type="submit"
            className="flex items-center gap-1 px-5 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-150"
          >
            <Plus size={20} />
            Add
          </button>
        </form>

        
        {loading && <p className="text-center text-blue-500">Loading tasks...</p>}
        {error && (
            <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg">
                <AlertCircle size={20} />
                <p>{error}</p>
            </div>
        )}

        
        <div className="space-y-4">
          
          {tasks.length === 0 && !loading ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No tasks found 🚀
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Create your first task to get started.
              </p>
            </div>
          ) : ( 
            tasks.map((task) => (
              <div
                key={task._id}
                className={`
                    p-5 rounded-xl shadow-lg flex items-center justify-between gap-4 
                    transition duration-300 ease-in-out border-l-4
                    ${
                      task.completed 
                        ? "bg-green-50 dark:bg-green-950 border-green-500 opacity-90" 
                        : "bg-white dark:bg-gray-800 border-gray-400 hover:shadow-xl"
                    }
                `}
              >
                
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                    className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                  />

                  {editId === task._id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-1 text-lg font-medium truncate 
                        ${task.completed
                            ? "line-through text-gray-500 dark:text-gray-400"
                            : "text-gray-800 dark:text-white"
                        }`}
                      title={task.title}
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap hidden sm:inline-block ${
                    task.completed
                      ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100"
                      : "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                  }`}
                >
                  {task.completed ? "COMPLETED" : "PENDING"}
                </span>

                
                <div className="flex gap-2 whitespace-nowrap">
                  {editId === task._id ? (
                    <>
                      <button
                        onClick={() => saveEdit(task)}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        title="Save Changes"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                        title="Cancel Edit"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEdit(task)}
                      className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                      title="Edit Task"
                    >
                      <Edit size={18} />
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition"
                    title="Delete Task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}