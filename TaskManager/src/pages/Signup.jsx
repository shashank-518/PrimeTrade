import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup successful. Please login.");
      navigate("/login"); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/STock.jpg')" }}
    >
      <div className="bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900/70 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg 
                border-2 border-white 
                text-white 
                font-semibold 
                transition duration-300
                ${loading 
                    ? 'bg-gray-500 cursor-wait' 
                    : 'bg-transparent hover:bg-white hover:text-green-600'
                }`}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Already have an account?
          <a href="/login" className="ml-2 text-green-400 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}