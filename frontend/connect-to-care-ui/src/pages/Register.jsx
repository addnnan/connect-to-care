import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please populate all necessary registration fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setSuccess(true);
      
      // Delay navigation slightly so the user can see the success card
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try a different email.");
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
            ConnectToCare
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-1 dark:text-white tracking-tight">
          Create an account
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6 dark:text-slate-400">
          Save assessments and continue care
        </p>

        {/* Dynamic State Notice Mounts */}
        <AnimatePresence mode="wait">
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

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mb-5 flex items-start gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-400"
            >
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div className="flex-1 leading-normal">Account created successfully! Redirecting you to login...</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Structured Form with Native Submissions */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 dark:text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
            />
          </div>

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
              required
              className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 dark:text-slate-400">
              Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-white font-semibold text-sm hover:bg-emerald-500 transition shadow-sm active:scale-[0.98] disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-semibold hover:underline dark:text-emerald-400"
          >
            Sign In
          </Link>
        </div>

        {/* Medical Disclaimer */}
        <p className="mt-5 text-[10px] text-gray-400 text-center leading-relaxed dark:text-slate-500">
          This platform provides educational screening support vectors and completely does not replace formal clinical diagnosis elements.
        </p>
      </motion.div>
    </div>
  );
}