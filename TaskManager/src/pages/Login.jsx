import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4" // Added p-4 for padding on small screens
      style={{ backgroundImage: "url('/STock.jpg')" }}
    >
      <div className="bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 text-white"> {/* Adjusted max-w and padding */}
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg 
                bg-transparent 
                border-2 border-white 
                text-white 
                font-semibold 
                hover:bg-white hover:text-green-600 
                transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Don't have an account?
          <a href="/signup" className="ml-2 text-green-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}