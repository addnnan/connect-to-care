import { Link } from "react-router-dom";
import { Brain, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Managed state for in-page failure validation

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit action
    if (!email || !password) {
      setError("Please fill in all standard credentials.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      // In-page dynamic text allocation handling backend payload messages safely
      setError(err.response?.data?.detail || "Invalid email configuration or mismatching password key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 transition-colors duration-300 dark:bg-slate-950">
      
      {/* Absolute Home Router Link */}
        <Link
          to="/"
          className="absolute left-4 top-4 flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 transition font-semibold hover:border px-2 py-1 rounded-lg dark:text-slate-400 dark:hover:text-emerald-400 dark:hover:border-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100 dark:bg-slate-900 dark:border-slate-800/60"
      >
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2 mb-6 mt-2">
          <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            Connect to Care
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-1 dark:text-white tracking-tight">
          Sign in to your account
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6 dark:text-slate-400">
          Access your assessments and connect to care
        </p>

        {/* AnimatePresence handling fluid conditional mounts for the inside error notice */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              className="mb-5 flex items-start gap-2.5 rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs font-medium text-rose-800 dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-400"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div className="flex-1 leading-normal">{error}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container Wrapper capturing global onSubmit parameters */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 dark:text-slate-400">
              Email address
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 dark:text-slate-400">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-white font-semibold text-sm hover:bg-emerald-500 transition shadow-sm active:scale-[0.98] disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Alternative Pathway Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
          <span className="px-3 text-[10px] font-bold tracking-widest text-gray-400 dark:text-slate-500">OR</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
        </div>

        {/* Guest Router Link Action */}
        <Link
          to="/assessment"
          className="flex items-center justify-center gap-2 w-full rounded-xl border border-emerald-600 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50/50 transition active:scale-[0.98] dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-slate-800/40"
        >
          Continue as Guest
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* View Switch Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-semibold hover:underline dark:text-emerald-400"
          >
            Register an account
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-5 text-[10px] text-gray-400 text-center leading-relaxed dark:text-slate-500">
          This platform provides educational screening support vectors and completely does not replace formal clinical diagnosis elements.
        </p>
      </motion.div>
    </div>
  );
}