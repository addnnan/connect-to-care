import { Link } from "react-router-dom";
import { Brain, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className=" w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-transparent dark:bg-slate-900 dark:border-slate-800"
      >
        <Link
          to="/"
          className="absolute left-4 top-4 flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 transition font-semibold hover:border px-2 py-1 rounded-lg dark:text-slate-400 dark:hover:text-emerald-400 dark:hover:border-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6 mt-4">
          <Brain className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            ConnectToCare
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2 dark:text-white">
          Sign in to your account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 dark:text-slate-400">
          Access your assessments and connect to care
        </p>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
          <span className="px-3 text-xs text-gray-400 dark:text-slate-500">OR</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
        </div>

        {/* Guest Access */}
        <Link
          to="/assessment"
          className="flex items-center justify-center gap-2 w-full rounded-lg border border-emerald-600 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-slate-800"
        >
          Continue as Guest
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Register an account
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-gray-400 text-center dark:text-slate-500">
          This platform provides screening support and does not replace
          professional medical diagnosis.
        </p>
      </motion.div>
    </div>
  );
}