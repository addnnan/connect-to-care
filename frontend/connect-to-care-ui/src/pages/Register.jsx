import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        {/* Back */}
        <Link
          to="/"
          className="absolute left-4 top-4 flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 transition font-semibold hover:border px-2 py-1 rounded-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Brain className="h-7 w-7 text-emerald-600" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Create an account
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Save assessments and continue care
        </p>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 hover:underline"
          >
            Sign In
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-gray-400 text-center">
          This platform provides screening support and does not replace
          professional medical diagnosis.
        </p>
      </motion.div>
    </div>
  );
}